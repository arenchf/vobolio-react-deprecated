import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Landing.scss'


function Landing() {
  return (
    <div className='landing-page'>
        <Header></Header>
        <div className='content'>
            <h2>Landing page content</h2>

        </div>
        <Footer></Footer>
    </div>
  )
}

export default Landing