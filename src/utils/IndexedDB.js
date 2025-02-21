import { openDB } from "idb"

const dbPromise = openDB("quiz-history-db", 1, {
  upgrade(db) {
    db.createObjectStore("quiz-history", { keyPath: "id", autoIncrement: true })
  },
})

export async function addQuizResult(score, totalQuestions) {
  const db = await dbPromise
  const tx = db.transaction("quiz-history", "readwrite")
  const store = tx.objectStore("quiz-history")
  await store.add({
    score,
    totalQuestions,
    timestamp: Date.now(),
  })
  await tx.done
}

export async function getQuizHistory() {
  const db = await dbPromise
  return db.getAll("quiz-history")
}

