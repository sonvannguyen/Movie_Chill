import { useState } from 'react';
import { Link } from 'react-router-dom';
import {BiHide , BiShow} from 'react-icons/bi'
import auth_banner from "../assets/images/auth_banner.jpg";
import logo from "../assets/images/logo.png";

const SignIn = () => {
    const [passwordField, setPasswordField] = useState({
        password: "",
        showPassword: false
    })
    const handleChangePassword = (e) => {
        setPasswordField({...passwordField, password: e.target.value})
    }
    const handleToggleShowPassword = () => {
        setPasswordField({...passwordField, showPassword: !passwordField.showPassword})
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
        <h3 className="text-4xl font-bold">Sign In</h3>

        <div className="flex flex-col mt-8">
          <label htmlFor="email" className="text-lg">Email</label>
          <input type="email" id="email" placeholder="example123@gmail.com" className="py-3 px-5 mt-1 bg-zinc-700 outline-none rounded-lg" />
        </div>

         <div className="flex flex-col mt-2">
          <label htmlFor="password" className="text-lg">Password</label>
          <div className='relative'>
            <input 
                type= {passwordField.showPassword ? "text" : "password"} 
                id="password" 
                placeholder="enter your password" 
                className="w-full py-3 px-5 mt-1 bg-zinc-700 outline-none rounded-lg" 
                onChange={handleChangePassword}
            />

            {
                passwordField.showPassword ? 
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

        <button className="w-full bg-red-600 py-3 rounded-lg mt-6 font-bold hover:bg-red-500">Sign in</button>
        <div className='flex flex-col items-center'>
          <h4 className="mt-8 ">Don't have an account?</h4>
          <Link to='/register' className="underline text-red-400 p-2 font-bold">Sign up here</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
