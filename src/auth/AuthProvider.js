import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../helpers/useLocalStorage';
import axios from '../helpers/interceptor'

export const AuthContext = createContext()

export default function AuthProvider({children}) {
   const [userLocal, setUserLocal] = useLocalStorage('cs_user')
   const [user, setUser] = useState(userLocal || null)
   
   useEffect(() => {
      setUserLocal(user)
      axios.defaults.headers.common.Authorization = `Bearer ${user?.token}`
   }, [user])

   const contextValue = {
      user,
      login(data) {
         setUser(data)
      },
      logout() {
         setUser(null)
         window.location.href = `${window.location.origin.toString()}/login`
      },
      isLogged() {
         return !!user
      }
   }

   return (
      <AuthContext.Provider value={contextValue}>
         {children}
      </AuthContext.Provider>
   )
}