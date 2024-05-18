import {  createContext, useContext, useState } from "react";

const UserContext = createContext()

export const UserProvider = (props) => {
    const [user,setUser] = useState(false)
    return (
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = ()=>useContext(UserContext)