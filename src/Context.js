import React, {createContext, useContext, useState} from 'react';
import Cookies from 'js-cookie';


const AppContext = createContext();

export default function AppWrapper({children}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentMember, setCurrentMember] = useState(null);

    const logout = () => {
        if(Cookies.get('username')) {
            setLoggedIn(false);
            setCurrentUser(null);
            Cookies.remove('username');
            window.localStorage.removeItem("currentId");
            window.localStorage.removeItem("membersData")
            window.localStorage.removeItem("currentMemberId")
        }
    };

    const login = () => {
        if(Cookies.get('username')) {
            setLoggedIn(true);
        }
    }

    let sharedState = {
        loggedIn: loggedIn,
        setLoggedIn: value => setLoggedIn(value),
        currentUser: currentUser,
        setCurrentUser: value => setCurrentUser(value),
        logout: () => logout(),
        login: () => login(),
        currentMember: currentMember,
        setCurrentMember: value => setCurrentMember(value)
    };

    return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
}

export function useAppContext() {
    return useContext(AppContext)
}