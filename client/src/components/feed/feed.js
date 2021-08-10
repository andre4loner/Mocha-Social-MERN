
import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/AuthContext.js"
import axios from "axios"
import "./feed.css"
import Post from "../post/post.js"


export default function Feed({username, page, profileUserID}) {
  const { user } = useContext(AuthContext)
  const [posts, setPosts] = useState([])
  const [isFetchingPosts, setIsFetchingPosts] = useState(true)
  const [state, setState] = useState(0.01)
  
  
  useEffect(()=> {
    const fetchPosts = async ()=> {
      const res = username
      ? await axios.get(`api/posts/profile/${username}`)
      : await axios.get(`api/posts/timeline/${user._id}`)
      setPosts(res.data.sort((p1, p2)=> {
        return new Date(p2.createdAt) - new Date(p1.createdAt)
      }))
      setIsFetchingPosts(false)
    }
    fetchPosts()
  }, [username, user._id, state])

  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <div className="posts-container">
          {posts.map((post)=> {
            return <Post key={post._id} post={post} page = {page} stateChanger={setState} parentState={state}/>
          })}
        </div>
      </div>
      {
        isFetchingPosts
          ?
            <span class="pulse"></span>
          :
            <React.Fragment>
              {
                posts.length === 0
                  ?
                    page === "home"
                      ? 
                        <span className="no-posts">
                          Follow users to see posts!
                        </span>
                      :
                        profileUserID === user._id
                          ?
                            <span className="no-posts">
                              You have no posts yet!
                            </span>
                          :
                            <span className="no-posts">
                              User has no posts!
                            </span>
                  : ""
              }
            </React.Fragment>
      }
    </div>
  )
}
