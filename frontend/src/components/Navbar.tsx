import { User,Search } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom';
import { useState, type FormEvent } from 'react';


const Navbar = () => {
  const authUser = useAuthStore(s => s.authUser);
  const navigate = useNavigate();
  const [search, setSearch] = useState("")

  const handleSearch = (e:FormEvent)=>{
    e.preventDefault();
    console.log(search);
  }
  return (
    <div className='navbar grid min-md:grid-cols-3 grid-cols-2 items-center bg-neutral shadow-sm'>
     <div className='px-2'>
      {authUser && (
        
          <button
          onClick={()=>{navigate("/setting")}} 
          className='btn btn-base-200 btn-circle w-16 h-16'>
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

    <form
      onSubmit={handleSearch}
      className="flex justify-end items-center space-x-2"
    >
      <input
        type="search"
        className="input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search…"
      />
      <button type="submit" className="">
        <Search /> 
      </button>
    </form>
      
    </div>
  )
}

export default Navbar