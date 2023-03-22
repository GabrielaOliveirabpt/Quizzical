import React from "react"
import Question from "./Question.js"

export default function Questions(props) {

    
    const questionComponents = props.questions.map((q) => (
        <Question 
            key={q.id} 
            question={q.question} 
            id={q.id} 
            correct_Answer={q.correct_Answer} 
            selected_Answer={q.selected_Answer} 
            selectAnswer={(event) => props.selectAnswer(q.id)} 
            handleCheckAnswers={props.handleCheckAnswers} 
            checkedAnswPress={props.checkedAnswPress}
            allComplete={props.allComplete}
        />
    ))
    
    return(
      <div className="container-questions">
        {questionComponents}
        
        <div className="btn-check-container">
            {!props.checkedAnswPress ?
            <button 
                className="btn-check" 
                onClick={props.handleCheckAnswers}
                disabled={props.allComplete ? false : true}
                >Check Answers
            </button>   :
            <button 
                className="btn-check" 
                onClick={props.handlePlayAgain}
                >Play again
            </button> 
            }
            
        </div>
        {props.checkedAnswPress && <p className="text-center">You scored {props.count} correct answer(s)</p>}
        
        
      </div>  
    )
}
