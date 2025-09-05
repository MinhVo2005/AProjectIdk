
import VerificationWrapper from '../components/Verification';
import { useState } from 'react';
import type { IFormData } from '../lib';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Signup = () => {
  const initialData = {
    displayName: "",
    email:"",
    password: ""
  }
  const [isSigningUp, signup] = useAuthStore(s => [s.isSigningUp, s.signup])
  const [formData, setFormData] = useState<IFormData>(initialData);

  function hasNumber(str: string): boolean{
    return /\d/.test(str);
}


    const validateForm = () => {
    if (!formData.displayName!.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 8) return toast.error("Password must be at least 8 characters ");
    if(!hasNumber(formData.password)) return toast.error("Password must contain number")

    return true;
  };
  const handleSignup = async (e:SubmitEvent)=>{
    e.preventDefault();
    const success = validateForm();
    if(success===true){
       await signup(formData);
      }
    else return;
    setFormData(initialData)
  };


  return (
    <div className='h-screen bg-base-300'>
      <VerificationWrapper
        handleLoginOrSignup={handleSignup}
        formData={formData}
        setFormData={setFormData}
        signup={true}
        isLoginOrSignup={isSigningUp}
      />

    </div>
   
  )
}

export default Signup