import React , { useState } from 'react'
import './AskQuestion.css' 
import { useDispatch , useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { askQuestion } from '../../actions/question.js'

const AskQuestion = () => {
  
  const [ questionTitle , setQuestionTitle ] = useState('')
  const [ questionBody , setQuestionBody ] = useState('')
  const [ questionTags , setQuestionTags ] = useState('') 

  const navigate = useNavigate()
  const User = useSelector((state) => state.currentUserReducer)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
        e.preventDefault()  
        dispatch( askQuestion( { questionTitle , questionBody , questionTags , userPosted: User.result.name , userId: User.result._id }, navigate))  ;                                                   
  }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
        setQuestionBody(questionBody + '\n')
        }
    }   

  return (
    <div className='ask-question'>
        <div className='ask-ques-container'>
        <h1>Ask a public question</h1>
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor="ask-ques-title">
                        <h4>Title</h4>
                        <p>Be specific and imagine you're asking a question to another person</p>
                        <input style={{borderRadius: '4px'}} type="text" onChange={(e) => setQuestionTitle(e.target.value)} name='questionTitle' id='ask-ques-title' placeholder='e.g. Is there an R function for finding the index of an element in a vector?'/>
                    </label>
                    <label htmlFor="ask-ques-body">
                        <h4>Body</h4>
                        <p>Include all the information someone would need to answer your question</p>
                        <textarea style={{borderRadius: '4px'}} onChange={(e) => setQuestionBody(e.target.value)} name="quiestionBody" id="ask-ques-body" cols='30' rows='10' onKeyDown={handleEnter}></textarea>
                    </label>
                    <label htmlFor="ask-ques-tags">
                        <h4>Tags</h4>
                        <p>Add up to 5 tags to describe what your question is about</p>
                        <input style={{borderRadius: '4px'}} onChange={(e) => setQuestionTags(e.target.value.split(" "))} type="text" name='questionTags' id='ask-ques-tags' placeholder='e.g.(xml typescript wordpress)'/>
                    </label>
                </div>
                  <input type="Submit" value='Review your question' className='review-btn'/>   
            </form>
        </div>
    </div>
  )
}

export default AskQuestion
