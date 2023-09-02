/* eslint-disable */

import React, { useEffect } from "react";
import StartPage from "./components/StartPage";
import { fetchAPIForData } from "./api";

import Timer from "./components/Timer";
import { useSelector, useDispatch } from "react-redux";
import { tickTimer, fetchQuestions, setStartValue, setEndValue } from "./store/appAction";

import "./css/global.css";

export default () => {
    const dispatch = useDispatch();

    const isStartQuiz = useSelector(state => state.appReducer.isQuizStart);

    const timer = useSelector(state => state.appReducer.timer);

    useEffect(() => {
        let timerInterval;
        if (isStartQuiz) {
            timerInterval = setInterval(() => {
                if (timer > 0) {
                    dispatch(tickTimer());
                } else {
                    clearInterval(timerInterval);
                    dispatch(setStartValue(false));
                    dispatch(setEndValue(true));
                }
            }, 1000);
        }

        return () => clearInterval(timerInterval);
    }, [timer, dispatch, isStartQuiz]);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            const fetchedQuestions = await fetchAPIForData();
            const updatedData = fetchedQuestions.map((item, index) => {
                const { category, correct_answer, difficulty, incorrect_answers, question, type } = item;
                const options = [
                    { id: 0, val: correct_answer },
                    ...incorrect_answers.map((incorrectAnswer, optionId) => ({ id: optionId + 1, val: incorrectAnswer })),
                ];

                shuffleArray(options);

                return {
                    id: index,
                    category: category,
                    type,
                    difficulty: difficulty,
                    question,
                    options,
                    correct_answer,
                    incorrect_answers,
                    is_visited: false,
                    is_attempted: false,
                };
            });
            dispatch(fetchQuestions(updatedData));
        };
        fetchQuizQuestions();
    }, []);

  return (
      <div className="app">
          <header className="app-header">
              <h1>Quiz Application</h1>
              {isStartQuiz &&
                  <Timer timer={timer} />
              }
          </header>
          <main>
              <StartPage />
          </main>
          <footer className="app-footer">
              <p>© {new Date().getFullYear()} Quiz App. All rights reserved.</p>
          </footer>
      </div>
  );
};
