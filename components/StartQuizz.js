import React from "react"

export default function StartQuizz(props) {
    return(
      <div className="container-startQuizz">
        <h1 className="appTitle">Quizzical</h1>
        <p className="quizz-description">Test Your Trivia Expertise With This Quiz!</p>
        <button 
            className="btn"
            onClick={props.handleStartQuizz}
            >Start quizz
        </button>
      </div>  
    )
}