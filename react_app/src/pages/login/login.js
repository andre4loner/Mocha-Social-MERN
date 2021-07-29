
import React, { useRef, useContext } from 'react'
import { Link } from "react-router-dom"
import "./login.css"

import { loginCall } from "../../apiCalls.js"
import { AuthContext } from "../../context/AuthContext.js"


export default function Login() {
  const username = useRef()
  const password = useRef()

  const {user, isFetching, error, dispatch} = useContext(AuthContext)

  const handleClick = (e)=> {
    e.preventDefault()
    loginCall({
      username: username.current.value,
      password: password.current.value
    }, dispatch)
  }
  console.log(user)

  return (
    <React.Fragment>
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-top">
            {/* <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/83119344715627.581b74f97d651.jpeg" alt="" className="login-logo-img" /> */}
            <h2 className="login-title">Log in to your account!</h2>
          </div>
          
          <span className="login-logo-text">Mocha</span>
          <span className="login-logo-text2">Mocha</span>

          <div className="login-bottom">
            <form action="" onSubmit={handleClick} className="login-form">
              <input required placeholder="Username" type="text" ref={username}className="login-input" />
              <input required placeholder="Password"  type="password" minLength="6" ref={password}className="login-input" />
              {/* <span className="forgot-password">
                Forgot password?
              </span> */}
              <button onClick={handleClick} className="login-button" disabled={isFetching}>{isFetching ? <i class="fas fa-spinner fa-spin"></i> : "Login"}</button>
            </form>
          </div>
            <Link to="/register" disabled={isFetching} className="create-account">
            {isFetching ? <i class="fas fa-spinner fa-spin"></i> : "Sign up instead?"}
            </Link>
        </div>
        
        <span className="bottom-text">© Mocha 2021. All rights reserved.</span>
      </div>
    </React.Fragment>
  )
}
