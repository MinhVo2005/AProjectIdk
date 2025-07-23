import React from 'react'

const ChatContainer = () => {
 return(
         
     <div className='flex pl-10 items-center h-12/12 justify-around'>
        
             <div className='bg-white h-11/12 w-3/12 '>haha</div>
             
              
             
              
   
     
      <div className='bg-white h-11/12 w-8/12 border-3 rounded-[10px] flex justify-center '>


        <div className=' flex flex-col-reverse   justify-start h-23/24 w-23/24'>
        
          <div className='flex '>
          <textarea  className="block p-2.5  w-9/10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-300 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type here..."></textarea>
          <div className='btn h-full ml-3 bg-blue-400'>dada</div>
          </div>
          

              <div className="chat chat-start  ">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          
          <div className="chat-bubble ">It was said that you would, destroy the Sith, not join them.</div>
        </div>
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-bubble">It was you who would bring balance to the Force</div>
        </div>
          <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-bubble">Not leave it in Darkness</div>
        </div>
        <div className="chat chat-end ">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full ">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
              />
            </div>
          </div>
          <div className="chat-bubble bg-blue-400 text-white wrap-anywhere">Not leave it in Darkness</div>

      
        </div>

      </div>
        </div>
    </div>
 )

    
    
    
  }

export default ChatContainer