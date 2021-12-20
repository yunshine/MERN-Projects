import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

// eslint-disable-next-line import/no-anonymous-default-export
// export default ({ children }) => {
const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        console.log("useEffecting in AuthContext.js...");
        AuthService.isAuthenticated().then(data => {
            console.log("in AuthContext line 15. data: ", data);
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            console.log("in AuthContext line 18. isAuthenticated? ", isAuthenticated);
            // setIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {/* {!isLoaded ? <h1>Loading...</h1> : */}
            <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                {children}
            </AuthContext.Provider>
            {/* } */}
        </div>
    )
}

export default AuthContextProvider;