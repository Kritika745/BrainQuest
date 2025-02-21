"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function Question({ question, onAnswer, feedback }) {
  const [integerAnswer, setIntegerAnswer] = useState("")
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleIntegerSubmit = (e) => {
    e.preventDefault()
    onAnswer(integerAnswer)
    setIntegerAnswer("")
  }

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  return (
    <motion.div className="space-y-4" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="flex justify-between items-center">
        <motion.h2 className="text-xl font-semibold" variants={itemVariants}>
          {question.question}
        </motion.h2>
        <motion.div
          className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          animate={{
            scale: countdown <= 3 ? [1, 1.2, 1] : 1,
            transition: { duration: 0.5, repeat: countdown <= 3 ? Number.POSITIVE_INFINITY : 0 },
          }}
        >
          {countdown}
        </motion.div>
      </motion.div>
      {question.type === "multiple-choice" ? (
        <div className="space-y-2">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => onAnswer(option)}
              disabled={feedback !== null}
              className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded disabled:opacity-50"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.form onSubmit={handleIntegerSubmit} className="flex space-x-2" variants={itemVariants}>
          <motion.input
            type="number"
            value={integerAnswer}
            onChange={(e) => setIntegerAnswer(e.target.value)}
            disabled={feedback !== null}
            required
            className="flex-grow px-2 py-1 border rounded"
            whileFocus={{ scale: 1.05, boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.5)" }}
          />
          <motion.button
            type="submit"
            disabled={feedback !== null}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit
          </motion.button>
        </motion.form>
      )}
      <AnimatePresence>
        {feedback && (
          <motion.div
            className={`p-2 rounded ${feedback.isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {feedback.isCorrect ? "Correct!" : `Incorrect. The correct answer is ${feedback.correctAnswer}.`}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Question

