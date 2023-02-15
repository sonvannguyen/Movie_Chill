import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query'; 
import { useState, useRef } from 'react';
import {BiHide, BiShow} from 'react-icons/bi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import auth_banner from "../assets/images/auth_banner.jpg";
import logo from "../assets/images/logo.png";
import userApi from '../services/userApi';

const optionToast = {
  position: "top-center",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
}

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)
  const confirmPasswordRef = useRef(null)

  const handleToggleShowPassword = () => {
      setShowPassword(!showPassword)
  }

  const register = useMutation(
    userApi.register, 
    {
      onSuccess: (data) => {
        if(data === 'Register success'){
          toast.success('Đăng ký thành công. Giờ đây bạn có thể đăng nhập vào.', optionToast)
          navigate('/login')
        }
      }
    }, 
    {
      onError: (error) => alert(error)
    }
  )

  const handleSubmit = () => {
    setError({
      isError: false,
      message: ''
    })
    const username = usernameRef.current.value.trim()
    const password = passwordRef.current.value.trim()
    const confirmPassword = confirmPasswordRef.current.value.trim()

    if(username.length < 6){
      setError({
        isError: true,
        message: 'Username phải từ 6 kí tự trở lên !'
      })
      return
    }

    if(password.length < 8){
      setError({
        isError: true,
        message: 'Password phải từ 8 kí tự trở lên !'
      })
      return
    }

    if(password !== confirmPassword){
      setError({
        isError: true,
        message: 'Password không trùng khớp !'
      })
      return
    }

    register.mutate({username, password})

  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
}

  return (
    <div className="h-screen relative">
      <img src={auth_banner} className="w-screen h-screen" alt="auth banner" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <Link to='/'>
        <img
          src={logo}
          className="absolute top-0 left-12 w-52 cursor-pointer "
          alt="logo"
        />
      </Link>

      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[400px] bg-[#000000bc] p-10">
        <h3 className="text-4xl font-bold">Đăng Ký</h3>
        
        <div className="flex flex-col mt-8">
          <label htmlFor="username" className="text-lg">Username</label>
          <input 
            ref={usernameRef} 
            onKeyDown={handleKeyDown}
            type="text" 
            id="username" 
            placeholder="example123" 
            className="py-3 px-5 mt-1 bg-zinc-700 outline-none rounded-lg" 
          />
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="text-lg">Password</label>
          <div className='relative'>
            <input 
                ref = {passwordRef}
                onKeyDown={handleKeyDown}
                type= {showPassword ? "text" : "password"} 
                id="password" 
                placeholder="enter your password" 
                className="w-full py-3 px-5 mt-1 bg-zinc-700 outline-none rounded-lg" 
            />

            {
                showPassword ? 
                (
                    <div 
                        className='absolute top-1/2 translate-y-[-50%] right-0 py-[10px] px-4 cursor-pointer'
                        onClick={handleToggleShowPassword}
                    >
                        <BiShow size={24} />
                    </div>
                ) :
                (
                    <div 
                        className='absolute top-1/2 translate-y-[-50%] right-0 py-[10px] px-4 cursor-pointer'
                        onClick={handleToggleShowPassword}
                    >
                        <BiHide size={24} />
                    </div>
                )
            }
          </div>
        </div>

        <div className="flex flex-col mt-2">
          <label htmlFor="confirm_password" className="text-lg">Confirm Password</label>
          <div className='relative'>
            <input 
                ref = {confirmPasswordRef}
                type= {showPassword ? "text" : "password"} 
                onKeyDown={handleKeyDown}
                id="confirm_password" 
                placeholder="enter your password again" 
                className="w-full py-3 px-5 mt-1 bg-zinc-700 outline-none rounded-lg" 
            />

            {
                showPassword ? 
                (
                    <div 
                        className='absolute top-1/2 translate-y-[-50%] right-0 py-[10px] px-4 cursor-pointer'
                        onClick={handleToggleShowPassword}
                    >
                        <BiShow size={24} />
                    </div>
                ) :
                (
                    <div 
                        className='absolute top-1/2 translate-y-[-50%] right-0 py-[10px] px-4 cursor-pointer'
                        onClick={handleToggleShowPassword}
                    >
                        <BiHide size={24} />
                    </div>
                )
            }
          </div>
        </div>

        {
          error.isError && <h4 className='mt-3 italic text-red-400'>{`Error : ${error.message}`}</h4>
        }

        <button 
            onClick={handleSubmit}
            className="w-full bg-red-600 py-3 rounded-lg mt-6 font-bold hover:bg-red-500"
        >
            Create new account
        </button>

        <div className='flex flex-col items-center'>
          <h4 className="mt-8 text-center">Bạn đã có tài khoản ?</h4>
          <Link to='/login' className="underline text-red-400 p-2 font-bold">Đăng nhập tại đây</Link>
        </div>
      </div>
      <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
      />
    </div>
  );
};

export default SignUp;
