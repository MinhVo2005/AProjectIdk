import  { useEffect, useRef } from 'react'
import { useChatStore } from '../store/chatStore'

import { useAuthStore } from '../store/authStore'
import ChatHeader from './ChatHeader'
import ChatContainerSkel from './skeleton/ChatContainer.skel'
import { formatMessageTime } from '../lib/utils'
import MessageInput from './MessageInput'

const ChatContainer = () => {
    const [authUser] = useAuthStore(s =>[s.authUser])
    const [selectedRoom, getMessages,messages, isLoadingMessages,
   subscribeToMessages,unsubscribeToMessages] = useChatStore(s => [
      s.selectedRoom,
      s.getMessages,
      s.messages, 
      s.isLoadingMessages, 
      s.subscribeToMessages,
      s.unsubscribeToMessages,
    ]);


    const messageRef = useRef<HTMLLIElement>(null);


    useEffect(() =>{
      if (messageRef.current && messages){
        messageRef.current.scrollIntoView()
      }
    }, [messages])

    useEffect(()=>{
      if (selectedRoom){
        getMessages(selectedRoom._id);
        subscribeToMessages();
        return ()=>{
          console.log("hello")
          unsubscribeToMessages(selectedRoom._id)}
      }
      
    },[selectedRoom?._id, getMessages])


if (!selectedRoom){
  return (
    <div className=' h-full w-full bg-linear-to-b from-base-300 	to-neutral flex justify-center items-center'>
      <div className='flex w-1/2 h-1/2 justify-center items-center border-3 rounded-2xl bg-linear-to-t from-base-300 	to-neutral shadow-2xl text-4xl'>
      Select a person to chat with!
      </div>
    </div>
  );
}
  
    
 return(     
    <div className='flex flex-col items-center justify-around bg-base-200 h-full w-full'> 
      
      <div className='bg-base h-[90%] w-11/12 border-3 rounded-[10px] flex flex-col '>
      <ChatHeader />
       {!isLoadingMessages ? 
       (<div className='flex flex-col-reverse justify-start w-full overflow-auto h-full pb-2 px-2'>
          <MessageInput />          
          {/* Start of message box */}
          <ul className='flex flex-col overflow-auto my-2'>
              {messages?.map((message,idx) => (
                
                <li
                key={message._id}
                ref = {messageRef}
                className= {`chat group hover:bg-base-300 
                  ${message.fromUserId._id === authUser?._id ? "chat-end": "chat-start"}`}
                >
                {
                  messages[idx-1]?.fromUserId._id=== message.fromUserId._id ?
                    <time className=' row-span-2 w-16 h-full flex justify-center items-center'>
                      <p className=' group-hover:opacity-100 opacity-0'>{formatMessageTime(message.createdAt,true)}</p></time>
                    :
                    <>
                    <time className='text-center text-[0.5rem] w-16 self-center'>
                      {formatMessageTime(message.createdAt,false)}</time>
                     <div className='avatar px-2 row-span-1 flex-end'>
                    <div className='w-12 border-2 rounded-full'>
                      <img
                      src={message.fromUserId.profilePic}
                      />
                    </div>

                  </div>  
                   <div className='chat-header items-baseline'>
                    <p className='text-lg font-semibold'>{message.fromUserId.displayName}</p>
                    
                  </div>
                    </>
                    
                }
                 

                  <div className={`chat-bubble text-2xl text-wrap break-words hyphens-auto 
                    ${message.fromUserId._id === messages[idx+1]?.fromUserId._id? "!rounded-field before:hidden": ""} 
                    ${message.fromUserId._id === authUser?._id ? "chat-bubble-info": "chat-bubble-neutral"}`}>
                    <div>
                      {message.text}
                      </div> 
    
                  </div>
                  
                  
                </li>
              ))}
          </ul>
        </div>):
        <ChatContainerSkel />
        }
      </div>
    </div>
 )

    
    
    
  }

export default ChatContainer