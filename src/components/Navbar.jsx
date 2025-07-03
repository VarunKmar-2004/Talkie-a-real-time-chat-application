import { LogOutIcon, MessageSquare, Settings, UserCircle } from 'lucide-react'
import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
  const {logout,authUser}=useAuthStore()
  const navigate=useNavigate()
  return (
    <div className='text-white h-16 px-4 sm:px-8 flex flex-row justify-between items-center  w-full fixed top-0 z-40 mx-auto'>
      <div className='px-2 py-2 flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/')}>
        <MessageSquare className='size-8 text-emerald-500 hover:text-emerald-600'/>
        <h1 className='hover:text-emerald-500 font-semibold font-sans text-xl'>Talkie</h1>
      </div>
      <div className='flex items-center justify-between gap-8 px-2 py-2'>

  <div className='flex items-center gap-2 text-white hover:cursor-pointer group' onClick={()=>navigate('/settings')}>
    <Settings className='size-5 text-[#2d2b2b] group-hover:text-emerald-500' />
    <h1 className='font-semibold font-sans text-md group-hover:text-emerald-500'>Settings</h1>
  </div>
  {authUser?(<>
   <div className='flex items-center gap-2 text-white hover:cursor-pointer group' onClick={()=>navigate(authUser?'/profile':'/login')}>
    <UserCircle className='size-5 text-[#2d2b2b] group-hover:text-emerald-500' />
    <h1 className='font-semibold font-sans text-md group-hover:text-emerald-500'>Profile</h1>
  </div>

  <div className='flex items-center gap-2 text-white hover:cursor-pointer group' onClick={logout}>
    <LogOutIcon className='size-5 text-[#2d2b2b] group-hover:text-emerald-500' />
    <h1 className='font-semibold font-sans text-md group-hover:text-emerald-500'>Logout</h1>
  </div>
  </>):''}

</div>

    </div>
  )
}

export default Navbar