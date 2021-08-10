
import { React, useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { format } from "timeago.js"
import "./post.css"


export default function Post({post, page, stateChanger, parentState}) {

  const { user: currentUser } = useContext(AuthContext)
  const [user, setUser] = useState({})
  const [likes, setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const [date, setDate] = useState(null)
  const [postMenuStatus, setPostMenuStatus] = useState("")
  const [isFollowing, setIsFollowing] = useState()
  const [isDeleting, setIsDeleting] = useState(false)
  const PF_avatar = process.env.PUBLIC_ASSETS + "/avatars/"
  const PF_post = process.env.PUBLIC_ASSETS + "/post/"

  useEffect(()=> {
    setIsLiked(post.likes.includes(currentUser._id))
    setDate(format(post.createdAt))
  }, [currentUser._id, post.likes])

  useEffect(()=> {
    const fetchUser = async ()=> {
      try {
        const res = await axios.get(`api/users?userID=${post.userID}`)
        setUser(res.data)
        res.data.followers.includes(currentUser._id)
          ?
            setIsFollowing(true)
          :
            setIsFollowing(false)
      }
      catch(err) {
        console.log(err)
      }
    }
    fetchUser()
  }, [post.userID, parentState])

  const postMenuHandler = ()=> {
    setPostMenuStatus("active")
  }
  const menuCloseHandler = ()=> {
    setPostMenuStatus("")
  }

  const likeHandler = async ()=> {
    try {
      await axios.put(`api/posts/like/${post._id}`, {
        userID: currentUser._id
      })
    }
    catch(err) {
      console.log(err)
    }
    setLikes(isLiked ? likes-1 : likes+1)
    setIsLiked(isLiked ? false : true)
  }

  const followHandler = async ()=> {
    try {
      if (user.followers.includes(currentUser._id)) {
        await axios.put(`api/users/unfollow/${user._id}`, {
          userID: currentUser._id
        })
      }
      else{
        await axios.put(`api/users/follow/${user._id}`, {
          userID: currentUser._id
        })
      }
      stateChanger(parentState + 0.01)
    }
    catch(err) {
      console.log(err)
    }
  }

  const deletePostHandler = async ()=> {
    menuCloseHandler()
    const data = {
      userID: currentUser._id,
      img: post.img
    }
    try {
      setIsDeleting(true)
      // deleting file data from database
      await axios.delete(`api/posts/delete/${post._id}`, { data: data})
      // deleting actual file
      if (post.img !== "") {
        await axios.delete(`api/delete`, { data: data})
      }
      stateChanger(parentState + 0.01)
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="post-container">
      <div className={`post-wrapper ${post.img ? "with-img" : "without-img"}`}>
        
        <div className="post-top">
          <div className="post-top-left">
            <Link to={`/${user.username}`} style={{textDecoration:"none", display: "flex", color: "black"}}>
              <img src={PF_avatar+user.profilePicture} alt="" className="post-profile-img" />
              <div className="post-user-info">
                <span className="post-user-name">{user.name}</span>
                <span className="post-user-username">@{user.username}</span>
              </div>
            </Link>
            {
              page === "profile"
                ?  ""
                :
                  post.userID !== currentUser._id
                    ?
                      <span onClick={followHandler} className="follow">{
                          isFollowing
                            ? 
                              "•\r \r Unfollow"
                            :
                              "•\r \r Follow"
                      }</span>
                    : ""
            }
          </div>
          <div className="post-top-right">
            {
              post.userID === currentUser._id
                ?
                  <i onClick={postMenuHandler} className="fas fa-ellipsis-h"></i>
                : ""
            }
          </div>
        </div>

        <div className="post-center">
          {
            post.img
              ?
                <img src={PF_post+post.img} alt="" className="post-img" />
              : ""
          }
          <span className={`post-text ${post.img ? "text-with-image" : "text-without-image"}`}>
            {post.desc}
          </span>
        </div>

        <div className="post-bottom">
          <div className="post-bottom-left">
            {/* <span className="post-comment-text">{post.comments.length} comments</span> */
            <span className="post-date">{date}</span>}
          </div>

          <div className="post-bottom-right">
            <i className={isLiked ? "fas fa-heart liked" : "fas fa-heart"} onClick={likeHandler}></i>
            <span className="post-like-count">{likes}</span>
          </div>
        </div>

        <div className={`post-menu-wrapper ${postMenuStatus}`}>
          <div className="post-menu">
            <div onClick={menuCloseHandler} className="menu-option">
              <i class="fas fa-times"></i>
            </div>
            {/* <div className="menu-option">
              Edit
            </div> */}
            <div onClick={deletePostHandler} className="menu-option">
              Delete
            </div>
          </div>
        </div>

        <div className={`overlay ${postMenuStatus}`}></div>

        {
          isDeleting 
            ?
              <div className="post-loading-screen-wrapper">
                <div className="post-loading-screen">
                </div>
                <i class="fas fa-spinner fa-spin"></i>
              </div>
            : ""
        }
      </div>

    </div>
  )
}
