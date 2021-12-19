import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    console.log("User data from home component: ", user, isAuthenticated);
    return (
        <div className="Home">
            <h1>This is the home component...</h1>
            {user ? <h2>the user is {user.username}</h2> : null}
        </div>
    );
}

export default Home;