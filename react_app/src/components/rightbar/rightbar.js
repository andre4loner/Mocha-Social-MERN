
import React from 'react'
import "./rightbar.css"
import { Users } from "../../dummy.js"


export default function Rightbar({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const HomeRightbar = ()=> {
    return (
      <React.Fragment>
        <div className="birthday-container">
          <img src={`${PF}gift.png`} alt="" className="birthday-img" />
          <span className="birthday-text">
            <b>2 of your friends</b> have birthdays today
          </span>
        </div>

        <div className="rightbar-ad">
          <img src={`${PF}ad.png`} alt="" className="rightbar-ad-img" />
        </div>


        <div className="rightbar-online-text">
          <h4 className="rightbar-online-header">Online</h4>

          <ul className="rightbar-friend-list">
            {Users.map((user)=> {
              return (
                <li className="rightbar-friend">
                <div className="rightbar-friend-img-wrapper">
                  <img src={PF+user.profilePicture} alt="" className="rightbar-friend-img" />
                  <div className="rightbar-online"></div>
                </div>
                <span className="rightbar-friend-name">
                {user.username} 
                </span>
              </li>
              )
            })}
            
          </ul>

        </div>
      </React.Fragment>
    )
  }

  const ProfileRightbar = ()=> {
    return (
      <React.Fragment>
        <h4 className="user-info-title">
          User information
        </h4>
        <div className="user-info-body">
          <div className="user-info-item">
            <span className="info-item-key">City:</span>
            <span className="info-item-value"> {user.city}</span>
          </div>

          <div className="user-info-item">
            <span className="info-item-key">Country:</span>
            <span className="info-item-value"> {user.country}</span>
          </div>

        </div>
      </React.Fragment>
    )
  }

  return (
    <div className="rightbar-container">
      <div className="rightbar-wrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
