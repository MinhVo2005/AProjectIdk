import React, { type ChangeEvent, type ChangeEventHandler } from 'react'
import VerificationWrapper from '../components/Verification';
import { useState } from 'react';
import type { IFormData } from '../lib';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const Login = () => {
  const [isLoginningIn, login] = useAuthStore(
    s => [s.isLoginningIn,s.login]
  )
  const[formData,setFormData]= useState<IFormData>({
    email:"",
    password:"",
    })

  const handleLogin = async (e:SubmitEvent)=>{
    e.preventDefault();
    login(formData);  
  }

  return (
    <div className='min-h-screen bg-base-300'>
      <VerificationWrapper
        handleLoginOrSignup={handleLogin}
        formData={formData}
        setFormData={setFormData}
        signup={false}
        isLoginOrSignup = {isLoginningIn}

      />
    </div>
   
  )

}

export default Login