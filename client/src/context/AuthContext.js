
import { createContext, useReducer, useEffect } from "react"
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false
}


export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({children})=> {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE, ()=> {
    const localUser = localStorage.getItem("user")
    return localUser ? {
      user: JSON.parse(localUser),
      isFetching: false,
      error: false
    } : INITIAL_STATE
  })

  useEffect(()=> {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

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


// user: {
//   "_id":"60e4ad715b8fa843c86be7fa",
//   "profilePicture":"avatars/4-avi.png",
//   "coverPicture":"covers/2-cover.jpg",
//   "following":["60e4ae7a5b8fa843c86be7fc"],
//   "followers":[],
//   "isAdmin":false,
//   "username":"test",
//   "name": "Test Account",
//   "email":"test@gmail.com","password":"$2b$10$MaV1LBlIMZj.L/jlNOrSR.xol.1p7JQL780dB8Ayq0XD/.WiHGiV.",
//   "createdAt":{"$date":{"$numberLong":"1625599345951"}},
//   "updatedAt":{"$date":{"$numberLong":"1625668385883"}},
//   "__v":{"$numberInt":"0"},
//   "bio":"this is the bio for test"
// },