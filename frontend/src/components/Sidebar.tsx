import {useEffect, useRef} from 'react'
import { useChatStore } from '../store/chatStore'
import SidebarSkeleton from './skeleton/Sidebar.skel'
import { CircleAlert, MessageCirclePlus, Users } from "lucide-react";
import { useAuthStore } from '../store/authStore';
import type { IRoom } from '../lib';
import { useNavigate } from 'react-router-dom';

  const Sidebar = () => {
      const {authUser} = useAuthStore();
      const [getSideBarUser,sideBarUser,isLoadingSidebarUser,selectedRoom, updateRead] = useChatStore(s=>
        [s.getSideBarUser,s.sideBarUser,s.isLoadingSidebarUser, s.selectedRoom, s.updateRead]
      )
      const navigate= useNavigate();
      const containerRef = useRef<HTMLDivElement>(null)
      const roomRefs = useRef(new Map<string, HTMLDivElement>());
      
      useEffect(()=>{
        getSideBarUser();
        },[getSideBarUser]);

        useEffect(() => {
          if (selectedRoom?._id) {
            const el = roomRefs.current.get(selectedRoom._id);
            if (el) {
               el.scrollIntoView({ block: "nearest" })
            }
          }
        }, [selectedRoom]);


  const notif = (room: IRoom): boolean => {
    if (!authUser?._id) return false;
    return(!room.hasRead.includes(authUser._id) && selectedRoom?._id !== room._id);
  };

    if (isLoadingSidebarUser) return <SidebarSkeleton />
    return (
        <div className='flex flex-col border-r-2 w-90 shrink-0 max-lg:w-50 max-sm:hidden h-full '>
          <div className='relative flex items-center border-b-2 justify-center'>
              <MessageCirclePlus 
              className='absolute left-5 font-extrabold cursor-pointer'
              onClick={() => navigate("/createRoom")}
              />
            <Users className="w-6 h-6 max-lg:hidden" />
            <p className='text-xl text-center p-4 '>Contact</p>
          </div>
            <div 
            ref={containerRef}
            className='flex flex-col overflow-y-auto w-full'>
              {[...sideBarUser.entries()].reverse().map(([index,room]) =>{
            const notification = notif(room);
            return(
            <div
             key={index}
             ref = {(el)=>{
              if (el) {
                roomRefs.current.set(index,el);
              }else{
                roomRefs.current.delete(index);
              }
             }}
            >
              <div
              className= {`flex min-lg:w-full text-2xl items-center justify-center rounded-xl p-5 cursor-pointer 
                
                ${selectedRoom?._id==room._id?"bg-base-300 ": "hover:bg-base-300"}
                ${notification ? "bg-neutral": ""}
                `}
                
              onClick={()=> {
                if (selectedRoom?._id === room._id){
                useChatStore.setState({selectedRoom:null})
                }else{
                useChatStore.setState({selectedRoom:room})
                updateRead(room._id)
              }}
                
              }
             >
              <div className={`relative h-16 w-16 flex shrink-0 overflow-clip m-2
              `}>
                {notification&&
                <div className='absolute top-0 right-0 min-lg:hidden'>
                  <CircleAlert className='text-info bg-error-content rounded-full'/>
                </div>
                }
                {room.isGroup && !room.imageIcon? 
                <div className='size-full'>
                  <img src={room.participants[0].profilePic} alt=""
                  className='absolute size-12 inset-0 rounded-full border-2'
                  />
                  <img src={room.participants[1].profilePic} alt="" 
                  className='absolute size-12 inset-4 rounded-full border-2 '
                  />
                </div>
                :<img 
                className=' w-full h-full rounded-full border-2 '
                src={room.imageIcon|| "/avatar.png"} alt="" />
                
                }
                
              </div>
                <div className={`max-lg:hidden flex-1 min-w-0 truncate text-2xl"}`}>
                  <p>{room.name}</p>
                  <p className={` ${notification ? "": "hidden"} text-sm font-bold`}>NEW MESSAGE</p>
                  </div>
                {notification && <div className='max-lg:hidden w-4 h-4 rounded-full bg-info m-3'/>}
              </div>
            
            </div>
            )
          }
        )
      }
            </div>
        </div>
    )
  }

  export default Sidebar;