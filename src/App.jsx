import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import GamePage from './components/GamePage';
import Header from './components/Header';

function App() {
  const [currentPage, setCurrentPage] = useState(null);



  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </>
  )
}


export default App
