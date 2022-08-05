import React,{useContext, useEffect, useState} from 'react'
// import AuthContext from '../../context/AuthContext';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import jwt from 'jwt-decode';
import "./ForgetPassword.scss"
import Header from '../../components/Header/Header';

function ForgetPassword() {

    const { user, setUser } = useContext(AuthContext)
    const [userInput,setUserInput] = useState({});
    const [errors,setErrors] = useState(null);
    const navigate = useNavigate();
    const handleInput = (e) => {
        setUserInput({...userInput,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();

        axiosInstance.post("/token/obtain/",userInput).then(response=>{
            let data = response.data;
            localStorage.setItem('access', data["access"]);
            localStorage.setItem('refresh', data["refresh"]);

            axiosInstance.defaults.headers['Authorization'] = "Bearer "+ data["access"];

            navigate("/login")
        }).catch(error=>{
            console.log("ERROR",error);
            if(error.response){
              if(error.response.status === 400 || error.response.status === 401){
                console.log(error.response.data);
                setErrors(error.response.data);
              }

            }
          })
    }


    return (<>
    <Header></Header>
    <div className='content'>
    <div className='register-page-content'>
      <div className='content-title'><h2>Forgot Password</h2></div>
      {errors? errors.detail?<div className='error-detail'>{errors.detail}</div>:<></>:<></>}
    
        <div className='form-wrapper'>
          <label htmlFor='email'>Email {errors?<div className='error'> {errors.email?errors.email:""}</div>:""}</label>
          <input onInput={handleInput} placeholder='Email' id='email' type="email" name='email'></input>

          <button type='submit' onClick={handleSubmit}>Submit</button>

          
          {/* <div className='form-info'>(*) Required fields</div> */}
        </div>
        
        <div className='have-account'><span onClick={()=>{navigate("/login")}}>Back to login</span></div>
        
        
    </div>
  
    </div>  
  </>
    
  )
}

export default ForgetPassword