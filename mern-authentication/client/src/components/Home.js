import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    console.log("User data from home component: ", user, isAuthenticated);

    return (
        <div className="Home">
            <h1>This is the home component...</h1>
            {isAuthenticated ? <h2>the user is {user.username} - role: {user.role}</h2> : null}
            <Link to='/test'>TEST PAGE</Link>
        </div>
    );
}

export default Home;