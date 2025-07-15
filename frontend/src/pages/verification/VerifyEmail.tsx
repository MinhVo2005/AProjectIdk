import { Navigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useEffect,useRef, useState } from 'react';
import { LoaderCircle,XCircle,CheckLine } from 'lucide-react';
import { shallow } from 'zustand/shallow';

const VerifyEmail = () => {
  const calledRef = useRef(false);
  const [searchParams] = useSearchParams();
  const [ isVerifyingEmail, verifyEmail, authUser] = useAuthStore(
  (s) => [ s.isVerifyingEmail, s.verifyEmail, s.authUser],
  shallow
);
  const [show,setShow] = useState(false);
  const token = searchParams.get("token")!;

  useEffect(()=> {
    const timer = setTimeout(()=>{
      setShow(true);
    },2000);
    return ()=> clearTimeout(timer);
  },[])

  useEffect( ()=>{
    if (!calledRef.current){
      verifyEmail(token);
      calledRef.current  = true;
    };
  },[verifyEmail,token])

  if(isVerifyingEmail) 
    return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <LoaderCircle  className=' size-10 animate-spin'/>  
      <p>Verifying</p>
    </div>
    
  )
  return(  
    
    <div className="min-h-screen flex items-center justify-center p-4">
      {!authUser || !authUser.isUserVerify ? 
      <div className=" shadow-lg rounded-xl p-8 max-w-sm text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-2xl font-semibold">
          Invalid or Expired Link
        </h1>
        <p className="mt-2">
          Sorry, this verification link is no longer valid.  
        </p>
      </div>:
            
      <div>
        {show ?
      <Navigate to="/"/> :  
      <div className=' shadow-lg rounded-xl p-8 max-w-sm text-center'>
        <CheckLine className='mx-auto h-16 w-16 text-green-500'/>
        <h1 className='mt-4 text-2xl font-semibold' >
          Account has been verified
        </h1>
        <p className='my-2'>
          Redirect to homepage
        </p>
        <LoaderCircle className='mx-auto h-12 w-12 animate-spin'/>
      </div>
      }

      </div> 
}
    </div> 


  )
}

export default VerifyEmail