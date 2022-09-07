import React, { useState, useEffect } from "react";
import "./App.css";

const LOCAL_STORAGE_KEY = "quiz-multiple-choice";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [items, setItems] = useState([]);

  //Local Storage
  useEffect(() => {
    const storageScore = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storageScore) {
      setItems(storageScore);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  function saveScore() {
    const item = {
      id: +new Date(),
      value: (score / questions.length) * 100,
    };
    setItems((oldList) => [...oldList, item]);
  }

  const onClickHandler = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };
  function deleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }
  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  const questions = [
    {
      text: `Dalam suatu kelas yang terdiri atas 15 
      siswa putri dan 12 siswa putra akan dipilih sepasang 
      ganda campuran (putra dan putri) untuk mewakili kelas. Berapa banyak 
      cara sepasang ganda campuran itu.`,
      options: [
        { id: 0, text: "New York City", isCorrect: false },
        { id: 1, text: "Boston", isCorrect: false },
        { id: 2, text: "Santa Fe", isCorrect: false },
        { id: 3, text: "Washington DC", isCorrect: true },
      ],
    },
    {
      text: "What year was the Constitution of America written?",
      options: [
        { id: 0, text: "1787", isCorrect: true },
        { id: 1, text: "1776", isCorrect: false },
        { id: 2, text: "1774", isCorrect: false },
        { id: 3, text: "1826", isCorrect: false },
      ],
    },
    {
      text: "Who was the second president of the US?",
      options: [
        { id: 0, text: "John Adams", isCorrect: true },
        { id: 1, text: "Paul Revere", isCorrect: false },
        { id: 2, text: "Thomas Jefferson", isCorrect: false },
        { id: 3, text: "Benjamin Franklin", isCorrect: false },
      ],
    },
    {
      text: "What is the largest state in the US?",
      options: [
        { id: 0, text: "California", isCorrect: false },
        { id: 1, text: "Alaska", isCorrect: true },
        { id: 2, text: "Texas", isCorrect: false },
        { id: 3, text: "Montana", isCorrect: false },
      ],
    },
    {
      text: "Which of the following countries DO NOT border the US?",
      options: [
        { id: 0, text: "Canada", isCorrect: false },
        { id: 1, text: "Russia", isCorrect: true },
        { id: 2, text: "Cuba", isCorrect: true },
        { id: 3, text: "Mexico", isCorrect: false },
      ],
    },
  ];
  function shuffleArray(questions) {
    questions.sort(() => Math.random() - 0.5);
  }
  return (
    <div className="App">
      <h1>Quiz App</h1>

      <h1>
        Correct {score} from {questions.length}
      </h1>

      {showResult ? (
        <div className="final-result">
          <h1>Final result</h1>
          <h2>{(score / questions.length) * 100} </h2>

          <button
            onClick={() => {
              restartQuiz();
            }}
          >
            restart Quiz
          </button>
          <button onClick={() => saveScore()}>Save Score</button>

          <div className="final-quiz">
            <ul>
              {items.map((item) => {
                return (
                  <li key={item.id}>
                    {item.value}
                    <button onClick={() => deleteItem(item.id)}>X</button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="question-card">
          <h2>{shuffleArray(questions)}</h2>
          <h3 className="question-text">
            {" "}
            {currentQuestion + 1} {"."} {questions[currentQuestion].text}
          </h3>

          <ul>
            {questions[currentQuestion].options.map((option) => {
              return (
                <li
                  onClick={() => onClickHandler(option.isCorrect)}
                  key={option.id}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
