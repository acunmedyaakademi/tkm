import { useContext, useRef } from "react"
import { UserContext } from "../App";

export default function Header() {
  const { supabase, authUser, setAuthUser } = useContext(UserContext);
  const signUpRef = useRef(null);
  const loginRef = useRef(null);

  async function handleSignup(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { name, email, password } = formObj;
    const options = { data: { name } }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options
    })
    
    await supabase.from('users')
    .insert([
      { name, email },
    ]).select()
            
    signUpRef.current.close();
  }

  async function handleLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    const { email, password } = formObj;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    loginRef.current.close();
  }

  async function handleLogout(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signOut()
  }


  return (
    <>
      <div className="header-cont">
        <a href="/"><img src="public\imgs\rps-logo.png" alt="" /></a>
        <div className="user-controls">
          {
            authUser
              ? <>
                <p><a href="/profile">{authUser.name}</a></p>
                <span>|</span>
                <a href="/game"><p>Play</p></a>
                <button onClick={handleLogout}>Sign Out</button>
              </>
              : <>
                <button onClick={() => loginRef.current.showModal()} className="login">Giriş Yap</button>
                <button onClick={() => signUpRef.current.showModal()} className="signup">Kayıt Ol</button>
              </>
          }
        </div>
      </div>

      <dialog ref={signUpRef}>
        <h3>Kayıt Ol</h3>
        <form className="user-control-form" onSubmit={handleSignup}>
          <input type="text" placeholder="İsim" name="name" />
          <input type="text" placeholder="E-mail" name="email" />
          <input type="password" placeholder="Parola" name="password" />
          <button>Kayıt Ol</button>
        </form>
      </dialog>

      <dialog ref={loginRef}>
        <h3>Giriş Yap</h3>
        <form className="user-control-form" onSubmit={handleLogin}>
          <input type="text" placeholder="E-mail" name="email" />
          <input type="password" placeholder="Parola" name="password" />
          <button>Giriş Yap</button>
        </form>
      </dialog>

    </>
  )

}