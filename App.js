import React from "react"
import StartQuizz from "./components/StartQuizz.js"
import Questions from "./components/Questions.js"
import {nanoid} from "nanoid"


export default function App() {
   
    const [loading, setLoading] = React.useState(false);

    // loads second page
    const [pressStartQuizz, setPressStartQuiz] = React.useState(false)
     // info do api
    const [quizzData, setQuizzData] = React.useState([])
    
    // allows the button check answers to be pressed
    const [allComplete, setAllComplete] = React.useState(false);
    
    // shows the answers on the buttons changing their colors to green and pink
    const [checkedAnswPress, setCheckedAnswPress] = React.useState(false)
    
    // count the amount of correct answers
    const [count, setCount] = React.useState(0)

    const [playAgain, setPlayAgain] = React.useState(false)
    
    // save in the quizzData in a accessible way the info from the api -
    React.useEffect(function() {
        setLoading(true);

        fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=boolean&encode=url3986")
            .then(res => res.json())
            .then(data => setQuizzData(data.results.map((questionObj, item) => {
                return({
                        id: nanoid(),
                        question: questionObj.question,
                        selected_Answer: undefined,
                        correct_Answer: questionObj.correct_answer
                    })
                }))
            )
            .then(() => setLoading(false))

    }, [playAgain]) 

    // reloads the app
    function handlePlayAgain() {
        setPlayAgain(true)
        setPressStartQuiz(false)
        setCheckedAnswPress(false)
        setAllComplete(false)
        setQuizzData([])
        setCount(0)
    }
       
    // changes the state allComplete to true if all the questions have one selected_Answer so it can allow the Check Answers button to go from disabled to enabled  
    React.useEffect(() => { 
        setAllComplete(quizzData.every(item => typeof item.selected_Answer !== "undefined" ))
    }, [quizzData])
    
    
    function handleStartQuizz() {
        setPlayAgain(false)
        setPressStartQuiz(true)
    }
    
    // will update the arr state questions to save it to the state. needs to use an id
    function selectAnswer(id) {
        const {value} = event.target 
        setQuizzData(prevQuizzData => prevQuizzData.map(questionObj => {
            return questionObj.id === id ?
            {...questionObj, selected_Answer: value} :
            questionObj
        }))       
    }
    
    function handleCheckAnswers() {
        setCheckedAnswPress(true)
        countingCorrectAnswers()
    }
    
    
    function countingCorrectAnswers() {
        let counter = 0
        for(let i = 0; i < quizzData.length; i++) {
            const questionObj = quizzData[i]
            if(questionObj.correct_Answer === questionObj.selected_Answer) {
                counter = counter + 1
            } 
        } 
        setCount(counter)
    }  
      
    return(
      <div className="container-App">
        
        {loading && <div className="loading-message"></div>}
        {!pressStartQuizz && <StartQuizz handleStartQuizz={handleStartQuizz}  />}
        {pressStartQuizz && 
            <Questions 
                questions={quizzData} 
                checkedAnswPress={checkedAnswPress} 
                selectAnswer={selectAnswer}  
                handleCheckAnswers={handleCheckAnswers} 
                allComplete={allComplete}
                count={count}
                handlePlayAgain={handlePlayAgain}
            />
        }
      </div>
    )
}

// to load the data on screen
// <pre>{JSON.stringify(quizzData, null, 2)}</pre>
