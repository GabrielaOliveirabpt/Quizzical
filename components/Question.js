import React from "react";

export default function Question(props) {
    


    function style(bool) {
        // change the correct answer to green
        if(props.checkedAnswPress && props.correct_Answer === bool) { 
            return {
                backgroundColor: "#94D7A2",
                border: "none"
            }
        }
        // change the wrong answer selected to pink
        if(props.checkedAnswPress && props.correct_Answer !== props.selected_Answer) { 
            return {
                backgroundColor: "#F8BCBC",
                border: "none"
            }
        }
        // change the selected answer to light purple
        if(props.selected_Answer === bool) {
            return {
                backgroundColor: "#D6DBF5",
                border: "none"
            }
        }
    }
    
    return (
        <div className="container-question">
            <h4 className="question">{decodeURIComponent(props.question)}</h4>
            <div className="container-btn-answers">
                <button 
                    disabled={props.checkedAnswPress}
                    style={style("True")}
                    className="btn-answer"
                    value="True"
                    onClick={props.selectAnswer}
                    >True
                </button>
                <button 
                    disabled={props.checkedAnswPress}
                    style={style("False")}
                    className="btn-answer"
                    value="False"
                    onClick={props.selectAnswer}                    
                    >False
                </button>
            </div>
        </div>
    )
}
