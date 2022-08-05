import React,{useContext, useEffect, useState} from 'react'
// import AuthContext from '../../context/AuthContext';
import axiosInstance from '../../axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import jwt from 'jwt-decode';
import "./Login.scss"
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
function Login() {
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
            setUser(jwt(data["access"]))
            navigate("/dictionaries")
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





    return (<div className='login-page'>
    <Header></Header>
    <div className='content'>
    <div className='login-page-content'>
      <div className='content-title'><h2>Login</h2></div>
      {errors? errors.detail?<div className='error-detail'>{errors.detail}</div>:<></>:<></>}
    
        <div className='form-wrapper'>
          <form>
            <label htmlFor='username'>Username {errors?<div className='error'> {errors.username?errors.username:""}</div>:""}</label>
            <input onInput={handleInput} placeholder='Username' id='username' type="text" name='username'></input>
            <label htmlFor='password'>Password {errors?<div className='error'> {errors.password?errors.password:""}</div>:""}</label>
            <input onInput={handleInput} placeholder='Password' id='password' type="password" name='password'></input>
            <div className='password-forgot'><span onClick={()=>{navigate("/forget")}}>Forget password? </span></div>
            <button  onClick={handleSubmit}>Login</button>
          </form>
          

          
          {/* <div className='form-info'>(*) Required fields</div> */}
        </div>
        
        <div className='have-account'>Don't have an account? <span onClick={()=>{navigate("/register")}}>Register</span></div>
        
        
    </div>
      
    </div>  
    <Footer></Footer>
  </div>
    
  )
}

export default Login