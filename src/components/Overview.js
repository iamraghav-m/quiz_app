import React from 'react';
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentQuestion } from "../store/appAction";

const Button = styled.button`
  margin-right: 8px;
  background: ${(props) => props.isAttempted ? "#198754" : "none"};
  padding: 3px 12px;
  border-radius: 4px;
  border: ${(props) => {
    if (props.isActive) {
      return "1px solid #9797A5FF";
    }
    if (props.isVisited) {
      return "1px solid #9797A5FF";
    }
    return "none";
  }};
  box-shadow: ${(props) => props.isActive ? "0px 3px 3px rgb(151, 151, 165)" : "none"};
  
  &:hover {
    border: 1px solid #9797A5FF;
    padding: 3px 12px;
    border-radius: 4px;
  }


  @media only screen and (max-width: 768px) {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;

const OverviewPanel = ({ questions, userAnswers }) => {
    const dispatch = useDispatch();
    const currentQuestionIndex = useSelector(state => state.appReducer.currentQuestionIndex);

    const handleButtonClick = (index, question) => {
        dispatch(setCurrentQuestion(index, question));
    }

    return (
        <div className="overview-panel">
            <div className="overview-header">
                <div>
                    {questions.map((question, index) => (
                        <Button
                            key={index}
                            isVisited={userAnswers.filter((item) => item?.currentQuestionId === question?.id)?.[0]?.is_visited}
                            isAttempted={userAnswers.filter((item) => item?.currentQuestionId === question?.id)?.[0]?.is_attempted}
                            isActive={question?.id === currentQuestionIndex?.index}
                            onClick={() => handleButtonClick(index, question)}
                        >
                            {index + 1}
                        </Button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default OverviewPanel;
