"use client"

import { motion } from "framer-motion"
import { Clock } from "lucide-react"

function Timer({ timeLeft, questionNumber }) {
  const seconds = timeLeft % 60

  return (
    <motion.div
      key={questionNumber}
      className="flex items-center rounded-lg px-4 py-2"
      initial={{ backgroundColor: "#4ade80" }} // Start with green
      animate={{
        backgroundColor: [
          "rgba(74, 222, 128, 1)", // green-400
          "rgba(251, 191, 36, 1)", // yellow-400
          "rgba(248, 113, 113, 1)", // red-400
        ],
      }}
      transition={{
        duration: 30,
        times: [0, 0.6, 1],
        ease: "linear",
      }}
    >
      <Clock className="w-5 h-5 mr-2 text-white" />
      <motion.span
        className="text-xl font-bold text-white"
        key={timeLeft}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {seconds < 10 ? `0${seconds}` : seconds}
      </motion.span>
    </motion.div>
  )
}

export default Timer

