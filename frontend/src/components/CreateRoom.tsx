
import {  Image, Search,  X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/userStore';
import debounce from 'lodash.debounce';
import type { IUser } from '../lib';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const CreateRoom = () => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');
    const [search, setSearch] = useState('')
    const [openSearchList, setOpenSearchList] = useState(false)
    const [authUser] = useAuthStore(s=> [s.authUser]);
    const [searchUser, getSearchUser,isCreatingRoom,createRooms] = useUserStore(
        s => [s.searchUser, s.getSearchUser,s.isCreatingRoom,s.createRooms]
    )
    const [image,setImage] = useState('')
    const fileImageRef = useRef<HTMLInputElement>(null);
    const debouncedSearch = useMemo(
        () =>
          debounce((q: string) => {
            getSearchUser(q)
          }, 300),
        [getSearchUser]
      )
    
      // 2) Clean up on unmount
      useEffect(() => {
        return () => {
          debouncedSearch.cancel()
        }
      }, [debouncedSearch])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const q = e.target.value
        setSearch(q)
        if (q.trim().length >= 2) {
          debouncedSearch(q)
        } else {
          // clear early
          debouncedSearch.cancel()
          useUserStore.setState({ searchUser: [] })
        }
    }
    const [selectedUser, setSelectedUser] = useState<Map<string,IUser>>(new Map());
    const selectedUserArray= [...selectedUser]
    const firstFewUser = selectedUserArray.slice(0,6);
    const extraUser = selectedUserArray.length-firstFewUser.length

    const toggleUser = (user:IUser)=>{
        setSelectedUser((prev) => {
        const newSet = new Map(prev);
        const userId = user._id
        if (newSet.has(user._id)) {
            newSet.delete(userId);
        } else {
            newSet.set(userId,user);
        }
        return newSet;
        });
    }

    const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const files = e.target.files;
        if (!files) return;
    
        const reader = new FileReader();
    
        reader.readAsDataURL(files[0]);
        reader.onload = async () =>{
          const base64Image = reader.result as string;
          if (!base64Image) return;
          setImage(base64Image);
        }
    }

    const handleCreateRoom =async ()=>{
        //Add user to the list of participants
        if(!authUser) return toast.error("Profile not found")
        const selectedUserMap = new Map(selectedUser)
        selectedUserMap.set(authUser._id,authUser);

        const listOfUser =[...selectedUserMap.keys()]
        if (!groupName || listOfUser.length<2) return toast.error("Missing value")

         const room = {
            name: groupName,
            participants: listOfUser,
            imageIcon: image
         }
        
        await createRooms(room);
        useUserStore.setState({searchUser:[]})
        navigate("/")
    }

    const exit = ()=>{
        setGroupName('');
        setImage('');
        useUserStore.setState({searchUser:[]});
        navigate("/")
    }

  return (
    
    <>
        <div className='fixed inset-0 z-50 h-screen flex  justify-center items-center'
        >
            <div className='absolute inset-0 bg-base-300 opacity-60'
            onClick={exit}
            ></div>
            <div className='relative flex flex-col items-center justify-between h-175 w-150 z-100'
            >
                <div className='absolute w-full h-full bg-accent-content rounded-2xl -z-1'
                 onClick={()=>{
                    setOpenSearchList(false)}}
                ></div>
                <X  className='absolute top-3 right-3 cursor-pointer'
                onClick={exit}
                />
                <div className='flex flex-col justify-center items-center space-y-3 mt-5'>
                <p className='text-2xl'>New group chat</p>
                <div className='relative rounded-full overflow-hidden cursor-pointer'
                onClick={()=> fileImageRef.current?.click()}
                >
                    {image?<img src={image} alt=""
                    className='size-24'
                    />:
                    <div className='size-24 rounded-full border-2'
                    >
                        <Image className='size-full p-5'/>
                    </div>}
                    <input type="file"
                    ref={fileImageRef}
                    className='hidden'
                    accept='image/*'
                    onChange={handleImageUpload}
                    />
                </div>
               <div className='relative'>
                <input type="text"
                placeholder='Group name'
                value={groupName}
                onChange={e=>setGroupName(e.target.value)}
                className='text-2xl w-md p-2 border-2 rounded-2xl'
                />
               </div>

               <div className='relative w-md '>
                <input type="text"
                placeholder='Search'
                value={search}
                onChange={handleChange}
                onFocus={()=>{
                    setOpenSearchList(true)}}
                className='text-md w-full pl-9 p-2 border-2 rounded-2xl bg-base-100'
                />
                <Search className='absolute top-2.5 left-2'/>
                <div className='w-full max-h-50 overflow-auto my-2 rounded-2xl'>
                    {openSearchList && searchUser.map((user,idx)=>{
                    return(
                        <div
                        key={idx}
                        className='flex relative items-center w-full bg-base-100'
                        
                        >
                            <img src={user.profilePic} alt=""
                            className='w-12 h-12 rounded-full flex shrink-0 p-2'
                            />
                            <p className='truncate pr-12'>{user.displayName}</p>
                            <input 
                            className='absolute right-4 checkbox'
                            checked = {selectedUser.has(user._id)}
                            onClick={()=>toggleUser(user)}
                            type="checkbox" 
                            readOnly
                            />
                        </div>
                    )}
                    )}
                </div>
               </div>
              <div className='flex flex-row w-md justify-start items-center gap-4'>
                 {firstFewUser.map(([key,user])=>{
                
                return (
                    <div
                    key={key}
                    className='relative'
                    >
                        <X className='absolute -top-1 -right-1'
                        onClick={()=>toggleUser(user)}
                        />
                        <img src={user.profilePic} alt="" 
                        className='w-12 h-12 rounded-full'
                        />
                    </div>
                    
                )
               })}
               {extraUser>0 && 
               <div className='flex w-12 h-12 rounded-full bg-base-100 justify-center items-center text-lg font-bold '>
                    +{extraUser}
               </div>
               }
              </div>
                </div>
               
               
               <button className='m-auto bg-info text-info-content font-bold text-2xl p-3 rounded-2xl cursor-pointer'
               onClick={handleCreateRoom}
               disabled={isCreatingRoom}
               >
                Create
                </button>
            </div>    
        </div>
    </>  
    
  )
}

export default CreateRoom