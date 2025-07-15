import  { useState } from 'react'
import {Eye, EyeOff, Loader2} from "lucide-react"
import { useNavigate } from 'react-router-dom';




const Verification = (handleLoginOrSignup:(e:any)=>void,formData:any,setFormData:any, 
    signup:boolean, isLoginOrSignup:boolean) => {
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();
  return (
    <div className=' flex h-screen items-center justify-center p-10 bg-[url(/background/pic6.jpg)] bg-repeat-x bg-[#c7f8ff] overflow-scroll'>
        <div className='flex flex-col h-full max-sm:h-10/12 w-md bg-base-100 rounded-[90px] max-sm:rounded-none space-y-10 justify-center items-center shadow-black shadow-2xl'>
          <div className='rounded-full w-40 h-40 bg-base-100 ring-2 flex justify-center items-center text-6xl font-serif'>
            <p className='animate-pulse hover:animate-none'>
            {/*To do: Change it to random emoji (i.e: flower, heart, disco ball,...) */}  
              🌟
            </p>
          </div>

            <p className='text-center text-2xl font-bold'>
                {signup? "Create an account":"Login"}
            </p>

          <form 
          className=' flex flex-col space-y-6 w-xs justify-center items-center'
          onSubmit={handleLoginOrSignup}>


            {/* DisplayName */}
            {signup && <label className="input w-xs max-sm:w-2xs">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </g>
              </svg>

              <input
                type="text"
                placeholder="Display name"
                disabled={isLoginOrSignup}
                value={formData.displayName}
                onChange={(e) => setFormData({...formData,displayName: e.target.value})}
              />
            </label>
}
            {/* Email */}
            <label className="input  max-sm:w-2xs" >
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                </svg>
                <input 
                type="email" 
                placeholder="example@mail.com" 
                required 
                value={formData.email}
                disabled={isLoginOrSignup}
                onChange={(e)=>setFormData({...formData,email: e.target.value})}
                />
            </label>


            <label className="input  max-sm:w-2xs">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                    >
                    <path
                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                    ></path>
                    <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </g>
                </svg>
                <input
                    type={showPass?"text": "password"}
                    required
                    placeholder="Password"
                    disabled={isLoginOrSignup}
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData, password: e.target.value})}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPass(!showPass)}

                >
                  {showPass ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
                </label>

            <button
                type='submit'
                className='btn font-bold p-4 text-xl max-sm:w-2xs'
                disabled={isLoginOrSignup}
                >
                { isLoginOrSignup?
                <Loader2 className='size-5 animate-spin'/>:
                <p>Submit</p>  }
                    
            </button>
            <div>
            {signup? 
          //For Signup
          (
            <div className='flex justify-center items-center-safe'>
              Already have an account?
                 <button
              className='btn btn-link'
              onClick={()=>navigate("/login")}
              >
                Log in
              </button>
            
              
            </div>
         
          )
          :
          //For Login
          <div className='flex justify-center items-center-safe'>
              Don't have an account?
                 <button
              className='btn btn-link'
              onClick={()=>navigate("/signup")}
              >
                Create one
              </button>
            
              
            </div>  
          }
          </div>

          </form>
          
          
        </div>

      
      </div>
  )
}

function VerificationWrapper(props: {
  handleLoginOrSignup: (e: any) => void;
  formData: any;
  setFormData: any;
  signup: boolean;
  isLoginOrSignup: boolean;
}) {
  // just call your function and return its JSX
  return Verification(
    props.handleLoginOrSignup,
    props.formData,
    props.setFormData,
    props.signup,
    props.isLoginOrSignup
  );
}
export default VerificationWrapper;