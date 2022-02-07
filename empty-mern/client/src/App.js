import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
    return (
        <div className="App">
            <h1>Welcome! This is an empty app!</h1>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<PrivateRoute><PrivateScreen /></PrivateRoute>} /> */}
                    <Route path="/home" element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
