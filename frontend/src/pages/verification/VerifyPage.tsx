
import { useAuthStore } from '../../store/authStore'
import { Navigate,useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

const VerifyPage = () => {
    const authUser = useAuthStore(s=> s.authUser);
    const logout = useAuthStore(s=>s.logout);
    const navigate = useNavigate();

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-base-100'>
        {!authUser.isUserVerify ?
        <div className='flex flex-col space-y-5 h-4/12 w-4/12 justify-center items-center shadow-lg rounded-2xl  '>
            <p className='text-2xl font-medium'>Please verify your account</p>
            <button 
            className='btn btn-primary'
            onClick={()=>{
                logout()
                navigate('/login')}
            }
            >Return to Login</button>
        </div>:
        (
             <div>
                 <div className="flex items-center justify-center h-screen">
                     <Loader className="size-10 animate-spin" />
                 </div>
                 <Navigate to='/'/>
             </div>
         )
        
        }
    </div>
  )
}

export default VerifyPage