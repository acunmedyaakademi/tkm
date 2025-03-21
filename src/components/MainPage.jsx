import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

export default function MainPage() {
  const { supabase, authUser } = useContext(UserContext);
  const [topScoreUsers, setTopScoreUsers] = useState([])

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
        
  return (
    <>
      <div className="container">


        <div className="hero">
          <div className="hero-area">
            <img src="public/imgs/rps-hero.jpeg" alt="" />

          </div>
        </div>

        <div className="footer">
          <div>
            <h3>Last Played & Scores(🪧)</h3>
            <ul>
              {
                topScoreUsers.map(x => <li>
                  {x.name} - {x.score}
                </li>)
              }
            </ul>
          </div>
          <div>
            <h3>Online Players(🟢)</h3>
          </div>
        </div>
      </div>
    </>
  )
}