import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from 'socket.io-client';
const BASE_URL='https://talkie-backend-production-4eb8.up.railway.app'
export const useAuthStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers: [],
    socket:null,
    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get('/api/auth/check');
            set({authUser:res.data})
             get().connectSocket()
        }catch(error){
            console.log(error)
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signup:async(data)=>{
        console.log(data)
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post('/api/auth/signup',data)
            set({authUser:res.data});
            toast.success('Account Created Successfully')
             get().connectSocket()
        } catch (error) {
            toast.error(error.res.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        console.log(data)
        try {
            set({isLoggingIn:true})
            const res=await axiosInstance.post('/api/auth/login',data)
            set({authUser:res.data})
            toast.success('Logged in Successfully')
            get().connectSocket()
        } catch (error) {
            toast.error(error.res.data.message)
        }finally{
            set({isLoggingIn:false})
        }
    },
    logout:async()=>{
        try{
            await axiosInstance.post('/api/auth/logout')
            set({authUser:null})
            toast.success('User Logged Out Successfully')
            get().disconnectSocket();
        }catch(error){
            toast.error(error.res.data.message)
        }
    },
    updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/api/auth/update_profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket:()=>{
    const {authUser}=get()
    if(!authUser || get().socket?.connected) return;
    const socket=io(BASE_URL,{
        query:{
            userId:authUser._id,
        }
    })
    socket.connect()
    set({socket:socket});
    socket.on('getOnlineUsers',(userIds)=>{
        set({onlineUsers:userIds})
    })
  },
  disconnectSocket:()=>{
    if(get().socket?.connected) get().socket.disconnect()
  },
}))