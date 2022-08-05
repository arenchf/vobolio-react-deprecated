import React from 'react'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import './NotFound404.scss'


function NotFound404() {
  return (
    <div className='not-found-page'>
        <Header></Header>
        <div className='content'>
            <h2>The page you requested was not found!</h2>

        </div>
        <Footer></Footer>
    </div>
  )
}

export default NotFound404