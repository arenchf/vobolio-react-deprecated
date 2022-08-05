import './NewWordModal.scss'
import axiosInstance from '../../axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import {faUsersRectangle, faUpload, faPlus,faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function NewWordModal({dictionaryId,toggler}) {
    const [newWord,setNewWord] = useState({word:"",translation:"",category:""});

    const navigate = useNavigate();

    useEffect(()=>{
        
    },[newWord]);
    // const handleInput = (e) => {
    //     setUserInput({...userInput,[e.target.name]:e.target.value})
    // }
    const handleNewWordModalInput = (e) => {
        console.log(e.target.name)
        setNewWord({...newWord,[e.target.name]:e.target.value})
    };

    const handleSubmitNewWord = (e) => {
        e.preventDefault()
        console.log(newWord)

        axiosInstance.post("/dictionaries/"+dictionaryId+"/words/",newWord)
        .then(response=>{
            console.log(response)
            setNewWord({word:"",translation:"",category:""})
            // navigate(0)
        })
        .catch(error=>{
            console.error(error)
        })
    };

    function closeNewWordModal() {
        toggler.setNewWordModalToggle(false);
    };
  return (
    <Modal
            isOpen={toggler.newWordModalToggle}
            onRequestClose={closeNewWordModal}
            contentLabel="Create New Word Modal"
            className="new-word-modal"
        >
                <FontAwesomeIcon icon={faXmark} onClick={closeNewWordModal} className="modal-close"/>
                <h2 className='modal-title'>Create New Word</h2>
                <form>
                    <label htmlFor='new-word-input'>Word</label>
                    <input onInput={handleNewWordModalInput} placeholder='Word' id='new-word-input' 
                        type="text" value={newWord.word} name='word'></input>
                    
                    <label htmlFor='new-translation-input'>Translation</label>
                    <input onInput={handleNewWordModalInput} placeholder='Translation' id='new-translation-input' 
                        type="text" value={newWord.translation} name='translation'></input>
                    
                    <label htmlFor='edit-pronunciation-input'>Pronunciation</label>
                    <input onInput={handleNewWordModalInput} placeholder='Pronunciation' id='edit-pronunciation-input' 
                        type="text" value={newWord.pronunciation} name='pronunciation'></input>
                    
                    <label htmlFor='edit-category-input'>Category</label>
                    <input onInput={handleNewWordModalInput} placeholder='Category' id='edit-category-input' 
                        type="text" value={newWord.category} name='category'></input>
                    
                    <label htmlFor='edit-first-extra-field-input'>Extra Field</label>
                    <input onInput={handleNewWordModalInput} placeholder='Extra Field' id='edit-first-extra-field-input' 
                        type="text" value={newWord.first_extra_field} name='first_extra_field'></input>
                    
                    <label htmlFor='edit-second-extra-field-input'>Extra Field</label>
                    <input onInput={handleNewWordModalInput} placeholder='Extra Field' id='edit-second-extra-field-input' 
                        type="text" value={newWord.second_extra_field} name='second_extra_field'></input>
                    
                    <button onClick={handleSubmitNewWord}>Create</button>
                </form>
            </Modal>
  )
}

export default NewWordModal