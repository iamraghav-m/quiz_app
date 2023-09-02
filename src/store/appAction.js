import {
    SET_CURRENT_QUESTION,
    TICK_TIMER,
    SET_QUIZ_START,
    SET_QUIZ_END,
    SELECTED_OPTION, NEXT_ANSWER, FETCH_QUESTIONS
} from "./appActionType";

export const fetchQuestions = (data) => ({
    type: FETCH_QUESTIONS,
    payload: data,
});

export const setStartValue = (val) => ({
    type: SET_QUIZ_START,
    payload: val,
});

export const setEndValue = (val) => ({
    type: SET_QUIZ_END,
    payload: val,
});

export const setSelectedOption = (option) => ({
    type: SELECTED_OPTION,
    payload: option,
});

export const setCurrentQuestion = (index, question = null) => ({
    type: SET_CURRENT_QUESTION,
    payload: { index, question },
});

export const nextAnswer = (currentQuestionId, option, currentQuestion, lastIndex = false) => ({
    type: NEXT_ANSWER,
    payload: { currentQuestionId, option, currentQuestion, lastIndex },
});

export const tickTimer = () => ({
    type: TICK_TIMER,
});
