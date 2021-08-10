
import React, { useState } from "react"
import "./home.css"
import Topbar from "../../components/topbar/topbar.js"
import Sidebar from "../../components/sidebar/sidebar.js"
import Feed from "../../components/feed/feed.js"
import Share from "../../components/share/share.js"


export default function Home() {

  return (
    <React.Fragment>
      <Topbar />
      <div className="home-container">
        <Sidebar />
        <div className="feed-super-container">
          <Feed page="home"/>
        </div>
        <Share page="home"/>
      </div>
    </React.Fragment>
  )
}
