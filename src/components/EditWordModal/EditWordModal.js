import './EditWordModal.scss'
import axiosInstance from '../../axios';
import React, { useEffect, useState, useContext, useRef } from 'react'
import {faUsersRectangle, faUpload, faPlus,faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function EditWordModal({word,toggler,dictionaryId}) {
    

    const navigate = useNavigate();
    const [editedWord,setEditedWord] = useState({"word":"","translation":"","category":""})

    useEffect(()=>{
        // console.log('word', word)
        setEditedWord(word)
    },[word])


    const handleEditWordModalInput = (e) => {
        console.log(e.target.name)
        setEditedWord({...editedWord,[e.target.name]:e.target.value})
    };

    const handleSubmitEditWord = (e) => {
        e.preventDefault()

        axiosInstance.put("/dictionaries/"+dictionaryId+"/words/"+editedWord.id+"/",editedWord)
        .then(response=>{
            console.log(response)
            // setNewWord({word:"",translation:"",category:""})
            // toggler.
            // closeEditWordModal()
            navigate(0)
        })
        .catch(error=>{
            console.error(error)
        })
    };

    function closeEditWordModal() {
        toggler.setEditWordModalToggle(false);
    };
  return (
    <Modal
            isOpen={toggler.editWordModalToggle}
            onRequestClose={closeEditWordModal}
            contentLabel="Edit Word Modal"
            className="edit-word-modal"
        >
                <FontAwesomeIcon icon={faXmark} onClick={closeEditWordModal} className="modal-close"/>
                <h2 className='modal-title'>Edit Word</h2>
                <form>
                    <label htmlFor='edit-word-input'>Word</label>
                    <input onInput={handleEditWordModalInput} placeholder='Word' id='edit-word-input' 
                        type="text" value={editedWord.word?editedWord.word:""} name='word'></input>
                    <label htmlFor='edit-translation-input'>Translation</label>
                    <input onInput={handleEditWordModalInput} placeholder='Translation' id='edit-translation-input' 
                        type="text" value={editedWord.translation?editedWord.translation:""} name='translation'></input>
                        <label htmlFor='edit-pronunciation-input'>Pronunciation</label>
                    <input onInput={handleEditWordModalInput} placeholder='Pronunciation' id='edit-pronunciation-input' 
                        type="text" value={editedWord.pronunciation?editedWord.pronunciation:""} name='pronunciation'></input>
                    <label htmlFor='edit-category-input'>Category</label>
                    <input onInput={handleEditWordModalInput} placeholder='Category' id='edit-category-input' 
                    type="text" value={editedWord.category?editedWord.category:""} name='category'></input>
                    <label htmlFor='edit-first-extra-field-input'>Extra Field</label>
                    <input onInput={handleEditWordModalInput} placeholder='Extra Field' id='edit-first-extra-field-input' 
                        type="text" value={editedWord.first_extra_field?editedWord.first_extra_field:""} name='first_extra_field'></input>
                        <label htmlFor='edit-second-extra-field-input'>Extra Field</label>
                    <input onInput={handleEditWordModalInput} placeholder='Extra Field' id='edit-second-extra-field-input' 
                        type="text" value={editedWord.second_extra_field?editedWord.second_extra_field:""} name='second_extra_field'></input>
                    
                    
                    <button onClick={handleSubmitEditWord}>Save</button>
                </form>
            </Modal>
  )
}

export default EditWordModal