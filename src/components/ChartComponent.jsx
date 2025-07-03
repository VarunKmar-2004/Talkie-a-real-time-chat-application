import React, { useEffect, useRef } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import ChatHeader from './ChatHeader'
import MessageSkeleton from '../Skeletons/MessageSkeleton'
import MessageInput from './MessageInput'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChartComponent = () => {
  const {messages,getChats,isLoadingChat,selectedUser,subscribeToMessages,unsubscribeToMessages}=useMessageStore()
  const{authUser}=useAuthStore()
  const messageEndRef=useRef(null)
  useEffect(()=>{
    getChats(selectedUser._id);
    subscribeToMessages();
    return ()=>unsubscribeToMessages();
  },[selectedUser._id,getChats,subscribeToMessages,unsubscribeToMessages])
  useEffect(()=>{
    if(messageEndRef.current && messages){
        messageEndRef.current.scrollIntoView({behaviour:'smooth'})
    }
  },[messages])
  if (isLoadingChat){
    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader/>
            <MessageSkeleton/>
            <MessageInput/>
        </div>
    )
  }
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profile_pic || "/avatar.png"
                      : selectedUser.profile_pic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs text-gray-500 ml-1">
                {console.log(message.createdAt)}
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.Image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
        <MessageInput/>
    </div>
  )
}

export default ChartComponent