
import React from 'react'
import "./home.css"
import Topbar from "../../components/topbar/topbar.js"
import Sidebar from "../../components/sidebar/sidebar.js"
import Feed from "../../components/feed/feed.js" 
import Rightbar from "../../components/rightbar/rightbar.js" 




export default function Home() {
  return (
    <React.Fragment>
      <Topbar />
      <div className="home-container">
        <Sidebar />
        <Feed page="home"/>
        {/* <Rightbar /> */}
      </div>
    </React.Fragment>
  )
}
