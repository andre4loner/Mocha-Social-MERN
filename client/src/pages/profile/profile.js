
import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import "./profile.css"
import Topbar from "../../components/topbar/topbar.js"
import Sidebar from "../../components/sidebar/sidebar.js"
import Feed from "../../components/feed/feed.js"
import Share from "../../components/share/share.js"


export default function Profile() {
  const { user: currentUser } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [postsNo, setPostsNo] = useState(null)
  const [followers, setFollowers] = useState(null)
  const [following, setFollowing] = useState(null)
  const [isFollowing, setIsFollowing] = useState()
  const [state, setState] = useState(0.01)
  const params = useParams()
  // console.log(params)
  const PF_avatar = process.env.REACT_PUBLIC_FOLDER + "avatars/"
  const PF_cover = process.env.REACT_PUBLIC_FOLDER + "covers/"

  useEffect(()=> {
    const fetchUser = async ()=> {
      try {
        const res = await axios.get(`api/users?username=${params.user}`)
        setUser(res.data)
        setFollowers(res.data.followers.length)
        setFollowing(res.data.following.length)
        res.data.followers.includes(currentUser._id)
          ?
            setIsFollowing(true)
          :
            setIsFollowing(false)
      }
      catch(err) {
        console.log("Could not fetch user data")
      }
    }
    const fetchPosts = async ()=> {
      try {
        const res = await axios.get(`api/posts/profile/${params.user}`)
        setPostsNo(res.data.length)
      }
      catch(err) {
        console.log("Could not fetch posts data")
      }
    }
    fetchUser()
    fetchPosts()
  }, [params.user, state])

  const followHandler = async ()=> {
    try {
      if (user.followers.includes(currentUser._id)) {
        const res = await axios.put(`api/users/unfollow/${user._id}`, {
          userID: currentUser._id
        })
        setState(state + 0.01)
      }
      else{
        const res = await axios.put(`api/users/follow/${user._id}`, {
          userID: currentUser._id
        })
        setState(state + 0.01)
      }
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <React.Fragment>
      <Topbar />

      <div className="profile-container">
        <Sidebar />
        {
          user._id === currentUser._id
            ?
              <Share page="profile"/>
            : ""
        }
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-background">
              <img src={PF_cover+user.coverPicture} alt="" className="background-img" />
              <img src={PF_avatar+user.profilePicture} alt="" className="profile-photo" />
            </div>

            <div className="profile-info">
              <h2 className="profile-name">{user.name}</h2>

              <span className="profile-username">
                @{user.username}
              </span>

              <span className="profile-desc">
              {user.bio || "No bio"}
              </span>

              <div className="metrics">
                <div className="metric-item">
                  <span className="metric-header">Posts:</span>
                  <span className="metric-info">{postsNo}</span>
                </div>
                {/* <div className="metric-item">
                  <span className="metric-header">Friends:</span>
                  <span className="metric-info">12</span>
                </div> */}
                <div className="metric-item">
                  <span className="metric-header">Following:</span>
                  <span className="metric-info">{following}</span>
                </div>
                <div className="metric-item">
                  <span className="metric-header">Followers:</span>
                  <span className="metric-info">{followers}</span>
                </div>
              </div>
              
              {
                user._id !== currentUser._id
                  ?
                    <span onClick={followHandler} className="profile-follow follow">{
                        isFollowing
                          ? 
                            "•\r \r Unfollow"
                          :
                            "•\r \r Follow"
                    }</span>
                  :
                    ""
              }
            </div>
          </div>

          <div className="profile-right-bottom">
            <Feed username={params.user} page="profile" profileUserID={user._id}/>
          </div>  
        </div>
      </div>
    </React.Fragment>
  )
}
