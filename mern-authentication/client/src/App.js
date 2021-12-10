import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
    // const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    // console.log("Auth Info from App.js: ", user, isAuthenticated);

    return (
        <div className="App">
            {/* <Navbar /> */}
            <BrowserRouter>
                <Routes>
                    {/* <AuthContextProvider> */}
                    <Route path='/' element={<Home />} />
                    <Route exact path='/register' element={<Register />} />
                    <Route exact path='/login' element={<Login />} />
                    {/* </AuthContextProvider> */}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
