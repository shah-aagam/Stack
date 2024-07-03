import React, {useState} from 'react'
import { useParams , Link , useNavigate , useLocation} from 'react-router-dom';
import moment from 'moment'
import downVote from '../../assets/sort-down.svg';
import upVote from '../../assets/sort-up.svg';
import Avatar from '../../components/Avatar/Avatar'
import './Question.css'
import DisplayAnswer from './DisplayAnswer';
import { useSelector, useDispatch } from "react-redux";
import  { postAnswer , deleteQuestion , voteQuestion }  from '../../actions/question.js';
import copy from 'copy-to-clipboard'

const QuestionsDetails = () => {

    const { id } = useParams()
    var questionsList = useSelector(state => state.questionsReducer)

    const [Answer, setAnswer] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
    const location = useLocation()
    const url = 'http://localhost:3000'

    const handlePostAns = (e , answerLength) => {
      e.preventDefault()
      if(User === null){
        alert('Login or Signup to answer a question')
        navigate('/Auth')
      }else{
        if( Answer === '' ){
          alert("Enter an answer before submitting")
        }else{
           dispatch(postAnswer({ id , noOfAnswers: answerLength + 1 , answerBody: Answer , userAnswered: User.result.name , userId: User.result._id}))
           setAnswer('')
        }
      }
    } 

    const handleShare = () => {
        copy( url + location.pathname )
        alert( " Copied url : "+ url+location.pathname )
    }

    const handleDelete = () => {
      dispatch(deleteQuestion(id , navigate))
    }

    const handleUpVote = () => {
      if(User === null ){
        alert("Login or Signup to vote")
        navigate("/Auth")
      }else{
        dispatch(voteQuestion(id , 'upVote' , User.result._id))
      }
    }

    const handleDownVote = () => {
      if(User === null ){
        alert("Login or Signup to vote")
        navigate("/Auth")
      }else{
      dispatch(voteQuestion(id , 'downVote' , User.result._id))
      }
    }

  return (
    <div className='question-details-page'>
      <h1>Question Details</h1>
      {
        questionsList.data === null ? 
        <h1>Loading...</h1> : 
        <>
           {
            questionsList.data.filter( question => question._id === id ).map( question => (
                <div key={question.id}>
                    <section className="question-details-container">
                        <h1>{question.questionTitle}</h1>
                        <div className="question-details-container-2">
                            <div className="question-votes"> 
                                <img src={upVote} alt='upVote' width={18} onClick={handleUpVote}/>
                                <p>{question.upVote.length - question.downVote.length}</p>
                                <img src={downVote} alt='downVote' width={18} onClick={handleDownVote}/>
                            </div>
                            <div style={{width:"100%"}}>
                                <p className="question-body">{question.questionBody}</p>
                                <div className="question-details-tags">
                                  {
                                    question.questionTags.map((tag) => (
                                      <p key={tag}>{tag}</p>
                                    ) )
                                  }
                                </div>
                                <div className="question-actions-user">
                                  <div>
                                    <button type='button' onClick={handleShare}>Share</button>
                                    {
                                      User?.result?._id === question?.userId && (
                                        <button type='button' onClick={handleDelete}>Delete</button>
                                      )
                                    }
                                  </div>
                                  <div>
                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color: '#0086d8'}}>
                                    <Avatar backgroundColor="orange" px='8px' py='5px' >{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                    <div>{question.userPosted}</div>
                                    </Link> 
                                  </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {
                      question.noOfAnswers !== 0 && (
                        <section>
                          {
                            question.noOfAnswers === 1 ? <h3>{question.noOfAnswers} Answer</h3> : <h3>{question.noOfAnswers} Answers</h3>
                          }
                          <DisplayAnswer key={question._id} question={question} handleShare={handleShare}/>
                        </section>
                      )
                    }
                    <section className='post-ans-container'>
                        <h3>Your answer</h3>
                        <form onSubmit={(e) => {handlePostAns(e , question.answer.length)}}>
                            <textarea name="" id="" cols="30" rows='10' value={Answer}  onChange={e => setAnswer(e.target.value)}></textarea><br />
                            <input type="Submit" className='post-ans-btn' value='Post Your Answer' />
                        </form>
                        <p>
                          Browse other Question tagged
                          {
                            question.questionTags.map((tag) => (
                                <Link to='/Tags' key={tag} className='ans-tags'>{tag}</Link>
                            ))
                          } or
                          <Link to='/AskQuestion' style={{textDecoration:'none' , color: '#009dff'}}> ask your own question.</Link>
                        </p>
                    </section>
                </div>
            ))
           }
        </>
      }
    </div>
  )
}

export default QuestionsDetails
