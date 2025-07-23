import {useEffect} from 'react'
import { useChatStore } from '../store/chatStore'
import SidebarSkeleton from './skeleton/Sidebar.skel'
import { useAuthStore } from '../store/authStore'
import type { IRoom } from '../lib'
import { shallow } from 'zustand/shallow'

const Sidebar = () => {
    const authUser = useAuthStore(s=>s.authUser)
    const [getSideBarUser,sideBarUser,isLoadingSidebarUser,selectedRoom] = useChatStore(s=>
      [s.getSideBarUser,s.sideBarUser,s.isLoadingSidebarUser, s.selectedRoom],shallow
    )
    useEffect(()=>{
      getSideBarUser();
      },[getSideBarUser ]);

    
    
    const getRoomName = (room:IRoom,userID:string): string=>{
      if (room.name.trim() === "" || room.participants.length ===2){
        const other = room.participants.find(p => p._id != userID)
        return other!.displayName
      }
      return room.name
    }
  if (isLoadingSidebarUser) return <SidebarSkeleton />
  return (
      <div className='border-2 h-11/12 w-full m-5  rounded-3xl overflow-auto'>
          <p className='text-xl text-center p-4 border-b-2'>Contact</p>
          <ul>
          {sideBarUser.map(room =>(
            <li 
            className= {`p-2 text-lg ${selectedRoom?._id==room._id?"bg-base-300": "hover:bg-base-300"} `}
            onClick={()=> useChatStore.setState({selectedRoom:room})}
            key={room._id}>
               {getRoomName(room,authUser!._id)} </li>
          ))}
          </ul>

      </div>
  )
}

export default Sidebar