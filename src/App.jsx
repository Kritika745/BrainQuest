import Quiz from "./components/Quiz"

function App() {
  return (
    <>
    <header className="bg-purple-600 text-white p-4">
    <h1 className="text-2xl font-bold">BRAINQUEST</h1>
  </header>
    <div className="min-h-screen bg-gray-100 flex justify-center ">
     
      <main className="container mx-auto p-4 w-[70%] md:w-[60%]  ">
        <Quiz />
      </main>
    </div>
    </>
  )
}

export default App

