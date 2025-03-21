import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import GamePage from './components/GamePage';
import Header from './components/Header';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://lyagtobcfpgedpynwkbz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YWd0b2JjZnBnZWRweW53a2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMzg1MzksImV4cCI6MjA1NTcxNDUzOX0._TTlIRVzTn4PPsX68Pi9ItKtQadgn6Axjewm5Sh_Vpg')
export const UserContext = createContext(null);


function App() {
  const [authUser, setAuthUser] = useState(null);
  const [userId, setUserId] = useState(null);
  
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      
      if (event === 'SIGNED_IN') {
        setAuthUser(session.user.user_metadata);
        setUserId(session.user.user_metadata.sub)
      }

      if (event === 'SIGNED_OUT') {
        setAuthUser(null);
      }

    })
    return () => data.subscription.unsubscribe();
  }, []);

  return (
    <>
    <UserContext.Provider value={{ supabase, authUser, setAuthUser, userId }}>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/game' element={<GamePage />} />
      </Routes>
    </UserContext.Provider>
      
    </>
  )
}


export default App
