export default function Header() {

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    })
    
  }

  function handleLogin() {

  }
 

  return (
    <>
    <div className="header-cont">
      <img src="public\imgs\rps-logo.png" alt="" />
      <div className="user-controls">
        <button onClick={() => handleLogin()} className="login">Giriş Yap</button>
        <button onClick={() => handleSignup()} className="signup">Kayıt Ol</button>
      </div>
    </div>
    <dialog open>
      dialog
    </dialog>
      
    </>
  )

}