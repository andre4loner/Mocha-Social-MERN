
import React, { useContext, useState, useRef } from "react"
import { AuthContext } from "../../context/AuthContext.js"
import axios from "axios"
import "./share.css"


export default function Share({page, parentState, stateChanger}) {
  const { user } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [newPostIconPlus, setNewPostIconPlus] = useState(true)
  const [isPosting, setIsPosting] = useState(false)

  const desc = useRef()

  const showShareHandler = ()=> {
    if (newPostIconPlus) {
      setNewPostIconPlus(false)
      document.getElementsByClassName("share-container")[0].style.transform = "scale(1)"
      document.getElementsByClassName("share-container")[0].style.webkitTransform = "scale(1)"
      document.getElementsByClassName("new-post")[0].style.background = "red"
      document.getElementsByClassName("sidebar-container")[0].style.filter = "blur(5px)"
      if (page === "home") {
        document.getElementsByClassName("feed-super-container")[0].style.filter = "blur(5px)"
      } else {
        document.getElementsByClassName("profile-right")[0].style.filter = "blur(5px)"
      }
    }
    else {
      setNewPostIconPlus(true)
      setFile(null)
      document.getElementsByClassName("share-container")[0].style.transform = "scale(0)"
      document.getElementsByClassName("share-container")[0].style.webkitTransform = "scale(0)"
      document.getElementsByClassName("new-post")[0].style.background = "darkblue"
      document.getElementsByClassName("sidebar-container")[0].style.filter = "blur(0px)"
      if (page === "home") {
        document.getElementsByClassName("feed-super-container")[0].style.filter = "blur(0px)"
      } else {
        document.getElementsByClassName("profile-right")[0].style.filter = "blur(0px)"
      }
    }
  }

  const closeImgHandler = ()=> {
    setFile(null)
  }

  const handleShare = async (e)=> {
    e.preventDefault()
    setIsPosting(true)

    const post = {
      userID: user._id,
      desc: desc.current.value,
      img: ""
    }

    if (file) {
      let data = new FormData()
      data.append("file", file)
      try {
        const res = await axios.post("api/posts/image/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        if (res.status === 200) {
          try {
            post.img = res.data
            await axios.post("api/posts/create", post)
          }
          catch(err) {
            console.log(err)
          }
        }
      }
      catch(err) {
        console.log(err)
      }
    } else {
      try {
        await axios.post("api/posts/create", post)
      }
      catch(err) {
        console.log(err)
      }
    }
    stateChanger(parentState + 0.01)
  }

  return (
    <React.Fragment>
      <div className="share-container">
        <div className="share-wrapper">
          <div className="share-top">
            <textarea ref={desc} placeholder="Say something magic..." maxLength="180" className="share-input" />
          </div>
          
          {
            file && (
              <div className="share-image-container">
                <img src={URL.createObjectURL(file)} alt="Image to upload" className="share-img"/>
                <i onClick={closeImgHandler} class="close-image fas fa-times"></i>
              </div>
            )
          }

          <form className="share-bottom" id="share-form" enctype="multipart/form-data" action="">
            <div className="share-options">
              <label htmlFor="file" disabled={isPosting} className="share-option share-button">
                <i className='bx bxs-image-add'></i>
                <span className="share-option-text">Photo/Video</span>
                <input style={{display: "none"}} type="file" name="file" id="file" accept=".png, .jpg, .jpeg, .bmp, .gif" onChange={(e)=> setFile(e.target.files[0])}/>
              </label>
            </div>

            <button onClick={handleShare} disabled={isPosting} className="share-button">
              {isPosting ? <i class="fas fa-spinner fa-spin"></i> : "Post"}
            </button>
          </form>
        </div>
      </div>

      <div onClick={showShareHandler}       className="new-post">
        <i class={`fas ${newPostIconPlus ? "fa-plus" : "fa-times"}`}></i> 
      </div>
    </React.Fragment>
  )
}
