import React, { useEffect, useState, useContext } from 'react'
import axiosInstance from '../../axios'
import './Home.scss'
import Header from '../../components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faTrashCan,faTableTennisPaddleBall } from '@fortawesome/free-solid-svg-icons';
import {Flags} from '../../img/Flags';
import NewDictionaryModal from '../../components/NewDictionaryModal/NewDictionaryModal';
import {useNavigate} from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import AuthContext from '../../context/AuthContext';




function Home() {
    
    const auth = useContext(AuthContext)
    const [loading,setLoading] = useState(true);
    const [dictionaries,setDictionaries] = useState(null);
    const [newDictionaryModalToggle,setNewDictionaryModalToggle] = useState(false);
    const navigate = useNavigate()


    useEffect(()=>{
        axiosInstance.get(`/users/${auth.user.user_id}`+"/dictionaries/").then((response)=>{
            setDictionaries(response.data)
        })
    },[])

    function openNewDictionaryModal() {
        setNewDictionaryModalToggle(true);
    }


    const handleDeleteDictionary = (e) => {
        e.stopPropagation()
        axiosInstance.delete(`/users/${auth.user.user_id}`+"/dictionaries/"+e.currentTarget.getAttribute("dictionary_id")+"/")
            .then(response =>{
                navigate(0)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    const navigateToTraining = (e) => {
        e.stopPropagation()
        navigate(`/training/${e.currentTarget.getAttribute("dictionary_id")}/`)
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
                                        <div title="Train Dictionary" onClick={navigateToTraining} dictionary_id={el.id} className='update-dictionary-button'><FontAwesomeIcon icon={faTableTennisPaddleBall}/></div>
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