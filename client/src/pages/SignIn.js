import { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { Link , useNavigate} from 'react-router-dom';

import {BiHide , BiShow} from 'react-icons/bi'
import auth_banner from "../assets/images/auth_banner.jpg";
import logo from "../assets/images/logo.png";
import userApi from '../services/userApi';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const [error, setError] = useState({
    isError: false,
    message: ''
  })
  const usernameRef = useRef(null)
  const passwordRef = useRef(null)

  const handleToggleShowPassword = () => {
      setShowPassword(!showPassword)
  }

  const login = useMutation(
    userApi.login, 
    {
      onSuccess: (data) => {
        if(typeof(data) === 'object'){
          localStorage.setItem('movie_access_token', data.accessToken)
          localStorage.setItem('movie_userId', data.user._id)
          localStorage.setItem('username', data.user.username)
          navigate('/')
        }
        else {
          setError({
            isError: true,
            message: data
          })
        }
      },
      
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

    login.mutate({username, password})
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="h-screen relative">
      <img src={auth_banner} className="w-screen h-screen object-cover" alt="auth banner" />
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <Link to='/'>
        <img
          src={logo}
          className="absolute top-0 left-4 md:left-12 w-32 md:w-40 lg:w-52 cursor-pointer "
          alt="logo"
        />
      </Link>

      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[340px] md:w-[400px] bg-[#000000bc] p-6 md:p-10">
        <h3 className="text-4xl font-bold">Đăng Nhập</h3>

        <div className="flex flex-col mt-8">
          <label htmlFor="username" className="text-lg">Username</label>
          <input 
            ref={usernameRef}
            type="text" 
            onKeyDown={handleKeyDown}
            id="username" 
            placeholder="example123" 
            className="py-3 px-5 mt-1 bg-zinc-700 outline-none rounded-lg" 
          />
        </div>

         <div className="flex flex-col mt-2">
          <label htmlFor="password" className="text-lg">Password</label>
          <div className='relative'>
            <input 
                ref={passwordRef}
                type= {showPassword ? "text" : "password"} 
                id="password" 
                onKeyDown={handleKeyDown}
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

        {
          error.isError && <h4 className='mt-3 italic text-red-400'>{`Error : ${error.message}`}</h4>
        }

        <button 
          onClick={handleSubmit}
          className="w-full bg-red-600 py-3 rounded-lg mt-6 font-bold hover:bg-red-500"
        >
            Log in
        </button>

        <div className='flex flex-col items-center'>
          <h4 className="mt-8 ">Bạn chưa có tài khoản ?</h4>
          <Link to='/register' className="underline text-red-400 p-2 font-bold">Đăng ký tại đây.</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
