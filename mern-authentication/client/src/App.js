import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    console.log("Auth Info from App.js: ", user, isAuthenticated);

    return (
        <Router className="App">
            <Navbar />
            <header className="App-header">
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </Router>
    );
}

export default App;
