import React, { useEffect,useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './Footer.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faPlus } from '@fortawesome/free-solid-svg-icons';



function Footer({dictionaries}) {
    const navigate = useNavigate();
    const { user, setUser} = useContext(AuthContext)

    const handleLogout = () =>{
        console.log("LOGOUT CLICKED")
        setUser(null)
    }
    const handleDictionaryDropdown = () => {

    }
  return (
    <div className='footer-wrapper'>
        <div className='footer'>
          &copy; 2022 All rights reserved.
        </div>
    </div>
    
  )
}

export default Footer