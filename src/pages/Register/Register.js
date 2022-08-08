import React,{useState} from 'react'
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import "./Register.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Register() {


    const [userInput,setUserInput] = useState({});
    const [errors,setErrors] = useState(null);
    const navigate = useNavigate();
    const handleInput = (e) => {
        setUserInput({...userInput,[e.target.name]:e.target.value})
    }
    const handleSubmit = (e)=>{
        e.preventDefault();

        axiosInstance.post("/token/create/",userInput).then(response=>{
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


    return (<div className='register-page'>
    <Header></Header>
    <div className='content'>
    <div className='register-page-content'>
      <div className='content-title'><h2>Register</h2></div>
      {errors? errors.detail?<div className='error-detail'>{errors.detail}</div>:<></>:<></>}
    
        <div className='form-wrapper'>
          <label htmlFor='email'>Email {errors?<div className='error'> {errors.email?errors.email:""}</div>:""}</label>
          <input onInput={handleInput} placeholder='Email' id='email' type="email" name='email'></input>
          <label htmlFor='username'>Username {errors?<div className='error'> {errors.username?errors.username:""}</div>:""}</label>
          <input onInput={handleInput} placeholder='Username' id='username' type="text" name='username'></input>
          <label htmlFor='password'>Password {errors?<div className='error'> {errors.password?errors.password:""}</div>:""}</label>
          <input onInput={handleInput} placeholder='Password' id='password' type="password" name='password'></input>
          
          <button type='submit' onClick={handleSubmit}>Register</button>

          
          {/* <div className='form-info'>(*) Required fields</div> */}
        </div>
        
        <div className='have-account'>Have an account? <span onClick={()=>{navigate("/login")}}>Login</span></div>
        
        
    </div>
  
    </div>  
    <Footer></Footer>
  </div>
    
  )
}

export default Register