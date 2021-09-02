import { createContext, useEffect, useState } from 'react';
import useLocalStorage from '../helpers/useLocalStorage';
import jwt from 'jsonwebtoken';

export const AuthContext = createContext()

export default function AuthProvider({children}) {
   const [userLocal, setUserLocal] = useLocalStorage('cs_user')
   const [user, setUser] = useState(userLocal || null)
   const [modules, setModules] = useState([])
   
   useEffect(() => {
      const getModules = async () => {
         if (user) {
            const { modules: modulesToken } = await jwt.verify(user?.token, process.env.REACT_APP_SECRET_TOKEN)
            console.log('modules', JSON.parse(modulesToken))
            if (modules) {
               setModules([...JSON.parse(modulesToken), 'dashboard', ''])
            } else {
               setModules([])
            }
         }else {
            setModules([])
         }
      }
      getModules()
      setUserLocal(user)
   }, [user])

   const contextValue = {
      user,
      modules,
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