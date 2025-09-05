import { User, } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const authUser = useAuthStore(s => s.authUser);
  const logout = useAuthStore(s=> s.logout)
  const navigate = useNavigate();
 
  return (
    <>
    
    <div className='h-full min-md:grid-cols-3 grid-cols-2 items-center bg-neutral shadow-sm grid'>
     <div className='px-2'>
      {authUser && (
        
          <button
          onClick={()=>{navigate("/setting")}} 
          className='btn btn-base-200 btn-circle h-14 w-14'>
            <User/>
          </button>
    

      )}
     </div>
      
      
      <div className='font-medium text-2xl text-center max-md:hidden'>
        
        <button 
        className='cursor-pointer font-mono  '
        onClick={()=>{navigate("/")}
        }>
          MyChatApp
        </button>
      </div>
    <div className='flex justify-around'>
       <div className='border-1  p-2 rounded-2xl text-sm cursor-pointer hover:bg-base-100/30  '
        onClick={()=>navigate("/searchUser")}
        >Message a friend</div>
      <div 
      onClick={() => logout()}
      className='hover:bg-base-100 rounded-2xl text-center text-sm p-3 bg-base-200 cursor-pointer'>LOG OUT </div>
    </div>
    
    </div>
  </>
  )
}

export default Navbar