
export const LoginStart = (userCred)=> {(
  {
    type: "LOGIN_START"
  }
)}

export const LoginSuccess = (user)=> {(
  {
    type: "LOGIN_SUCCESS",
    payload: user
  }
)}

export const LoginFailure = (error)=> {(
  {
    type: "LOGIN_FAILURE",
    payload: error
  }
)}


export const registerStart = (userCred)=> {(
  {
    type: "REGISTER_START"
  }
)}

export const registerSuccess = (user)=> {(
  {
    type: "REGISTER_SUCCESS",
    payload: user
  }
)}

export const registerFailure = (error)=> {(
  {
    type: "REGISTER_FAILURE",
    payload: error
  }
)}


export const logout = ()=> {(
  {
    type: "LOGOUT"
  }
)}
