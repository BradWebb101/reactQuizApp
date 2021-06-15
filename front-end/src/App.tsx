import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
//Components
import QuestionCard from "./components/QuestionCard";

//Types
import { QuestionState } from "./API";

//Styles
import { GlobalStyle, Wrapper } from './App.styles'

export type AnswerObject = {
question: string
answer: string
correct: boolean
correctAnswer: string
category: string
}


const TOTAL_QUESTIONS = 30;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions()

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }


  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users answer
      const answer = event.currentTarget.value
      //Check answer against correct value
      const correct = questions[number].Correct_Answer === answer
      //Add score if answer is correct 
      if (correct) setScore(prev => prev + 1)
      //Save answer in array for user answers
      const AnswerObject = {
        question: questions[number].Question,
        answer, 
        correct,
        correctAnswer: questions[number].Correct_Answer,
        category: questions[number].Category
      }
      setUserAnswers((prev) => [...prev, AnswerObject])
    }
  };

  const nextQuestion = () => {
    //Move onto next question if not the last question
    const nextQuestion = number + 1
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  };

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>Straya 'Know my country'</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
      <button className="start" onClick={startTrivia}>
        Start
      </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>loading Questions .....</p> : null }
      {!loading && !gameOver && (
      <QuestionCard
      questionsNumber={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      category = {questions[number].Category}
      question={questions[number].Question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer} />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
        Next Question
      </button>
      ) : null
      }
    </Wrapper>
    </>
  );
};

export default App;
