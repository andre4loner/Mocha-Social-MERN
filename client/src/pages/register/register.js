
import React, { useRef, useContext } from "react"
// import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import axios from "axios"
import { registerCall } from "../../apiCalls.js"
import { AuthContext}  from "../../context/AuthContext.js"
import "./register.css"


export default function Register() {
  const name = useRef()
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordConfirm = useRef()
  const { user, isFetching, error, dispatch } = useContext(AuthContext)

  const handleClick = async (e)=> {
    e.preventDefault()

    const res = axios.get(`/api/users?username=${username.current.value}`)
    if (res.status === 200) {
      alert("User already exists with that username.")
    }
    else {
      if (passwordConfirm.current.value === password.current.value) {
        registerCall({
          name: name.current.value,
          username: username.current.value,
          email: email.current.value,
          password: password.current.value
        }, dispatch)
      }
      else {
        alert("Passwords don't match.")
      }
    }
  }

  return (
    <React.Fragment>
      <div className="register-container">
        <div className="register-wrapper">
          <div className="register-top">
            <h2 className="register-title">Create an account!</h2>
          </div>

          <span className="register-logo-text">Mocha</span>
          <span className="register-logo-text2">Mocha</span>

          <div className="register-bottom">
            <form action="" onSubmit={handleClick} className="register-form">
              <input required placeholder="Name" ref={name} type="text" minLength="3" maxLength="35" className="register-input" />
              <input required placeholder="Username" ref={username} type="text" minLength="3" maxLength="25" className="register-input" />
              <input required placeholder="Email" ref={email} type="email" className="register-input" />
              <input required placeholder="Password" ref={password} type="password" minLength="6" className="register-input" />
              <input required placeholder="Confirm Password" ref={passwordConfirm}  type="password" minLength="6" className="register-input" />
              <button type="submit"  disabled={isFetching} className="register-button">
                {isFetching ? <i class="fas fa-spinner fa-spin"></i> : "Sign up"}
              </button>
            </form>
          </div>
            <Link to="/login" disabled={isFetching} className="log-in">
              {isFetching ? <i class="fas fa-spinner fa-spin"></i> : "Log in instead?"}
            </Link>
        </div>

        <span className="bottom-text">© Mocha 2021. All rights reserved.</span>
      </div>
    </React.Fragment>
  )
}
