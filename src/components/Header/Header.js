import React, { useEffect,useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';


import logo from './v.png'

function Header({dictionaries}) {
    const navigate = useNavigate();
    const { user, setUser} = useContext(AuthContext)

    const handleLogout = () =>{
        console.log("LOGOUT CLICKED")
        setUser(null)
    }
    const handleDictionaryNavButton = () => {

    }
  return (
    <div className='header-wrapper'>
        <div className='header'>
            <div className='left-section'>
                <div className="logo" title="Vobolio" onClick={()=>{navigate("/dictionaries")}}>
                    <img className='logo-img' src={logo}></img>
                </div>
            </div>
            
            <div className='right-section'>
                <div className='top-navbar'>
                    <ul>
                    <li onClick={()=>{navigate("/")}}>Home</li>
                        
                        
                        {user?
                        <>
                        <li title='Dictionaries' onClick={()=>{navigate("/dictionaries")}}>Dictionaries</li>
                        <li title="Training" onClick={()=>{navigate("/training")}}>Training</li>
                        <li title="My Profile" onClick={()=>{navigate("/profile")}}>My Profile</li>
                        <li title="Logout" onClick={handleLogout}>Logout</li>
                        </>
                        :
                        <>
                        <li title="Login" onClick={()=>{navigate("/login")}}>Login</li>
                        <li title="Register" onClick={()=>{navigate("/register")}}>Register</li>
                        </>
                        }
                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Header