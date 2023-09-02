import {
    SET_CURRENT_QUESTION,
    TICK_TIMER,
    SET_QUIZ_END,
    SET_QUIZ_START, SELECTED_OPTION, NEXT_ANSWER, FETCH_QUESTIONS
} from "./appActionType";

const initialState = {
    questions: [], // Array of question objects
    user: {},
    isQuizStart: false,
    isQuizEnd: false,
    currentQuestionIndex: null,
    selectedOption: null,
    userAnswers: [],
    timer: 1800, // 30 minutes in seconds
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_QUESTIONS:
            return {
                ...state,
                questions: action.payload
            };

        case SET_QUIZ_START:
            return {
                ...state,
                isQuizStart: action.payload
            };

        case SET_QUIZ_END:
            return {
                ...state,
                isQuizEnd: action.payload
            };

        case SELECTED_OPTION:
            return {
                ...state,
                selectedOption: action.payload
            };

        case SET_CURRENT_QUESTION: {
            let updatedAnswer = [...state.userAnswers] ;
            const filteredData = updatedAnswer.filter((item) => item?.currentQuestionId === action.payload?.question?.id);
            if (filteredData?.length > 0) {
                updatedAnswer.map((item) => {
                    if (item?.currentQuestionId === filteredData?.[0]?.currentQuestionId) {
                        const details = {...item};
                        details.currentQuestionId =  action.payload?.question?.id;
                        details.currentQuestion =  action.payload?.question?.question;
                        details.givenAnswerId =  null;
                        details.givenAnswer =  null;
                        details.is_visited =  true;
                        details.is_attempted =  false;
                        return item;
                    }
                })
            } else {
                updatedAnswer = [...state.userAnswers, {
                    currentQuestionId: action.payload?.question?.id,
                    currentQuestion: action.payload?.question?.question,
                    givenAnswerId: null,
                    givenAnswer: null,
                    is_visited: true,
                    is_attempted: false,
                }];
            }

            return {
                ...state,
                currentQuestionIndex: action.payload,
                userAnswers: updatedAnswer,
                selectedOption: null
            };
        }


        case NEXT_ANSWER: {
            let updatedAnswer = [...state.userAnswers];
            const filteredData = updatedAnswer.filter((item) => item?.currentQuestionId === action.payload?.currentQuestionId);
            if (filteredData?.length > 0) {
                updatedAnswer = [...state.userAnswers].map((item) => {
                    if (item?.currentQuestionId === filteredData?.[0]?.currentQuestionId) {
                        const details = {...item};
                        details.currentQuestionId =  action.payload?.currentQuestionId;
                        details.currentQuestion =  action.payload?.currentQuestion;
                        details.givenAnswerId =  action.payload?.option?.id;
                        details.givenAnswer =  action.payload?.option?.val;
                        details.is_visited =  true;
                        details.is_attempted =  true;
                        return details;
                    }
                    return item;
                })
            } else {
                updatedAnswer = [...state.userAnswers, {
                    currentQuestionId: action.payload?.currentQuestionId,
                    currentQuestion: action.payload?.currentQuestion,
                    givenAnswerId: action.payload?.option?.id,
                    givenAnswer: action.payload?.option?.val,
                    is_visited: true,
                    is_attempted: true,
                }];
            }

            let currentDetails = null;
            let quizStatus = false;
            let isQuizStart = true;
            if (!action.payload?.lastIndex) {
                currentDetails = {
                    index: action.payload?.currentQuestionId + 1
                }
            }

            if (action.payload?.lastIndex) {
                quizStatus = true;
                isQuizStart = false;
            }

            return {
                ...state,
                userAnswers: updatedAnswer,
                selectedOption: null,
                currentQuestionIndex: currentDetails,
                isQuizEnd: quizStatus,
                isQuizStart
            };
        }

        case TICK_TIMER:
            return {
                ...state,
                timer: state.timer - 1
            };

        default:
            return state;
    }
};

export default appReducer;
