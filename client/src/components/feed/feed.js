
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import "./feed.css"
import Share from "../share/share.js"
import Post from "../post/post.js"

import { AuthContext } from "../../context/AuthContext.js"


export default function Feed({username, page}) {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [isFetchingPosts, setIsFetchingPosts] = useState(true)
  const [state, setState] = useState(0.01)
  const [newPostIconPlus, setNewPostIconPlus] = useState(true)

  useEffect(()=> {
    const fetchPosts = async ()=> {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get(`/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1, p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
      setIsFetchingPosts(false)
    }
    fetchPosts()
  }, [username, user._id, state])

  const showPostshandler = ()=> {
    if (newPostIconPlus) {
      setNewPostIconPlus(false)

      document.getElementsByClassName("share-container")[0].style.transform = "translate(-50%) scale(1)"
      document.getElementsByClassName("share-background")[0].style.display = "flex"
      document.getElementsByClassName("new-post")[0].style.background = "red"
      document.getElementsByClassName("posts-container")[0].style.filter = "blur(5px)"
    }
    else {
      setNewPostIconPlus(true)

      document.getElementsByClassName("share-container")[0].style.transform = "translate(-50%) scale(0)"
      document.getElementsByClassName("share-background")[0].style.display = "none"
      document.getElementsByClassName("new-post")[0].style.background = "darkblue"
      document.getElementsByClassName("posts-container")[0].style.filter = "blur(0px)"
    }
  }

  return (
    <div className="feed-container">
      <div className="feed-wrapper">

        <div className="share-background">
          <Share/>
        </div>

        <div className="posts-container">
          {posts.map((post)=> {
            return <Post key={post._id} post={post} page = {page} stateChanger={setState} parentState={state}/>
          })}
        </div>

        {
          isFetchingPosts
          ? ""
          : <div onClick={showPostshandler}       className="new-post">
              <i class={`fas ${newPostIconPlus ? "fa-plus" : "fa-times"}`}></i> 
          </div>
        }

      </div>
      {
        isFetchingPosts
        ? <i class="posts-loading fas fa-spinner fa-spin"></i>
        : ""
      }
    </div>
  )
}
