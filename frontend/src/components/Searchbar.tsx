
import React, { useMemo, useState, useEffect } from 'react'
import { useUserStore } from '../store/userStore';
import { SearchIcon } from 'lucide-react';
import debounce from 'lodash.debounce'
import { useNavigate } from 'react-router-dom';

const Searchbar = () => {
    const [search, setSearch] = useState("")
    const [searchUser, getSearchUser, getOneOnOne] = useUserStore(
        s => [s.searchUser, s.getSearchUser, s.getOneOnOne]
    )
    const navigate = useNavigate();

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

const handleGetOneOnOne = async (e:React.MouseEvent<HTMLLIElement>, id:string)=>{
  e.preventDefault();
  await getOneOnOne(id);
  navigate("/");
}

  return (
    <div className='flex'>
      
       
        { 
        <div className='fixed inset-0 z-50 flex justify-center items-center'>
            <div className='absolute inset-0 bg-neutral opacity-40'
            onClick={()=>{
              setSearch("")
              useUserStore.setState({searchUser:[]})
              navigate("/")
            }}
            />
            <div className='relative w-2xl bg-base-100 rounded-2xl'>
              <SearchIcon className='absolute inset-5 w-5 h-5 text-white'/>
                <input
                  //ref={inputRef}
                  type="search"
                  placeholder="Search for user"
                  className="
                    w-full py-4 pl-12 pr-4
                    border border-neutral rounded-2xl
                    placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-base-content/50 focus:border-base-content/50
                    transition
                  "
                  // onChange / value here…
                  value={search}
                  onChange={handleChange}
                />
                <ul className=' max-h-60 w-full overflow-auto'>
                  {searchUser.map(
                    user =>(
                        <li 
                        className='text-xl w-full overflow-hidden truncate p-2 hover:bg-base-300  cursor-pointer'
                        onClick={e=>handleGetOneOnOne(e,user._id)}
                        key={user._id}>{user.displayName}</li>
                    )
                )}
                </ul>
                
            </div>
        </div>
        }
    
    </div>
  )
}

export default Searchbar