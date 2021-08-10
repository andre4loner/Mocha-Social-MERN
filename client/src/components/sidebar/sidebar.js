
import React, { useContext} from 'react'
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import { logoutCall } from "../../apiCalls.js"
import { AuthContext } from "../../context/AuthContext.js"
import "./sidebar.css"


export default function Sidebar() {
  const {user, dispatch} = useContext(AuthContext)
  const history = useHistory()

  const signOutHandler = ()=> {
    console.log("Signing out...")
    logoutCall(dispatch)
    history.push("/login")
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        <Link to={"/"} className="link">
          <div className="sidebar-item list-feed-wrapper">
            <i className="fas fa-rss feed"></i>
            <span className="sidebar-list-item-text">Feed</span>
          </div>
        </Link>

        <div className="sidebar-item list-chat-wrapper">
          <i className="fas fa-comments chat"></i>
          <span className="sidebar-list-item-text">Chat</span>
        </div>

        <div className="sidebar-item list-friends-wrapper">
          <i className="fas fa-users friends"></i>
          <span className="sidebar-list-item-text">Friends</span>
        </div>

        <Link to={`/${user.username}`} className="link">
          <div className="sidebar-item list-profile-wrapper">
            <i className="fas fa-user profile"></i>
            <span className="sidebar-list-item-text">Profile</span>
          </div>
        </Link>
        
        <div className="sidebar-item list-sign-out-wrapper" onClick={signOutHandler}>
          <i className="fas fa-sign-out-alt sign-out"></i>
          <span className="sidebar-list-item-text">Sign Out</span>
        </div>
      </div>
    </div>
  )
}
