import { useState } from "react"

// Small wrapper pattern:
// protect content and decide what to show when user is not authenticated.
const RequireAuth = ({ authenticated, children }) => {
  if (!authenticated) {
    return (
      <p className="bg-amber-800 text-2xl text-white">
        Login to View Dashboard
      </p>
    )
  }

  return <>{children}</>
}


const LoginFormView = ({ loginForm, setLoginForm }) => {
  return (
    <>
      <div>Please Login</div>
      <form>
        Name:{' '}
        <input
          type="text"
          name="name"
          value={loginForm.name}
          onChange={(e) => {
            // Input updates parent-owned state.
            // This is controlled input behavior, just passed down via props.
            setLoginForm((prev) => ({ ...prev, name: e.target.value }))
          }}
        />
        <br />
        Pass:{' '}
        <input
          type="password"
          name="pass"
          value={loginForm.pass}
          onChange={(e) => {
            setLoginForm((prev) => ({ ...prev, pass: e.target.value }))
          }}
        />
      </form>
    </>
  )
}

const WelcomeView = ({ loginForm }) => {
  return (
    <>
      <div>Hi, {loginForm.name} Welcome</div>
    </>
  )
}

const LoginToggle = () => {
  /*
    Why this task exists:
    - practice conditional rendering
    - practice auth-like UI branching
    - practice a basic reusable auth guard idea
  */
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ name: '', pass: '' })

  const handleToggleAuth = () => {
    // One boolean is enough to flip large portions of UI.
    setIsLoggedIn((prev) => !prev)
  }

  return (
    <>
      <div className="bg-red-700 p-7 text-5xl text-white">LoginToggle</div>

      {isLoggedIn ? (
        <WelcomeView loginForm={loginForm} />
      ) : (
        <LoginFormView loginForm={loginForm} setLoginForm={setLoginForm} />
      )}

      <div className="text-7xl bg-green-700 text-white">Dashboard</div>
      {/* Wrapper pattern:
          if auth is false, show fallback
          if auth is true, render protected content */}
      <RequireAuth authenticated={isLoggedIn}>
        This is only viewed after the login success and auth is OK
      </RequireAuth>

      <button onClick={handleToggleAuth}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
    </>
  )
}

export default LoginToggle
