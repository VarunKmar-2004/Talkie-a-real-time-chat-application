import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, EyeOffIcon, Loader2, LockIcon, MailIcon, MessageSquare } from 'lucide-react'

const Login = () => {
  const {login,isLoggingIn}=useAuthStore()
  const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    email:"",
    password:''
  })
  const navigate=useNavigate()
  const handleSubmit=(e)=>{
    e.preventDefault()
    login(formData)
  }

  return (
    <div className='min-h-screen flex justify-center items-center px-2'>
  <div className='flex flex-col sm:flex-row items-center gap-2 bg-[#111010] sm:px-4 px-2 py-2 rounded-[10px] w-full max-w-4xl'>
    
    {/* Left side message */}
    <div className='hidden sm:flex flex-col items-center gap-2 cursor-pointer w-full sm:w-1/2'>
      <MessageSquare className='size-10 text-green-500 hover:text-green-600 transition-colors'/>
      <h1 className='font-serif font-bold lg:text-2xl text-white text-center'>Welcome Back!!</h1>
      <p className='font-sans text-white text-sm text-center'>SignIn to you account</p>
    </div>

    {/* Form side */}
    <div className='flex flex-col gap-2 items-center p-2 w-full sm:w-1/2'>
      <div className='p-2'>
        <h1 className='text-center text-white font-serif text-xl'>Sign In</h1>
      </div>
      
      <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4 w-full bg-[#161515] py-3 sm:px-4 px-2 rounded-md'>
        <div className='flex flex-col gap-1 w-full'>
          <label><MailIcon className='text-[#454242] size-5 ml-1'/></label>
          <input value={formData.email} onChange={(e)=>{setFormData({...formData,email:e.target.value})}} type='email' placeholder='Email...' className='px-2 py-1 focus:outline-emerald-400 transition-all bg-[#242323] text-white placeholder:text-[#3d3c3c] w-full rounded-[3px]'/>
        </div>
        <div className='flex flex-col gap-1 w-full'>
          <label><LockIcon className='text-[#454242] size-5 ml-1'/></label>
          <div className='relative w-full'>
            <input type={showPassword ? 'text' : 'password'} value={formData.password} onChange={(e)=>{setFormData({...formData,password:e.target.value})}} placeholder='Password' className='px-2 py-1 focus:outline-emerald-400 transition-all bg-[#242323] text-white placeholder:text-[#3d3c3c] w-full rounded-[3px] pr-8'/>
            {showPassword ? (
              <EyeIcon onClick={() => setShowPassword(!showPassword)} className='size-4 text-white cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2'/>
            ) : (
              <EyeOffIcon onClick={() => setShowPassword(!showPassword)} className='size-4 text-white cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2'/>
            )}
          </div>
        </div>
        <div className='w-full mt-1'>
          <button disabled={isLoggingIn} type="submit" className='px-2 py-1 w-full flex flex-row justify-center items-center text-center bg-emerald-500 hover:bg-emerald-600 transition-colors text-black font-serif text-lg rounded-[5px] hover:cursor-pointer'>
            {isLoggingIn?(
              <>
              <Loader2 className='size-3 animate-spin'/>
              Loading...
              </>
            ):("Sign In")}
          </button>
        </div>
        <p className='text-center text-white font-sans text-sm'>Don't have an account?
          <span className='text-emerald-600 ml-1 font-serif hover:cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login