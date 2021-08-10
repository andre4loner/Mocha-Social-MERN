
import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import { AuthContext } from "./context/AuthContext"

import Home from "./pages/home/home.js" 
import Profile from "./pages/profile/profile.js"
import Login from "./pages/login/login.js"
import Register from "./pages/register/register.js"


export default function App() {
  const { user } = useContext(AuthContext)

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user ? <Home /> : <Login />}
        </Route>
        <Route path="/register">
          { user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/login">
          { user ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/:user">
          { user ? <Profile /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </Router>
  )
}
