import React from 'react';
import styled from "styled-components";

const HeaderBox = styled.h1`
    margin-bottom: 30px;
`;

const QuestionBox = styled.div`
    width: 50%;
`;

const ReportPage = ({ questions, userAnswers }) => {
    const getTotalRightAns = () => {
        let totalCorrectAnswers = 0;

        for (const element of userAnswers) {
            const questionData = element;
            const externalQuestion = questions?.filter((item) => item?.id === questionData?.currentQuestionId)?.[0];

            if (
                externalQuestion &&
                externalQuestion.correct_answer &&
                questionData.givenAnswer === externalQuestion.correct_answer
            ) {
                totalCorrectAnswers++;
            }
        }
        return totalCorrectAnswers;
    }

    const renderUserAnswer = (question) => {
        const updatedAnswer = userAnswers.filter((val) => val.currentQuestionId === question?.id)?.[0];
        return (
            <div>Your Answer: {updatedAnswer?.givenAnswer || 'Not Attempted'}</div>
        );
    }

    return (
        <div className="report-page">
            <HeaderBox>Quiz Report</HeaderBox>
            <div>Total Question: {questions?.length}</div>
            <div>Total attempt: {userAnswers.filter(item => item?.is_attempted)?.length}</div>
            <div style={{ marginBottom: "20px" }}>Total Correct: {getTotalRightAns()}</div>
            {questions.map((question, index) => (
                <div key={index} className="question-report">
                    <QuestionBox >Question {index + 1}: <span dangerouslySetInnerHTML={{ __html: question?.question }}/></QuestionBox>
                    {renderUserAnswer(question)}
                    <div>Correct Answer: <span dangerouslySetInnerHTML={{ __html: question.correct_answer }}/></div>
                </div>
            ))}
        </div>
    );
};

export default ReportPage;
