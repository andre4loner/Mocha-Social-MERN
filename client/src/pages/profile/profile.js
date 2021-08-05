
import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import axios from "axios"
import "./profile.css"
import Topbar from "../../components/topbar/topbar.js"
import Sidebar from "../../components/sidebar/sidebar.js"
import Feed from "../../components/feed/feed.js" 
import Rightbar from "../../components/rightbar/rightbar.js" 




export default function Profile() {
  const [user, setUser] = useState({})
  const params = useParams()
  console.log(params)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=> {
    const fetchUser = async ()=> {
      try {
        const res = await axios.get(`/users?username=${params.user}`)
        setUser(res.data)
        
      }
      catch(err) {
        console.log("Could not fetch data")
      }
    }
    fetchUser()
  }, [params.user])

  return (
    <React.Fragment>
      <Topbar />

      <div className="profile-container">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-background">
              <img src={PF+user.coverPicture || PF+"person/1.jpeg"} alt="" className="background-img" />
              <img src={PF+user.profilePicture} alt="" className="profile-photo" />
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{user.username}</h2>
              <span className="profile-username">
                @{user.username}
              </span>
              <span className="profile-desc">
                {user.bio}
              </span>
              <div className="metrics">
                <div className="metric-item">
                  <span className="metric-header">Posts:</span>
                  <span className="metric-info">3</span>
                </div>
                <div className="metric-item">
                  <span className="metric-header">Friends:</span>
                  <span className="metric-info">12</span>
                </div>
                <div className="metric-item">
                  <span className="metric-header">Following:</span>
                  <span className="metric-info">25</span>
                </div>
                <div className="metric-item">
                  <span className="metric-header">Followers:</span>
                  <span className="metric-info">200</span>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-right-bottom">
            <Feed username={params.user} page="profile"/>
            {/* <Rightbar user={user}/> */}
          </div>  
        </div>
      </div>
    </React.Fragment>
  )
}
