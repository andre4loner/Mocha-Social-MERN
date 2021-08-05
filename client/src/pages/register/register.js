
import React, { useRef } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import axios from "axios"
import "./register.css"

import { registerCall } from "../../apiCalls.js"
import { AuthContext}  from "../../context/AuthContext.js"

export default function Register() {
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const passwordConfirm = useRef()

  const history = useHistory()
  // const { user } = useContext(AuthContext)

  const handleClick = async (e)=> {
    e.preventDefault()

    if (passwordConfirm.current.value === password.current.value) {
      // registerCall({
      //   username: username.current.value,
      //   email: email.current.value,
      //   password: password.current.value
      // }, disptach)

      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try {
        await axios.post("/auth/register", user)
        history.push("/login")

      }
      catch (err){
        console.log(err)
      }
    }
    else {
      // passwordConfirm.current.setCustomValidity("Make sure both passwords match")
      alert("Passwords don't match.")
    }
  }

  return (
    <React.Fragment>
      <div className="register-container">
        <div className="register-wrapper">
          <div className="register-top">
            {/* <img src="https://www.pngitem.com/pimgs/b/23-230031_coffee-cup-transparent-png.png" alt="" className="register-logo-img" /> */}
            <h2 className="register-title">Create an account!</h2>
          </div>

          <span className="register-logo-text">Mocha</span>
          <span className="register-logo-text2">Mocha</span>

          <div className="register-bottom">
            <form action="" onSubmit={handleClick} className="register-form">
              <input required placeholder="Username" ref={username} type="text" minLength="3" maxLength="25" className="register-input" />
              <input required placeholder="Email" ref={email} type="email" className="register-input" />
              <input required placeholder="Password" ref={password} type="password" minLength="6" className="register-input" />
              <input required placeholder="Confirm Password" ref={passwordConfirm}  type="password" minLength="6" className="register-input" />
              {/* <span className="forgot-password">
                Forgot password?
              </span> */}
              <button type="submit" className="register-button">Sign up</button>
            </form>
          </div>
            <Link to="/login" className="log-in">
              Log in instead?
            </Link>
        </div>

        <span className="bottom-text">© Mocha 2021. All rights reserved.</span>
      </div>
    </React.Fragment>
  )
}
