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
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            console.log("in authcontext line 17...")
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