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
    
    // holds the info of the questions
    const [questions, setQuestions] = React.useState([])
    
    // allows the button check answers to be pressed
    const [allComplete, setAllComplete] = React.useState(false);
    
    // shows the answers on the buttons changing their colors to green and pink
    const [checkedAnswPress, setCheckedAnswPress] = React.useState(false)
    
    // count the amount of correct answers
    const [count, setCount] = React.useState(0)

    const [playAgain, setPlayAgain] = React.useState(false)
    
    
    // save in the quizzData in a accessible way the info from the api -
    React.useEffect(function() {
        // let isMounted = true;   
        setLoading(true);


        fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=boolean")
            .then(res => res.json())
            .then(data => setQuizzData(data.results))
            // return () => { isMounted = false }; 
            .then(() => setLoading(false))


    }, [playAgain])
    

    // it needs to have a function to reload app !!!!
    function handlePlayAgain() {
        setPlayAgain(true)
        setPressStartQuiz(false)
        setCheckedAnswPress(false)
        setAllComplete(false)
        setQuizzData([])
        setQuestions([])
        setCount(0)
        
    }
       
    // changes the state allComplete to true if all the questions have one selected_Answer so it can allow the Check Answers button to go from disabled to enabled  
    React.useEffect(() => { 
        setAllComplete(questions.every(item => typeof item.selected_Answer !== "undefined" ))
    }, [questions])
    
    
    function handleStartQuizz() {
        setPlayAgain(false)

        setPressStartQuiz(true)
        setQuestions(getQuestions())
    }

    // get the questions and save it in a object, then in an arr of objs so later it can save it to the state arr questions
    function getQuestions() {
        const arrObjQuestions = []
        for(let i = 0; i < 2; i++) {
            const question = translateQuestionSymbols(i)
            const correct_answer = quizzData[i].correct_answer
            const objQuestion = {
                question: question,
                selected_Answer: undefined,
                correct_Answer: correct_answer,
                id: nanoid() 
            }
            arrObjQuestions.push(objQuestion)
        }
        return arrObjQuestions  
    }
   
    function translateQuestionSymbols(i) {
        let string = quizzData[i].question
        if(string.includes('&#039;')) {
            string = string.replaceAll('&#039;', "'")
        }  
        if (string.includes("&quot;")) {
            string = string.replaceAll("&quot;", '"')
        } 
        if (string.includes("&eacute;")) {
            string = string.replaceAll("&eacute;", "é")
        } 
        if (string.includes("&ldquo;")) {
            string = string.replaceAll("&ldquo;", '"')
        }
        if (string.includes("&rdquo;")) {
            string = string.replaceAll("&rdquo;", '"')
        }
        if (string.includes("&rsquo;")) {
            string = string.replaceAll("&rsquo;", "'")
        }
        if (string.includes("&lsquo;")) {
            string = string.replaceAll("&lsquo;", "'")
        }
        return string
    } 
    
    // will update the arr state questions to save it to the state. needs to use an id
    function selectAnswer(id) {
        const {value} = event.target 
        setQuestions(prevQuestions => prevQuestions.map(questionObj => {
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
        for(let i = 0; i < 2; i++) {
            const questionObj = questions[i]
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
                questions={questions} 
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

// <pre>{JSON.stringify(quizzData, null, 2)}</pre>

    // React.useEffect(() => { 
    //     setCount(countingCorrectAnswers())
    // }, [checkedAnswPress])
    
    // code from stackoverflow to solve error
    //  React.useEffect(() => { 
    //     let isMounted = true;  
    //     countingCorrectAnswers().then(data => {
    //         if(isMounted) {setCount(data)}
    //     })                     
    //     return () => { isMounted = false };
    // }, [checkedAnswPress])
    
    // useEffect(() => {
    //     let isMounted = true;               // note mutable flag
    //     someAsyncOperation().then(data => {
    //         if (isMounted) setState(data);    // add conditional check
    //     })
    //     return () => { isMounted = false }; // cleanup toggles value, if unmounted
    // }, []); 
    
        
    // option of using only one state for questions/quizzData
    // React.useEffect(() => { 
    //     setAllComplete(questions.every(item => typeof item.selected_Answer !== undefined ))
    // }, [questions])
    
    // .then(data => setQuizData(data.results.map(item => {
    //             return({
    //                     id: nanoid(),
    //                     question: item.question,
    //                     options: shuffle(item.incorrect_answers.concat([item.correct_answer])).map(item => {return { id: nanoid(), optionText: item }}),
    //                     selectedAnswer: undefined,
    //                     correctAnswer: item.correct_answer
    //                 })
    // })))