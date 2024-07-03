import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './Auth.css';
import logo from '../../assets/logo.svg';
import AboutAuth from './AboutAuth';
import { signup , login } from '../../actions/auth';

const Auth = () => {

  const [ isSignup , setIsSignup ] = useState(false) ;
  const [name, setName] = useState('')    
  const [email, setEmail] = useState('')    
  const [password , setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setIsSignup(!isSignup)
  }

  const handleSubmit = (e) => {
      e.preventDefault()

      if(!email){
        alert("Enter an email")
      } 
      if(!password){
        alert("Enter a password")
      }

      if(isSignup){
          if(!name){
            alert("Enter a name to continue")
          }
          dispatch(signup(({name , email , password}) , navigate))
      }else{
        dispatch(login(({ email , password}) , navigate))
      }
  }

  return (
  <>

    <section className='auth-section'>
      { isSignup && <AboutAuth/>  }
      <div className="auth-container">
        { !isSignup && <img src={logo} alt='stack-overflow' className='login-logo'/>}
        <form onSubmit={handleSubmit}>
          {
            isSignup && (
               <label htmlFor="name">
                 <h4>Display name</h4>
                 <input type="text" id='name' name='name' onChange={(e) => {setName(e.target.value)}}/>
               </label>
            )
          }
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
          </label>
          <label htmlFor="password">
            <div style={{display:'flex' , justifyContent:'space-between'}}>
              <h4>Password</h4>
              { !isSignup && <p style={{color: '#007ac6', fontSize:'13px'}}>Forgot password ?</p>}
            </div>
              <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
              { isSignup && <p style={{color:'#666767' , fontSize:'13px'}} >Password must contain at least eight <br/> characters, including at least 1 letter and 1 <br/> number</p> }
          </label>
          {
            isSignup && (
              <label htmlFor="check">
                <input type="checkbox" id='check'/>
                <p style={{fontSize:'13px'}} >Opt-in to recieve occasional <br/> product updates. User research invitations, <br/> company announcements, and digests.</p>
              </label>
              
            )

          }
          <button type='submit' className='auth-btn'>{ isSignup ? 'Sign Up' : 'Log In' }</button>
          {
            isSignup && (
              <p style={{color:'#666767' , fontSize:'13px'}}>
                By clicking "Sign Up", you agree to our <span style={{color: '#007ac6' , cursor:'pointer'}}>terms of <br/> service</span>,
                <span style={{color: '#007ac6' , cursor:'pointer' }}> privacy policy</span> and
                <span style={{color: '#007ac6' , cursor:'pointer' }}> cookie policy</span> 
              </p>
            )
          }
        </form>
        <p style={{padding: '10px'}}>
          { isSignup ? 'Already have an account ?' : "Don't have an account ?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{ isSignup ? "Log In" : "Sign Up" }</button>
        </p>
      </div>
    </section>
  </>  
  )
}

export default Auth
