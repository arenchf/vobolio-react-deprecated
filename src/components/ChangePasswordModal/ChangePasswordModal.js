import React, { useEffect, useState, useContext, useRef } from 'react'
import {faUsersRectangle, faUpload, faPlus,faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {languageList_} from '../../img/Flags';
import {LanguageList} from '../../img/Flags';
import axiosInstance from '../../axios';

import './ChangePasswordModal.scss';
import AuthContext from '../../context/AuthContext';
Modal.setAppElement('#root');

function ChangePasswordModal({toggler}) {

    
    // const [languageList,setLanguageList] = useState(LanguageList)
    const auth = useContext(AuthContext)
    const [newPassword,setNewPassword] = useState({})
    const [errors,setErrors] = useState({})


    const navigate = useNavigate()
    const handleChangePasswordModalInput = (e) => {
        setNewPassword({...newPassword,[e.target.name]:e.target.value})
        
    }
    const submitChangePassword = (e) => {
        e.preventDefault()
        axiosInstance.put(`/users/${auth.user.user_id}/password/`,newPassword).then((response)=>{
            
            navigate(0)
        }).catch((error)=>{
            setErrors(error.response.data)
            // console.log("asdasd",error)
            // console.error(error.data)
        })

        
    }

    function closeChangePasswordModal() {
        toggler.setChangePasswordModalToggle(false);
    }

    

  return (
    <Modal
                isOpen={toggler.changePasswordModalToggle}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeChangePasswordModal}
                // style={customStyles}
                contentLabel="Change Password"
                className="change-password-modal"
            >
                <FontAwesomeIcon icon={faXmark} onClick={closeChangePasswordModal} className="modal-close"/>
                <h2 className='modal-title'>Change Password</h2>
                <form>
                    {/* <input hidden type="text" name="username" value={auth.user.username}></input> */}
                    <label htmlFor='old-password-input'>Old Password</label>
                    {errors.old_password?
                    <span className='error'>{errors.old_password}</span>:<></>}
                    <input autoComplete='old-password' onInput={handleChangePasswordModalInput} placeholder='Old Password' id='old-password-input' type="password" name='old_password'></input>
                    
                    <label htmlFor='new-password-input'>New Password</label>
                    {errors.new_password?
                    <span className='error'>{errors.new_password}</span>:<></>}
                    <input autoComplete='new-password' onInput={handleChangePasswordModalInput} placeholder='New Password' id='new-password-input' type="password" name='new_password'></input>
                    
                    <label htmlFor='new-password-confirm-input'>New Password Confirm</label>
                    {errors.new_password_confirm?
                    <span className='error'>{errors.new_password_confirm}</span>:<></>}
                    <input autoComplete='new-password-confirm' onInput={handleChangePasswordModalInput} placeholder='New Password' id='new-password-confirm-input' type="password" name='new_password_confirm'></input>
                    
                    <button onClick={submitChangePassword}>Change</button>
                </form>
            </Modal>
  )
}

export default ChangePasswordModal