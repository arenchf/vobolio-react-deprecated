import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Landing.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare,faBook,faInfo} from '@fortawesome/free-solid-svg-icons';

function Landing() {
  return (
    <div className='landing-page'>
        <Header></Header>
        <div className='content'>
            <div className='title'>Welcome to Vobolio, where you can store your own dictionaries!</div>
            <div className='icon-cards-row'>
              <div className='icon-card'><div className='icon-wrapper'><FontAwesomeIcon icon={faBook}></FontAwesomeIcon></div>
              <div className='icon-card-label'>Create</div>
              </div>
              <div className='icon-card'><div className='icon-wrapper'><FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon></div>
              <div className='icon-card-label'>Train</div>
              </div>
              <div className='icon-card'>
                <div className='icon-wrapper'><FontAwesomeIcon icon={faInfo}></FontAwesomeIcon></div>
                <div className='icon-card-label'>Inform</div>
                </div>
            </div>
            <div className='user-row'>
              <div className='sign-up-button'><button>Sign Up For Free</button></div>
              <div className='login-button'><button>Login</button></div>
            </div>



        </div>
        <Footer></Footer>
    </div>
  )
}

export default Landing