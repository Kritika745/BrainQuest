"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Book, CheckCircle, Calculator, Clock } from "lucide-react"

function Instructions({ onStart }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: <Book className="w-12 h-12 text-purple-500" />,
      title: "Multiple Choice Questions",
      description: "Select the best answer from options A, B, C, or D.",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-green-500" />,
      title: "Integer Questions",
      description: "Enter your numerical answer clearly.",
    },
    {
      icon: <Calculator className="w-12 h-12 text-red-500" />,
      title: "No Calculators",
      description: "Unless specified, calculators are not allowed.",
    },
    {
      icon: <Clock className="w-12 h-12 text-yellow-500" />,
      title: "Time Limit",
      description: "You have 30 seconds for each question.",
    },
  ]

  return (
    <motion.div
      className="w-full space-y-8"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold text-center text-purple-600">Quiz Instructions</h2>
      <div className="relative h-80 mb-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-6 ${
              index === currentStep ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: index === currentStep ? 1 : 0,
              scale: index === currentStep ? 1 : 0.8,
              transition: { duration: 0.5 },
            }}
          >
            {step.icon}
            <h3 className="text-xl font-semibold mt-4 mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mb-8">
        {steps.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentStep ? "bg-purple-500" : "bg-gray-300"}`}
            onClick={() => setCurrentStep(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l"
          disabled={currentStep === 0}
        >
          Previous
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-r"
          >
            Next
          </button>
        ) : (
          <motion.button
            onClick={onStart}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Quiz
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}

export default Instructions

