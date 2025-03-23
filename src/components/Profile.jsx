import { useContext, useEffect, useRef, useState } from "react"
import { UserContext } from "../App"

export default function Profile() {
  const { authUser, supabase, userId } = useContext(UserContext);
  const nameChangeRef = useRef(null);
  const [username, setUsername] = useState("");
  const [userScore, setUserScore] = useState(null);

  useEffect(() => {
    setUsername(authUser?.name);
  }, [authUser])

  
  useEffect(() => {
    async function getUsers() {
      let { data, error } = await supabase
        .from('users')
        .select('user_id, score')
        .eq('user_id', userId)
      data && setUserScore(data[0]?.score);
    }
    getUsers();

  }, [userId])

  async function changeName(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { name } = formObj;
    await supabase.auth.updateUser({
      data: { name }
    })

    const { data, error } = await supabase
    .from('users')
    .update({ name })
    .eq("user_id", userId)
    .select()

    setUsername(name);
        
    nameChangeRef.current.close();
  }

  return (
    <>
    <div className="profile-page">
      <h2>Profile</h2>
      <h3>{username} <button onClick={(e) => {e.preventDefault(); nameChangeRef.current.showModal();}}>Change Name</button></h3>
      <h3>Email: <span>{authUser?.email}</span></h3>
      <h4>Score: <span>{userScore}</span></h4>
      <h4>Latest Games</h4>
      <div className="profile-games-list">

      </div>
      <dialog ref={nameChangeRef}>
        <form onSubmit={changeName}>
          <input type="text" name="name" placeholder="İsim" />
          <button type="submit">İsim değiştir</button>
        </form>
      </dialog>
    </div>
      

    </>
  )
}