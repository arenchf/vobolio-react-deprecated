import React, { useEffect, useState, useContext, useRef } from 'react'
import {faUsersRectangle, faUpload, faPlus,faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {languageList_} from '../../img/Flags';
import {LanguageList} from '../../img/Flags';
import axiosInstance from '../../axios';

import './NewDictionaryModal.scss';
import AuthContext from '../../context/AuthContext';
Modal.setAppElement('#root');

function NewDictionaryModal({toggler}) {

    
    // const [languageList,setLanguageList] = useState(LanguageList)
    const auth = useContext(AuthContext)
    const [selectedLanguage,setSelectedLanguage] = useState({})
    const [newDictionary,setNewDictionary] = useState({});
    const navigate = useNavigate()
    const handleNewDictionaryModalInput = (e) => {
        // console.log(e.currentTarget.getAttribute("value"))
        // console.log('e.currentTarget.getAttribute("name")', e.currentTarget.getAttribute("name"))
        
        if(e.currentTarget.getAttribute("name") === "new-flag"){
            setSelectedLanguage(LanguageList[e.currentTarget.getAttribute("value")])
            setNewDictionary({...newDictionary,"language":LanguageList[e.currentTarget.getAttribute("value")].short})
        }
        else{
            setNewDictionary({...newDictionary,[e.currentTarget.name]:e.currentTarget.value})
            console.log(e.currentTarget.value,e.currentTarget.name)
        }
        // console.log('selectedLanguage', selectedLanguage)
    }
    const submitNewDictionary = (e) => {
        e.preventDefault()

        console.log("ADDING LANGUAGE",newDictionary)
        
        axiosInstance.post(`/users/${auth.user.user_id}`+"/dictionaries/",newDictionary)
        .then(_=>{
            navigate(0)
        }).catch(error=>{
            console.log("ERROR",error);
            
          })
    }

    function closeNewDictionaryModal() {
        toggler.setNewDictionaryModalToggle(false);
    }

    

  return (
    <Modal
                isOpen={toggler.newDictionaryModalToggle}
                // onAfterOpen={afterOpenModal}
                onRequestClose={closeNewDictionaryModal}
                // style={customStyles}
                contentLabel="Create New Dictionary Modal"
                className="new-dictionary-modal"
            >
                <FontAwesomeIcon icon={faXmark} onClick={closeNewDictionaryModal} className="modal-close"/>
                <h2 className='modal-title'>Create New Dictionary</h2>
                <form>
                    <label htmlFor='dictionary-name'>Dictionary Name</label>
                    <input onInput={handleNewDictionaryModalInput} placeholder='Dictionary Name' id='dictionary-name' type="text" name='name'></input>
                    <label htmlFor='new-language'>Language</label>
                    <div className='language-list'>
                        {LanguageList.map((languageEl,index)=>{
                            return <div key={index} onClick={handleNewDictionaryModalInput} name="new-flag" className={`language-flag ${selectedLanguage.id === languageEl.id? "selected":""}`}    title={languageEl.language} value={index}><img src={languageEl.flag}></img></div>
                        })}
                    </div>
                    <button onClick={submitNewDictionary}>Create</button>
                </form>
            </Modal>
  )
}

export default NewDictionaryModal