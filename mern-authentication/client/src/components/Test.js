import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Test = () => {
    const { user, isAuthenticated } = useContext(AuthContext);
    console.log("user from test page: ", user, isAuthenticated);

    return (
        <div className="test">
            {isAuthenticated ? <h1>there is a user on the test page...</h1> : <h1>there is no user here on this test page...</h1>}
        </div>
    );
}

export default Test;