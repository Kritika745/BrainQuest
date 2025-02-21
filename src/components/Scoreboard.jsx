"use client"

import { motion } from "framer-motion"
import { Trophy, RotateCcw, Clock, Award } from "lucide-react"

function Scoreboard({ score, totalQuestions, attempts, onRestart, quizHistory }) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-green-500">Quiz Completed!</h2>
      <motion.div
        className="text-6xl font-bold text-center text-green-500 flex items-center justify-center space-x-4"
        initial={{ scale: 0 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.5, times: [0, 0.5, 1] }}
      >
        <Trophy size={48} />
        <span>{percentage}%</span>
      </motion.div>
      <div className="text-xl text-center text-gray-600">
        Your score: {score} out of {totalQuestions}
      </div>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
        <div className="flex items-center space-x-2">
          <Clock size={24} className="text-purple-500" />
          <span className="text-lg font-semibold">Attempts:</span>
        </div>
        <span className="text-2xl font-bold text-purple-600">{attempts}</span>
      </div>
      <motion.button
        onClick={onRestart}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RotateCcw size={24} />
        <span>Restart Quiz</span>
      </motion.button>
      <h3 className="text-2xl font-bold mt-8 text-purple-600 flex items-center space-x-2">
        <Award size={28} />
        <span>Quiz History</span>
      </h3>
      <ul className="space-y-4">
        {quizHistory.map((result, index) => (
          <motion.li
            key={index}
            className="bg-gray-50 p-4 rounded-lg shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-700">Attempt {quizHistory.length - index}:</span>
              <span className="text-lg font-bold text-purple-600">
                {result.score}/{result.totalQuestions}
              </span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{new Date(result.timestamp).toLocaleString()}</div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export default Scoreboard

