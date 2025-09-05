
import { useChatStore } from '../store/chatStore'

const ChatHeader = () => {
  const [selectedRoom] = useChatStore(s => [s.selectedRoom])
  console.log(selectedRoom)
  return (
    <div className='bg-base-100 w-full border-b-1 flex items-center p-2 space-x-2 rounded-t-2xl'>
        <div className='relative size-16 flex shrink-0'>
           {selectedRoom?.isGroup && !selectedRoom.imageIcon? 
                <div className='size-full'>
                  <img src={selectedRoom.participants[0].profilePic} alt=""
                  className='absolute size-12 inset-0 rounded-full border-2'
                  />
                  <img src={selectedRoom.participants[1].profilePic} alt="" 
                  className='absolute size-12 inset-4 rounded-full border-2 '
                  />
                </div>
                :<img 
                className=' w-full h-full rounded-full border-2 '
                src={selectedRoom?.imageIcon|| "/avatar.png"} alt="" />
                
                }
        </div>
         <p
         className='text-2xl truncate max-w-sm'
         >{selectedRoom?.name}</p>
    </div>
  )
}

export default ChatHeader