import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

export default function MainPage() {
  const { supabase, authUser, onlineUsers } = useContext(UserContext);
  const [topScoreUsers, setTopScoreUsers] = useState([]);
  const usersCurrentlyOnline = [];

  useEffect(() => {
    async function getUsers() {
    let { data, error } = await supabase
    .from('users')
    .select('*')
    .order('score', { ascending: false })
    .range(0, 5)
    setTopScoreUsers(data);
  }
    getUsers();
  }, [])
  
  onlineUsers && Object.keys(onlineUsers).map(x => 
    onlineUsers[x][0]?.username != undefined && usersCurrentlyOnline.push(onlineUsers[x][0]?.username)
  )

  return (
    <>
      <div className="container">


        <div className="hero">
          <div className="hero-area">
            <a href="/game"><img src="public/imgs/rps-hero.jpeg" alt="" /></a>

          </div>
        </div>

        <div className="footer">
          <div>
            <h3>Last Played & Scores(🪧)</h3>
            <ul>
              {
                topScoreUsers.map(x => <li key={crypto.randomUUID()}>
                  {x.name} - {x.score}
                </li>)
              }
            </ul>
          </div>
          <div>
            <h3>Online Players(🟢) {[...new Set(usersCurrentlyOnline)].length}</h3>
            <ul>
              {
                [...new Set(usersCurrentlyOnline)].map(x => <li className="online-user" key={crypto.randomUUID()}>
                  {x == authUser?.name ? <p>{x}</p> : <a href="/game">{x}</a>}
                </li>)
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}