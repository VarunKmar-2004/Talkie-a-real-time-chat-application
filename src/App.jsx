import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes,Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/signup'
import Login from './pages/login'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { Loader } from 'lucide-react'
import Settings from './pages/Settings'
import {Toaster} from 'react-hot-toast'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
  console.log({onlineUsers})
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log(authUser)
  if(isCheckingAuth && !authUser){
    return (
      <div className='flex justify-center items-center h-screen'><Loader className='size-10 animate-spin'></Loader></div>
    )
  }
  return (
    <div className='bg-[#171717fe]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>}/>
        <Route path='/signup' element={!authUser?<Signup/>:<Navigate to='/'/>}/>
        <Route path='/login' element={!authUser?<Login/>:<Navigate to='/'/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={authUser?<Profile/>:<Navigate to='/login'/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App