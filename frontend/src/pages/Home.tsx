import React from 'react'
import Navbar from "../components/Navbar.tsx"
import Sidebar from '../components/Sidebar.tsx'
import ChatContainer from '../components/ChatContainer.tsx'


const Home = () => {
  return (
    <div className='bg-base-100 h-screen '>
    
      <Navbar />
      <div className='h-11/12 grid grid-cols-4 '>
        <div className='flex justify-center items-center'>
        <Sidebar/>
          
        </div>
        <div className='col-span-3'>
          <ChatContainer/>
        </div>
      </div>
    </div>
  )
}

export default Home