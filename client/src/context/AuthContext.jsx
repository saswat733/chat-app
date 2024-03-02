import { createContext, useContext } from "react";
import { useState } from "react";
export const AuthContext=createContext();

export const useAuthContext=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=({children})=>{
    const [authUser, setauthUser] = useState(JSON.parse(localStorage.getItem("chat-user"))||'')

    return <AuthContext.Provider value={{authUser,setauthUser}}>
        {children}
    </AuthContext.Provider>
}