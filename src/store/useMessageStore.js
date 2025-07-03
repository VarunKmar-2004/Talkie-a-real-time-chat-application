import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useMessageStore=create((set,get)=>({
    messages:[],
    users:[],
    isLoadingUsers:false,
    isLoadingChat:false,
    selectedUser:null,
    getUsers:async()=>{
        set({isLoadingUsers:true})
        try{
        const res=await axiosInstance.get('/api/messages/users')
        set({users:res.data})
        }catch(error){
            toast.error(error.res.data.message)
        }finally{
            set({isLoadingUsers:false})
        }
    },
    getChats:async(userId)=>{
       set({isLoadingChat:true})
       try {
        const res=await axiosInstance.get(`/api/messages/${userId}`)
        set({messages:res.data})
       } catch (error) {
        toast.error(error.res.data.message)
       }finally{
        set({isLoadingChat:false})
       }
    },
    sendMessage:async(data)=>{
        const {selectedUser,messages}=get()
        try{
        const res=await axiosInstance.post(`/api/messages/send/${selectedUser._id}`,data)
        set({messages:[...messages,res.data]});
        }catch(error){
            toast.error(error.res.data.message)
        }
    },
    subscribeToMessages:()=>{
        const {selectedUser}=get()
        if(!selectedUser) return;
        const socket=useAuthStore.getState().socket;

        socket.on('newMessage',(newMessage)=>{
            const isMessageSentFromSelectedUser=newMessage.senderId===selectedUser._id;
            if(!isMessageSentFromSelectedUser) return;
            set({
                messages:[...get().messages,newMessage],
            })
        })
    },
    unsubscribeToMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off('newMessage');
    },
    
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}))