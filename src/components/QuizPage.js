import React  from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setSelectedOption, nextAnswer, setCurrentQuestion, setEndValue } from "../store/appAction";
import OverviewPanel from "./Overview";
import styled from "styled-components";

const Label = styled.label`
  margin-left: 6px;
`;

const QuestionBox = styled.div`
  background: aliceblue;
  padding: 8px 25px;
  border-left: 4px solid #0a58ca;
  margin-bottom: 20px;
`;

const ButtonBox = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  border: none;
  background: none;
  color: #1B71C5FF;
  padding: 3px 6px;

  &:hover {
    background: #1B71C5FF;
    color: #ffffff;
    padding: 3px 12px;
    border-radius: 4px;
  }
`;

const QuizPage = () => {
    const dispatch = useDispatch();
    const questions = useSelector(state => state.appReducer.questions);
    const currentQuestionIndex = useSelector(state => state.appReducer.currentQuestionIndex);
    const selectedOption = useSelector(state => state.appReducer.selectedOption);
    const userAnswers = useSelector(state => state.appReducer.userAnswers);
    const currentQuestion = questions[currentQuestionIndex?.index];

    const handleSelection = (option) => {
        dispatch(setSelectedOption(option))
    }

    const handlePrev = () => {
        dispatch(setCurrentQuestion(currentQuestion?.id - 1, currentQuestion));
    }

    const handleNext = () => {
        if (selectedOption) {
            dispatch(nextAnswer(currentQuestion?.id, selectedOption, currentQuestion?.question));
        } else {
            dispatch(setCurrentQuestion(currentQuestion?.id + 1, currentQuestion));
        }
    };

    const submitQuiz = () => {
        if (selectedOption) {
            dispatch(nextAnswer(currentQuestion?.id, selectedOption, currentQuestion?.question, true));
        } else {
            dispatch(setEndValue(true));
        }
    }

    const getValue = (option) => {
        if (selectedOption?.val) {
            return option?.id === selectedOption?.id;
        }
        const details = userAnswers.filter((item) => item?.currentQuestionId === currentQuestion?.id && item?.givenAnswerId === option?.id);
        return details?.length > 0;
    }

    return (
        <div className="quiz-page">
            <OverviewPanel questions={questions} userAnswers={userAnswers} />
            <div className={`question ${currentQuestionIndex ? 'active' : ''}`}>
                <p>
                    <QuestionBox dangerouslySetInnerHTML={{ __html: currentQuestion?.question }} />
                    {currentQuestion?.options?.map((option, index) => (
                        <div key={index}>
                            <input type="radio" checked={getValue(option)} onClick={() => handleSelection(option)} />
                            <Label dangerouslySetInnerHTML={{ __html: option?.val }}></Label>
                        </div>
                        ))}
                    <ButtonBox>
                        {
                            currentQuestion?.id > 0 ?
                                <Button onClick={() => handlePrev()}>Previous</Button>
                                :
                                <div>{""}</div>
                        }
                        {
                            questions?.length -1 !== currentQuestion?.id ?
                            <Button onClick={() => handleNext()}>Next</Button>
                                :
                                <Button onClick={() => submitQuiz()}>Submit</Button>
                        }
                    </ButtonBox>
                </p>
            </div>
        </div>
    );
};

export default QuizPage;
