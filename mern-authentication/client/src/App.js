// import { useContext } from 'react';
// import {AuthContext} from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AuthContextProvider from './contexts/AuthContext';

function App() {
    // const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    // console.log("Auth Info from App.js: ", user, isAuthenticated);

    return (
        <div className="App">
            <BrowserRouter>
                <AuthContextProvider>

                    <Navbar />
                    <Routes>
                        {/* <AuthContextProvider> */}
                        <Route path='/' element={<Home />} />
                        <Route exact path='/user/register' element={<Register />} />
                        <Route exact path='/user/login' element={<Login />} />
                        <Route path='/navbartest' element={<Navbar />} />
                        {/* </AuthContextProvider> */}
                    </Routes>
                </AuthContextProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
