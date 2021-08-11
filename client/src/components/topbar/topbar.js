
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext.js"
import "./topbar.css"


export default function Topbar() {
  const { user } = useContext(AuthContext)
  const PF_avatar = "/images/avatars/"

  return (
    <div className="topbar-container">

      <div className="topbar-left">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">Mocha</span>
        </Link>
      </div>

      <div className="topbar-center">
        <div className="search-bar">
        <i className="bx bx-search"></i>
        <input placeholder="Search for friends or posts" className="search-input" />
        </div>
      </div>

      <div className="topbar-right">
        <div className="topbar-user">
          <Link to={"/"+user.username} style={{textDecoration:"none", display: "flex", color: "black"}}>
            <div className="post-user-info">
              <span className="username">{user.name}</span>
            </div>
            <img src={PF_avatar+user.profilePicture} alt="Cover Picture" className="image"/>
          </Link>
        </div>
      </div>

    </div>
  )
}


