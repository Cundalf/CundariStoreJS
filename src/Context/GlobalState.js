import React, { useState } from "react";
import CundariContext from "./CundariContext"

function GlobalState({ children }) {
    const [userLogin, setUserLogin] = useState(localStorage.getItem("login"));
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem("user")));
    const [userID, setUserID] = useState(localStorage.getItem("id"));
    
    const loginUser = (id, user) => {
        setUserInfo(user);
        localStorage.setItem("user", JSON.stringify(user));
        
        setUserID(id);
        localStorage.setItem("id", id);
        
        setUserLogin(true);
        localStorage.setItem("login", true);
    }
    
    
    const logoutUser = () => {
        setUserLogin(false);
        setUserInfo(null);
        setUserID(null);
        
        localStorage.removeItem("login");
        localStorage.removeItem("user");
        localStorage.removeItem("id");
    }

    return (
        <CundariContext.Provider
            value={{
                userLogin,
                loginUser,
                logoutUser,
                userInfo,
                userID
            }}
        >
            {children}
        </CundariContext.Provider>
    )
}
export default GlobalState