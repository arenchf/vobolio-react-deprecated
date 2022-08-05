import React, { useEffect, useState, useContext, useRef } from 'react'
import axiosInstance from '../../axios'
import './Home.scss'
import Header from '../../components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsersRectangle, faUpload, faPlus,faXmark, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

import {LanguageList, Flags} from '../../img/Flags';
import NewDictionaryModal from '../../components/NewDictionaryModal/NewDictionaryModal';

import {useNavigate} from 'react-router-dom';
import Footer from '../../components/Footer/Footer';




function Home() {
    

    const [loading,setLoading] = useState(true);
    const [dictionaries,setDictionaries] = useState(null);
    const [newDictionaryModalToggle,setNewDictionaryModalToggle] = useState(false);
    const navigate = useNavigate()


    useEffect(()=>{
        axiosInstance.get("/dictionaries/").then((response)=>{
            // console.log("data",response.data)
            setDictionaries(response.data)
        })
        // console.log('dictionaries', dictionaries)
    },[])

    function openNewDictionaryModal() {
        setNewDictionaryModalToggle(true);
    }


    const handleDeleteDictionary = (e) => {
        e.stopPropagation()
        console.log("/dictionaries/"+e.currentTarget.getAttribute("dictionary_id")+"/")
        axiosInstance.delete("/dictionaries/"+e.currentTarget.getAttribute("dictionary_id")+"/")
            .then(response =>{
                console.log(response)
                navigate(0)
            })
            .catch((error) => {
                console.error(error)
            });
    }
    



    return (
        <div className='home-page'>
            <Header dictionaries={{dictionaries,setDictionaries}}></Header>
            
            {!loading?
            <div className='content loading-ghost'>
                <div className='ghost-title'></div>
            </div>
            :
            <>
            <div className='content'>

            <div className="welcome-content-wrapper">
                <div className='add-new-dictionaries-card' title="Create New Dictionary" onClick={openNewDictionaryModal}>
                    <div className='card-wrapper'>
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>Create New Dictionary</span>
                    </div>
                </div>
            </div>
            {dictionaries && dictionaries.length > 0?
            <>
                <div className='dictionary-list'>
                    {dictionaries.map((el)=>{
                        return  <div className='dictionary-item' key={el.id} onClick={()=>{navigate("/dictionaries/"+el.id)}}>
                                    <div className='dictionary-left-side'>
                                        <div className='flag-icon'>
                                            <img src={Flags[el.language]}></img>
                                        </div> 
                                        <div className='dictionary-name'>{el.name}</div>
                                    </div> 
                                    <div className='dictionary-right-side'>
                                        {/* <div title="Edit Dictionary" className='update-dictionary-button'><FontAwesomeIcon icon={faPen}/></div> */}
                                        <div title="Delete dictionary" onClick={handleDeleteDictionary} dictionary_id={el.id} className='delete-dictionary-button'><FontAwesomeIcon icon={faTrashCan}/></div>
                                    </div> 
                                </div>
                    })}
                </div>
            </>
            :
            <>

            </>}
                
            
            </div>

            <NewDictionaryModal toggler={{newDictionaryModalToggle,setNewDictionaryModalToggle}}></NewDictionaryModal>
            </>

            
            }
            <Footer></Footer>
        </div>

    )
}

export default Home