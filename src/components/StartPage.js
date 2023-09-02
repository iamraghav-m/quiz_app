import React, { useState } from 'react';
import { connect, useSelector } from "react-redux";
import { setCurrentQuestion, setStartValue } from "../store/appAction";
import QuizPage from "./QuizPage";
import ReportPage from "./ReportPage";

const StartPage = ({ dispatch }) => {
    const [email, setEmail] = useState('');
    const [isError, setIsError] = useState(false);

    const questions = useSelector(state => state.appReducer.questions);
    const userAnswers = useSelector(state => state.appReducer.userAnswers);
    const isQuizStart = useSelector(state => state.appReducer.isQuizStart);
    const isQuizEnd = useSelector(state => state.appReducer.isQuizEnd);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = emailRegex.test(email);

    const handleStartQuiz = () => {
        if (isValidEmail) {
            dispatch(setStartValue(true));
            dispatch(setCurrentQuestion(questions?.[0]?.id, questions?.[0]));
        } else {
            setIsError(true)
        }
    };

    const renderPage = () => {
        if (isQuizEnd) {
            return <ReportPage questions={questions} userAnswers={userAnswers} />;
        }
        if (isQuizStart) {
            return <QuizPage />;
        }
        return (
            <div className="app-main">
                <div className="start-page">
                    <h1>Welcome to the Quiz!</h1>
                    <p>Please enter your email address to start:</p>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button onClick={handleStartQuiz} disabled={!email}>
                        Start Quiz
                    </button>
                    {isError && <div style={{ marginTop: "10px", color: "red" }}>Please Enter Valid Email Id</div>}
                </div>
            </div>
        );
    }

    return renderPage();
};

export default connect()(StartPage);
