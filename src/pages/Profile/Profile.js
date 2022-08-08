import React, {useContext, useEffect, useState} from 'react'
import axiosInstance from '../../axios'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import AuthContext from '../../context/AuthContext'
import './Profile.scss'
import ChangePasswordModal from '../../components/ChangePasswordModal/ChangePasswordModal'
import {useNavigate} from 'react-router-dom'


function Profile() {

  const auth = useContext(AuthContext)
  const [profile,setProfile] = useState(null)
  const [userDictionaries,setUserDictionaries] = useState(null)
  const [changePasswordModalToggle,setChangePasswordModalToggle] = useState(false)
  const [newProfile,setNewProfile] = useState(null)
  const navigate = useNavigate()


  useEffect(()=>{
    console.log(auth.user)
    axiosInstance.get(`/users/${auth.user.user_id}/`).then((response)=>{
      console.log("profile",response.data)
      setProfile(response.data)
    }).catch((error)=>{
      console.error(error)
    })
    axiosInstance.get(`/users/${auth.user.user_id}/dictionaries/`).then((response)=>{
      console.log(response.data)
      // setUserDictionaries(response.data)
      var totalWords = 0
      var learnedWords = 0
      response.data.forEach(dictionary => {
        totalWords += dictionary.words.total
        learnedWords += dictionary.words.learned
      });
      setUserDictionaries({
        "learned":learnedWords,
        "total":totalWords
      })
      
    }).catch((error)=>{
      console.error(error)
    })
  },[])

  function openChangePasswordModal() {
    setChangePasswordModalToggle(true);
  }

  const handleProfileFormInput = (e) =>{
    console.log(e)

    setNewProfile({...newProfile,[e.target.name]:e.target.value})

  }

  const saveProfile = (e)=>{
    e.preventDefault()
    axiosInstance.put(`/users/${auth.user.user_id}/`,newProfile).then((response)=>{
      console.log(response)
      navigate(0)
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <div className='profile-page'>
        <Header></Header>
        <div className='content'>
            {profile?<>
            <h2>{profile.username}'s Profile</h2>
            <div className='profile-wrapper'>
              <div className='profile-attr-wrapper'>
                <label htmlFor="profile-username-input" className='profile-attr-label'>Username</label>
                <div className='profile-attr'><input onChange={handleProfileFormInput} type="text" id="profile-username-input" placeholder={profile.username}  name="username"></input></div>
              </div>
              <div className='profile-attr-wrapper'>
                <label htmlFor="profile-email-input" className='profile-attr-label'>Email</label>
                <div className='profile-attr'><input onChange={handleProfileFormInput} type="email" id="profile-email-input" placeholder={profile.email} name="email"></input></div>
              </div>
              <div className='profile-attr-wrapper'>
              
              </div>
              {newProfile?<button onClick={saveProfile}>Save</button>:<button disabled>Save</button>}
              
              <button onClick={openChangePasswordModal}>Change Password</button>
            </div>
            {userDictionaries?
            <div className='user-dictionaries'>
              <div className='total-words'>Total Words: <b>{userDictionaries.total}</b></div>
              <div className='learned-words'>Learned Words: <b>{userDictionaries.learned}</b></div>
            </div>:<></>}
            </>:<><h2>Loading</h2></>}

        </div>
        <ChangePasswordModal toggler={{changePasswordModalToggle,setChangePasswordModalToggle}}></ChangePasswordModal>
        <Footer></Footer>
    </div>
  )
}

export default Profile