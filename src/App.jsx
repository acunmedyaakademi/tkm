import { createContext, useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import GamePage from './components/GamePage';
import Header from './components/Header';
import { createClient } from '@supabase/supabase-js';
import Profile from './components/Profile';

const supabase = createClient('https://lyagtobcfpgedpynwkbz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5YWd0b2JjZnBnZWRweW53a2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAxMzg1MzksImV4cCI6MjA1NTcxNDUzOX0._TTlIRVzTn4PPsX68Pi9ItKtQadgn6Axjewm5Sh_Vpg')
export const UserContext = createContext(null);


function App() {
  const [authUser, setAuthUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState()
  
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      
      if (event === 'SIGNED_IN') {
        setAuthUser(session.user.user_metadata);
        setUserId(session.user.user_metadata.sub)
      }

      if (event === 'SIGNED_OUT') {
        setAuthUser(null);
      }
      const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      };
      
    getUser();
    })


    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const channel = supabase.channel('tracking')
    channel
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        setOnlineUsers(channel.presenceState());
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          await channel.track({ 
            online_at: new Date().toISOString(),
            user_id : user?.id,
            username: user?.user_metadata.name
          })
        }
      })
    return () => {channel.unsubscribe();}

  }, [user])


  return (
    <>
    <UserContext.Provider value={{ supabase, authUser, setAuthUser, userId, onlineUsers }}>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/game' element={<GamePage />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </UserContext.Provider>
      
    </>
  )
}


export default App
