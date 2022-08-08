import React,{useEffect,useContext,useState} from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import axiosInstance from '../../axios'
import AuthContext from '../../context/AuthContext'

import './Training.scss'

function Training() {
    const {dictionaryId} = useParams()
    // const {auth} = useContext(AuthContext)
    const [words,setWords] = useState(null)
    const [rightWord,setRightWord]= useState(null)
    const [wrongAnswer,setWrongAnswer] = useState(null)
    const [rightAnswer,setRightAnswer] = useState(null)
    const [complete,setComplete] = useState(false)
    useEffect(()=>{
        console.log(dictionaryId)

        axiosInstance.get(`/dictionaries/${dictionaryId}/training/`).then(response=>{
            console.log(response.data)
            setWords(shuffle(response.data.options_words))
            let min = 0;
            let max = 3;
            setRightWord(response.data.options_words[Math.floor(Math.random() * (max - min + 1)) + min])
            

        }).catch(error=>{
            console.error(error)
            setComplete(true)
        })

    },[])



    useEffect(()=>{
        if(rightAnswer){
            setTimeout(() => {
                axiosInstance.get(`/dictionaries/${dictionaryId}/training/`).then(response=>{
                    setWords(shuffle(response.data.options_words))
                    let min = 0;
                    let max = 3;
                    setRightWord(response.data.options_words[Math.floor(Math.random() * (max - min + 1)) + min])
                    
        
                }).catch(error=>{
                    console.error(error)
                    setComplete(true)
                })

                setRightAnswer(null)
                
              }, 2000)
        }
    },[rightAnswer])

    const handleAnswer = (e) =>{
        if(!rightAnswer){
            if(e.currentTarget.getAttribute("question_id") === rightWord.id.toString()){
                console.log("RIGHT")
    
                if(!wrongAnswer){
                    console.log("SUCCESSFULL TRAINED")
                    axiosInstance.put(`dictionaries/${dictionaryId}/words/${rightWord.id}/train/`).then((response)=>{
                        console.log(response)
                    }).catch((error)=>{
                        console.error(error)
                    })
                }
                setWrongAnswer(null)
                setRightAnswer(e.currentTarget.getAttribute("question_index"))
                
                
            }else{
                console.log("SETTING WRONG ANSWER")
                setWrongAnswer(e.currentTarget.getAttribute("question_index"))
            }
        }
    }



    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
      
  return (
    <div className='training-page'>
        <Header></Header>
        <div className='content'>
        {complete?
        <>
        <h2>No Words found. You have learned all the words in your dictionary!</h2>
        </>
        :words?<div className='training-word-wrapper'>
            <div className='word'>{rightWord?<>{rightWord.word}</>:<>Loading</>}</div>
            <div className='answers'>
                {words?<>
                {words.map((el,index)=>{
                    return <div className={wrongAnswer===index.toString()?"answer wrong-answer":rightAnswer===index.toString()?"answer right-answer":"answer"} onClick={handleAnswer} question_id={el.id} question_index={index} key={index}>{el.translation}</div>
                })}
                </>:<>Loading</>}
                
            </div>

        </div>:<h2>LOADING</h2>
        }
        </div>
        <Footer></Footer>
    </div>
  )
}

export default Training