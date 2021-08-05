
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext.js"

import "./topbar.css"


export default function Topbar() {
  const { user } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

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

        {/* <div className="topbar-links">
          <div className="topbar-link">Home</div>
          <div className="topbar-link">Timeline</div>
        </div> */}
        
        {/* <div className="topbar-icons">
          <div className="topbar-icon-item">
            <i className="bx bxs-user"></i>
            <div className="topbar-icon-badge">1</div>
          </div>
          <div className="topbar-icon-item">
            <i className="bx bxs-chat"></i>
            <div className="topbar-icon-badge">2</div>
          </div>
          <div className="topbar-icon-item">
            <i className="bx bxs-notification"></i>
            <div className="topbar-icon-badge">1</div>
          </div>
        </div> */}

        <div className="topbar-img">
          <Link to={"/"+user.username}>
            <img src={user.profilePicture ? PF+user.profilePicture : "https://w7.pngwing.com/pngs/223/244/png-transparent-computer-icons-avatar-user-profile-avatar-heroes-rectangle-black.png"} alt="" className="image" />
          </Link>
        </div>
      </div>

    </div>
  )
}


