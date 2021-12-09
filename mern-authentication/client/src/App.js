import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

function App() {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    console.log("Auth Info from App.js: ", user, isAuthenticated);

    return (
        <Router className="App">
            <Navbar />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
        </Router>
    );
}

export default App;
