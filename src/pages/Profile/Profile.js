import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './Profile.scss'



function Profile() {
  return (
    <div className='profile-page'>
        <Header></Header>
        <div className='content'>
            <h2>Profile page content</h2>

        </div>
        <Footer></Footer>
    </div>
  )
}

export default Profile