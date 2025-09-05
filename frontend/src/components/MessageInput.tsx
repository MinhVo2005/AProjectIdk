import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { useChatStore } from '../store/chatStore';

const MessageInput = () => {
    const [selectedRoom, sendMessage] = useChatStore(s =>[
        s.selectedRoom,
        s.sendMessage
    ])

    let image = "";
    const [text,setText] = useState('');
    const handleSendMessage = (e: React.FormEvent)=>{
        e.preventDefault();
        if (!text.trim() || !selectedRoom) return;
        sendMessage({text:text,image:image,room:selectedRoom})
        setText('');
    }
    const handleKeyDown = (e: React.KeyboardEvent)=>{
        if(e.key == 'Enter' && !e.shiftKey){
        e.preventDefault();
        handleSendMessage(e);
        }
    }
  return (
    <form onSubmit={handleSendMessage} className='flex'>
            <textarea  
            value={text}
            onChange={e=>setText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="resize-none p-2 w-full text-2xl h-22
             text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral dark:border-gray-400 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Type here...">

            </textarea>
            <button 
            className='btn h-full ml-3 bg-neutral '
            type='submit'
            >
              <Send/>
            </button>
          </form>
  )
}

export default MessageInput