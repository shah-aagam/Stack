import React from "react";
import "./HomeMainbar.css";
import { useLocation, useNavigate , Link} from "react-router-dom";
import QuestionList from "./QuestionList.jsx";
import { useSelector } from "react-redux";

const HomeMainbar = () => {
  const location = useLocation();
  const user = useSelector(state => state.currentUserReducer);
  const navigate = useNavigate();

  var questionsList = useSelector(state => state.questionsReducer)
  
  const redirect = () =>{
      if( user === null ){
        alert("LogIn or SignUp to ask a question");
        navigate("/Auth");
      }else{
        navigate('/AskQuestion')
      }
  }

  return (
    <div className="main-bar">
      <div className="main-bar-header">
        {location.pathname === "/" ? (<h1>Top Questions</h1>) : (<h1>All Questions</h1>)}
        <button onClick={redirect} className="ask-btn">Ask Question</button>
      </div>
      <div>
        {questionsList.data === null ? 
          <h1>Loading...</h1> :
          <>
            {
              questionsList.data.length === 1 ? <p>{questionsList.data.length} Question</p> : <p>{questionsList.data.length} Questions</p>
            }
            <QuestionList questionsList={questionsList.data} />
          </>
        }
      </div>
    </div>
  );
};

export default HomeMainbar;
