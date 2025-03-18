import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import GamePage from './components/GamePage';

function App() {
  const [currentPage, setCurrentPage] = useState(null);

  
  
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </>
  )
}


export default App
