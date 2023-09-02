import React, { useState, useEffect } from "react";
import "../../css/Question.css";

const Question = ({
    question,
    selectedAnswer,
    onAnswerSelection,
    onNextQuestion,
    isReviewMode,
}) => {
    const [showQuestion, setShowQuestion] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

    useEffect(() => {
        setShowQuestion(true);
    }, []);

    useEffect(() => {
        setIsCorrectAnswer(selectedAnswer === question?.correct_answer);
    }, [selectedAnswer, question?.correct_answer]);

    const handleNextQuestion = () => {
        setShowQuestion(false);
        setTimeout(() => {
            onNextQuestion();
            setShowQuestion(true);
        }, 300); // Transition time
    };

    return (
        <div className={`question ${showQuestion ? "visible" : ""}`}>
            <h3>{question?.question}</h3>
            {question?.choices?.map((choice, index) => (
                <div
                    key={index}
                    className={`choice ${selectedAnswer === choice ? "selected" : ""}`}
                    onClick={() => onAnswerSelection(choice)}
                >
                    {choice}
                </div>
            ))}
            {selectedAnswer && !isReviewMode && (
                <div className={`feedback ${isCorrectAnswer ? "correct" : "incorrect"}`}>
                    {isCorrectAnswer ? "Correct!" : "Incorrect"}
                </div>
            )}
            {isReviewMode && (
                <button className="review-button" onClick={handleNextQuestion}>
                    Next
                </button>
            )}
        </div>
    );
};

export default Question;
