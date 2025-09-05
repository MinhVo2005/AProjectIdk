
import Navbar from "../components/Navbar.tsx"
import Sidebar from '../components/Sidebar.tsx'
import ChatContainer from '../components/ChatContainer.tsx'
import { Outlet } from 'react-router-dom'


const Home = () => {
  return (
    <div className='relative flex flex-col bg-base-100 h-screen '>
      <div className='h-16'>
        <Navbar />
      </div>
      <div className='flex h-[calc(100vh-4rem)] w-12/12'>
        <Sidebar/>
        <ChatContainer />
      </div>
      
    <Outlet />
    </div>
  )
}

export default Home;