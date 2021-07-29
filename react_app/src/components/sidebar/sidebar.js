
import React, { useContext} from 'react'
import { Link } from "react-router-dom"
import "./sidebar.css"

import { AuthContext } from "../../context/AuthContext.js"

export default function Sidebar() {
  const { user } = useContext(AuthContext)

  return (
    <div className="sidebar-container">
      <div className="sidebar-wrapper">
        <ul className="sidebar-list">
        <Link to={"/"} className="link">
            <li className="sidebar-item list-feed-wrapper">
              {/* <i className='bx bx-station'></i> */}
              <i className="fas fa-rss feed"></i>
              <span className="sidebar-list-item-text">Feed</span>
            </li>
          </Link>

          <li className="sidebar-item list-chat-wrapper">
            {/* <i className='bx bxs-chat'></i> */}
            <i className="fas fa-comments chat"></i>
            <span className="sidebar-list-item-text">Chat</span>
          </li>

          <li className="sidebar-item list-friends-wrapper">
            {/* <i className='bx bxs-group'></i> */}
            <i className="fas fa-users friends"></i>
            <span className="sidebar-list-item-text">Friends</span>
          </li>

          <Link to={`/${user.username}`} className="link">
            <li className="sidebar-item list-profile-wrapper">
              {/* <i className='bx bxs-user-circle'></i> */}
              <i className="fas fa-user profile"></i>
              <span className="sidebar-list-item-text">Profile</span>
            </li>
          </Link>
        </ul>
        <hr />

        <ul className="friends-list">
          <li className="friend-item">
            <img src="/assets/person/1.jpeg" alt="" className="friend-item-image"/>
            <span className="friend-item-name">John</span>
          </li>

          <li className="friend-item">
            <img src="/assets/person/1.jpeg" alt="" className="friend-item-image"/>
            <span className="friend-item-name">Jaip</span>
          </li>
        
          <li className="friend-item">
            <img src="/assets/person/1.jpeg" alt="" className="friend-item-image"/>
            <span className="friend-item-name">Mlepnos</span></li>

          <li className="friend-item">
          <img src="/assets/person/1.jpeg" alt="" className="friend-item-image"/>
            <span className="friend-item-name">Jake</span>
          </li>

          <li className="friend-item">
          <img src="/assets/person/1.jpeg" alt="" className="friend-item-image"/>
            <span className="friend-item-name">Finn</span>
          </li>
        </ul>

      </div>
    </div>
  )
}
