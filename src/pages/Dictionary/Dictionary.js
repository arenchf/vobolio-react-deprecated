import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React,{useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axiosInstance from '../../axios'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './Dictionary.scss'
import {faPlus,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import NewWordModal from '../../components/NewWordModal/NewWordModal'
import EditWordModal from '../../components/EditWordModal/EditWordModal'
import InfiniteScroll from 'react-infinite-scroller';


function Dictionary() {
    const {dictionaryId} = useParams()
    const [words,setWords] = useState(null)
    const [newWordModalToggle,setNewWordModalToggle] = useState(false);
    const [editWordModalToggle,setEditWordModalToggle] = useState(false);
    const [selectedWord,setSelectedWord] = useState({});
    const [nextPage,setNextPage] = useState(null)
    const navigate = useNavigate()

    useEffect(()=>{
        axiosInstance.get("/dictionaries/"+dictionaryId+"/words/")
            .then(response=>{
               console.log(response.data) 
               setWords(response.data.results)
               setNextPage(response.data.next)
            })
            .catch(error=>{
                console.error(error)
            });

    },[])

    useEffect(()=>{
        console.log('selectedWord', selectedWord)
    },[selectedWord])

    // useEffect(()=>{
    //     console.log('words', words)
    // },[words])

    function openNewWordModal() {
        setNewWordModalToggle(true);
    }
    const openEditWordModal = (e)=>{
        setSelectedWord(words[e.currentTarget.getAttribute("word_index")])
        setEditWordModalToggle(true);
        
    }

    const handleDeleteWord = (e) => {
        e.stopPropagation()
        console.log("/dictionaries/"+e.currentTarget.getAttribute("dictionary_id")+"/")
        axiosInstance.delete("/dictionaries/"+dictionaryId+"/words/"+e.currentTarget.getAttribute("word_id")+"/")
            .then(response =>{
                console.log(response)
                navigate(0)
            })
            .catch((error) => {
                console.error(error)
            });
    }

    const loadFunc = () =>{
        console.log("LOAD MORE",words)
        if(nextPage){
            
        axiosInstance.get(nextPage)
            .then(response=>{
               console.log(response.data)
            //    words.results.append (response.data.results)
            //    setWords(response.data)
            response.data.results.forEach(element => {
                words.push(element)
            });
            // words.push(response.data.results)
            setWords(words)
            setNextPage(response.data.next)
            })
            .catch(error=>{
                console.error(error)
            });
        }
    }

  return (
    <div className='dictionary-page'>
        <Header></Header>
        <div className='content content-dictionary'>
            <div className='add-new-word-card' onClick={openNewWordModal}>
                <div className='new-word-appender-icon'>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                    <span>Add New Word</span>
                </div>
            </div>
            
            {words && words.length > 0?
            <>
            <InfiniteScroll
            pageStart={0}
            loadMore={loadFunc}
            hasMore={nextPage}
            loader={<div className="loader" key={0}>Loading ...</div>}>
                <div className='word-list'>
                    {words.map((el,index)=>{
                        return  <div className='word-item' key={el.id} onClick={openEditWordModal} word_index={index}>
                                    <div className='word-left-side'>
                                        <div className='word-word'>{el.word}</div>
                                        
                                        <div className='word-translation'>{el.translation}</div>
                                    </div> 
                                    <div className='word-right-side'>
                                        <div className='word-points'><span>{el.points}%</span></div>
                                        {/* <div title="Edit Word" onClick={openEditWordModal} word_index={index} className='update-word-button'><FontAwesomeIcon icon={faPen}/></div> */}
                                        <div title="Delete Word" onClick={handleDeleteWord} word_id={el.id} className='delete-word-button'><FontAwesomeIcon icon={faTrashCan}/></div>
                                    </div> 
                                </div>
                    })}
                </div>
            </InfiniteScroll>
            </>
            :
            <>

            </>}
        
            
            
        </div>
        <NewWordModal toggler={{newWordModalToggle,setNewWordModalToggle}} dictionaryId={dictionaryId}></NewWordModal>
        <EditWordModal toggler={{editWordModalToggle,setEditWordModalToggle}} word={selectedWord} dictionaryId={dictionaryId}></EditWordModal>
        <Footer></Footer>
    </div>

  )
}

export default Dictionary