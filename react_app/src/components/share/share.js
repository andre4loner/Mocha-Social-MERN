
import React, { useContext, useState, useEffect, useRef } from "react"
import { AuthContext } from "../../context/AuthContext.js"
import axios from "axios"
import "./share.css"

export default function Share() {
  const { user } = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const desc = useRef()

  const handleShare = async (e)=> {
    e.preventDefault()
    try {
      const post = {
        userID: user._id,
        desc: desc.current.value,
        img: ""
      }
      await axios.post("/posts/create", post)
    }
    catch(err) {
      console.log(err)
    }
    document.getElementById("share-form").submit()
  }

  return (
    <div className="share-container">
      <div className="share-wrapper">
        <div className="share-top">
          {/* <img src="/assets/person/9.jpeg" alt="" className="share-profile-img" /> */}
          <textarea ref={desc} placeholder="Say something magic..." maxLength="180" className="share-input" />
        </div>
        {/* <hr className="share-hr" /> */}

        <form className="share-bottom" id="share-form">
          <div className="share-options">

            <label htmlFor="file" className="share-option share-button">
              <i className='bx bxs-image-add'></i>
              <span className="share-option-text">Photo/Video</span>
              <input style={{display: "none"}} type="file" id="file" accept=".png, .jpg, .jpeg" onChange={(e)=> setFile(e.target.files[0])}/>
            </label>

            {/* <div className="share-option share-button">
              <i class="fas fa-map-marker-alt"></i>
              <span className="share-option-text">Location</span>
            </div> */}

          </div>
          <button onClick={handleShare} className="share-button">Share</button>
        </form>
      </div>
    </div>
  )
}
