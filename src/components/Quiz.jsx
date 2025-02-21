"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Question from "./Questions"
import Timer from "./Timer"
import Scoreboard from "./Scoreboard"
import Instructions from "./Instructions"
import { addQuizResult, getQuizHistory } from "../utils/IndexedDB"

const quizQuestions = [
  {
    id: 1,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: "Mercury",
    type: "multiple-choice",
  },
  {
    id: 2,
    question: "Which data structure organizes items in a First-In, First-Out (FIFO) manner?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
    type: "multiple-choice",
  },
  {
    id: 3,
    question: "Which of the following is primarily used for structuring web pages?",
    options: ["Python", "Java", "HTML", "C++"],
    correctAnswer: "HTML",
    type: "multiple-choice",
  },
  {
    id: 4,
    question: "Which chemical symbol stands for Gold?",
    options: ["Au", "Gd", "Ag", "Pt"],
    correctAnswer: "Au",
    type: "multiple-choice",
  },
  {
    id: 5,
    question: "Which of these processes is not typically involved in refining petroleum?",
    options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"],
    correctAnswer: "Filtration",
    type: "multiple-choice",
  },
  {
    id: 6,
    question: "What is the value of 12 + 28?",
    correctAnswer: "40",
    type: "integer",
  },
  {
    id: 7,
    question: "How many states are there in the United States?",
    correctAnswer: "50",
    type: "integer",
  },
  {
    id: 8,
    question: "In which year was the Declaration of Independence signed?",
    correctAnswer: "1776",
    type: "integer",
  },
  {
    id: 9,
    question: "What is the value of pi rounded to the nearest integer?",
    correctAnswer: "3",
    type: "integer",
  },
  {
    id: 10,
    question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?",
    correctAnswer: "120",
    type: "integer",
  },
]

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [quizHistory, setQuizHistory] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [showInstructions, setShowInstructions] = useState(true)

  useEffect(() => {
    loadQuizHistory()
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && !showScore && !showInstructions) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleAnswer(null)
    }
  }, [timeLeft, showScore, showInstructions])

  const loadQuizHistory = async () => {
    const history = await getQuizHistory()
    setQuizHistory(history)
    setAttempts(history.length)
  }

  const handleAnswer = (selectedAnswer) => {
    const currentQuestion = quizQuestions[currentQuestionIndex]
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setFeedback({
      isCorrect,
      correctAnswer: currentQuestion.correctAnswer,
    })

    setTimeout(() => {
      setFeedback(null)
      const nextQuestion = currentQuestionIndex + 1
      if (nextQuestion < quizQuestions.length) {
        setCurrentQuestionIndex(nextQuestion)
        setTimeLeft(30)
      } else {
        setShowScore(true)
        saveQuizResult()
      }
    }, 2000)
  }

  const saveQuizResult = async () => {
    await addQuizResult(score, quizQuestions.length)
    await loadQuizHistory()
  }

  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setShowScore(false)
    setAttempts((prev) => prev + 1)
    setTimeLeft(30)
    setFeedback(null)
    setShowInstructions(true)
  }

  const startQuiz = () => {
    setShowInstructions(false)
    setAttempts((prev) => prev + 1)
  }

  const progress = (currentQuestionIndex / quizQuestions.length) * 100

  return (
    <motion.div
      className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center w-full max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <AnimatePresence mode="wait">
        {showInstructions && <Instructions key="instructions" onStart={startQuiz} />}
        {showScore && (
          <Scoreboard
            key="scoreboard"
            score={score}
            totalQuestions={quizQuestions.length}
            attempts={attempts}
            onRestart={restartQuiz}
            quizHistory={quizHistory}
          />
        )}
        {!showInstructions && !showScore && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="flex flex-col space-y-6 items-center mb-6">
            <Timer timeLeft={timeLeft} questionNumber={currentQuestionIndex + 1} />
              <span className="text-md self-start font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              
            </div>
            <motion.div
              className="w-full h-1 bg-gray-200 mb-8"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="h-full bg-indigo-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </motion.div>
            <Question question={quizQuestions[currentQuestionIndex]} onAnswer={handleAnswer} feedback={feedback} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Quiz

