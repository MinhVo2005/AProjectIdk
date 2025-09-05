import React, { useState } from 'react'
import { Camera } from 'lucide-react'
import Navbar from '../components/Navbar'
import  { useAuthStore } from '../store/authStore'

const Setting = () => {
  const [authUser,updateProfile]= useAuthStore(s=> [s.authUser, s.updateProfile])
  const [selectedImage, setSelectedImage] = useState<string|null>(null)
  const handleImageUpload = (e:React.ChangeEvent<HTMLInputElement>) =>{

    const files = e.target.files;
    if (!files) return;

    const reader = new FileReader();

    reader.readAsDataURL(files[0]);
    reader.onload = async () =>{
      const base64Image = reader.result as string;
      if (!base64Image) return;
      setSelectedImage(base64Image);
      await updateProfile(base64Image);
    }

  }
  return (
    <div className=' flex flex-col  bg-base-100 h-screen'>
      <div className='min-h-16 h-1/12'>
        <Navbar />  
      </div>
      
      <div className='flex justify-center self-center bg-base-300 h-full w-full items-center'>
        <div className='h-full w-xl bg-base-100 flex flex-col items-center p-5 space-y-2'>
          <div className='relative'>
            <img className='h-32 w-32 bg-neutral rounded-full'
            src= {selectedImage||authUser?.profilePic} alt= {authUser?.displayName} />
          <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content
                  rounded-full cursor-pointer 
                `}
              >
                <Camera className="w-6 h-6 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}

                />
          </label>
          </div>

          <div>
            {authUser?.displayName}
          </div>

          <div className='flex justify-start w-full flex-col p-2'>
            <div>email: 
            { " " + authUser?.email}</div>
            <div>
            user_id: { " " + authUser?._id}
            </div>
            <div>Account age:   </div>
            <div className='btn mt-2'>Privacy Settings</div>
            <div className='btn mt-2'>Manage Profile</div>
            <div className='btn mt-2'>users blocked</div>
            <div>
              Light Mode
            <input type='checkbox' className=' toggle'></input>
            </div>
            <div className='btn mt-2'>edit</div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setting