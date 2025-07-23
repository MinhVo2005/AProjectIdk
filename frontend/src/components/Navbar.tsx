import { User, } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom';
import SearchBar  from './Searchbar';




const Navbar = () => {

  const authUser = useAuthStore(s => s.authUser);
  const logout = useAuthStore(s=> s.logout)
  const navigate = useNavigate();
 
  return (
    <>
    
    <div className='h-1/12 navbar grid min-md:grid-cols-3 grid-cols-2 items-center bg-neutral shadow-sm'>
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
        className='cursor-pointer '
        onClick={()=>{navigate("/")}
        }>
          MyChatApp
        </button>
      </div>
    <div className='flex justify-around'>
      <SearchBar/>
      <div 
      onClick={() => logout()}
      className='hover:bg-base-100 rounded-2xl text-center text-sm p-2'>LOG OUT </div>
    </div>
    
    </div>
  </>
  )
}

export default Navbar