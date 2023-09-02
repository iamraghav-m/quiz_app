This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Quiz Appp - React.js App

- Test [LIVE][appHost] Demo!

## Usage
Start the development server:
- npm start
- Access the application in your web browser at http://localhost:3000.
- Take a quiz, answer questions, and navigate through the quiz.

## 📜 Overview

In this tutorial, we will be exploring a **Quiz App**. Developed with React.js. The key features that we will be exploring:

- Local State Management using [Hooks][hooks]
- 
*_ Hooks are involved in every opeartion that is taking place in the App _*

## 💻 Pre-requisites
- Basics Knowledge about HTML, CSS & JavaScript
- [Node.js][nodejs] must be installed
- Redux (for state management)
- styled-components (for styling)

## Why Hooks are Used?

- Hooks are new to React.js `v16.8`
- Let's you use **State** & features like **Lifecycle Methods** without writing a `class`
- Reduce the number of concepts you need to juggle while writing React apps.
- Reduce the constant switching between functions, classes, higher-order components & allows the preference of `functions`.

## Why & How Hooks are used?

## Why!
We are using Hooks to managing the local state of our app, which includes very minimalist features like:
- Managing the state of all quiz data point easily
- MManipulate or update data using dispatch doing easily and simpler
- State in Quiz app Component etc.

## Set Up Your Project:
Assuming you have Node.js installed, you can create a new React app using create-react-app. Open your terminal and run:
- npx create-react-app quiz-app
- cd quiz-app

## Fetching Questions from API:
In your src folder, create a new file called api.js to handle API requests:

- A function fetchQuestions that is responsible for making an HTTP request to a specified API endpoint (API_URL) to fetch a set of quiz questions.
- `const API_URL = "https://opentdb.com/api.php?amount=15";` 
- it's the Open Trivia Database API, and you're requesting 15 questions `(?amount=15)`.
- It's marked as async because it performs asynchronous operations like making HTTP requests.
- This begins a try-catch block, which is used to handle any errors that may occur during the execution of the code within the try block.
- `const data = await response.json();` uses the json() method to parse the response body as JSON. The await keyword is used here as well to wait for the parsing to complete.
- In summary, this code defines a function fetchQuestions that fetches quiz questions from a specified API endpoint and handles any potential errors that may occur during the process. When used in your application, you can call this function to retrieve quiz questions and work with the returned data as needed.

```js
const API_URL = "https://opentdb.com/api.php?amount=15";

export const fetchAPIForData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};
```

## In app component:
Header, main and footer define here, using useEffect call the api from here when render first time and assign all questions data in redux initial state using redux

```js
export const App = () => {
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
}
```
- using useEffect update the time interval - code below

```js
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
```

## Screenshot of the App Page
![img.png](public/img/img.png)

## Create Components:
Inside the src folder, create components for your application:

- `components/Timer.js:` Display and manage the timer.

   Reusable timer display component that you can incorporate into your React application to show the remaining time for a quiz or any other timed activity. When you use this component in your application, you should pass the timer prop with the number of seconds remaining for the countdown.

- `components/StartPage.js:` Display the StartPage component and  should have a start page where the user should submit their email address.
  
   `const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;` using this regex validating for email and start the Quiz.

- `components/QuizPage.js:` Display and define quiz component for which application should display 15 questions to the user and continue with navigation.

## Implement the Quiz Logic:

- Display quiz questions with multiple-choice options.
- Allow users to select answers and navigate between questions and this all state manage by redux that we are using.
    
- Track user progress in `Overview Panel` and save answers in `Redux using action and dispatcher`.

## Quiz start screenshot and state defines
Display quiz questions with multiple-choice options and their states
![img_1.png](public/img/img_1.png)
![img_2.png](public/img/img_2.png)

## Quiz start screenshot and state defines
- Submit the quiz and view results.

![img_3.png](public/img/img_3.png)

## Author

#### Raghvendra Modanwal
[![LinkedIn Link](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6oPx-oCJD34UYMORbD5KjmnxozVLOieJ8ff9wGTZPoAXJTxCnxc_clxS5KA55gnGN5g&usqp=CAU
)](https://www.linkedin.com/in/iamraghav/)


Copyright (c) 2023 CB

[hooks]: https://reactjs.org/docs/hooks-intro.html
[nodejs]: https://nodejs.org/en/
[appHost]: https://r-joblisting.netlify.app/
