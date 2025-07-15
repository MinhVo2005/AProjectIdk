import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Signup from './pages/Signup.tsx';
import Login from './pages/Login.tsx';
import VerifyEmail from './pages/verification/VerifyEmail.tsx';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/themeStore.ts';
import Setting from './pages/Setting.tsx';
import { useAuthStore } from './store/authStore.ts';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import VerifyPage from './pages/verification/VerifyPage.tsx';

const App = () => {
  const [authUser, isCheckingAuth, checkAuth] = useAuthStore(s=>[s.authUser, s.isCheckingAuth,s.checkAuth])
  const [theme] = useThemeStore(s => [s.theme])

  useEffect(()=>{
    checkAuth();
  },[checkAuth])

  console.log(authUser)
  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme="autumn" >
      <Routes>
        <Route path ='/verify-email' element={<VerifyEmail/>} />
        <Route path='/verify-page' element={authUser?<VerifyPage/>: <Navigate to='/login'/>}/>
        <Route path='/' element={authUser?<Home/> : <Navigate to='/login' /> } /> 
        <Route path='/setting' element={authUser? <Setting/>: <Navigate to='/login'/> } /> 
        <Route path= '/signup' element={ !authUser?<Signup/>: <Navigate to='/verify-page'/> }/>
        <Route path = '/login' element= { !authUser?<Login/> : <Navigate to='/verify-page'/> } />
      </Routes>

    <Toaster />
    </div>
  )
  
}

export default App;