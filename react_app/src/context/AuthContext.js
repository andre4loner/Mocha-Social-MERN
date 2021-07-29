
import { createContext, useReducer } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  user: {
    "_id":"60e4ad715b8fa843c86be7fa",
    "profilePicture":"person/2.jpeg",
    "coverPicture":"post/6.jpeg",
    "following":["60e4ae7a5b8fa843c86be7fc"],
    "followers":[],
    "isAdmin":false,
    "from":{"city":"", 
    "country":""},
    "username":"test",
    "email":"test@gmail.com","password":"$2b$10$MaV1LBlIMZj.L/jlNOrSR.xol.1p7JQL780dB8Ayq0XD/.WiHGiV.",
    "createdAt":{"$date":{"$numberLong":"1625599345951"}},
    "updatedAt":{"$date":{"$numberLong":"1625668385883"}},
    "__v":{"$numberInt":"0"},
    "desc":"this is the bio for test"
},
  isFetching: false,
  error: false
}




export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=> {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  return (
    <AuthContext.Provider value={{
      user: state.user,
      isFetching: state.isFetching,
      error: state.error,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
}