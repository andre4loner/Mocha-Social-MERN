
import axios from "axios"

export const loginCall = async (userCred, dispatch)=> {
  dispatch({
    type: "LOGIN_START"
  })

  try {
    const res = await axios.post("api/auth/login", userCred)
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data
    })
  }
  catch (err) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: err
    })
  }
}


export const registerCall = async (userCred, dispatch)=> {
  dispatch({
    type: "REGISTER_START"
  })

  try {
    const res = await axios.post("api/auth/register", userCred)
    dispatch({
      type: "REGISTER_SUCCESS",
      payload: res.data
    })
  }
  catch (err) {
    dispatch({
      type: "REGISTER_FAILURE",
      payload: err
    })
  }
}


export const logoutCall = (dispatch)=> {
  dispatch({
    type: "LOGOUT"
  })
}