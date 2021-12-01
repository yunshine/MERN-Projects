import { useState, useContext } from 'react';
import AuthService from '../services/AuthService';
// import Message from './Message';
import { AuthContext } from '../contexts/AuthContext';

const Login = (props) => {
    const [user, setUser] = useState({ username: '', password: '' });
    // const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const onSubmit = e => {
        e.preventDefault();
        console.log("form submitted...");
        AuthService.login(user).then(data => {
            console.log("Data from LoginForm.js: ", data);
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                // props.history.push('/todos');
                props.history.push('/');
            } else {
                console.log("error... ", message);
                // setMessage(message);
            }
        });

    }

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log("from onChange in LoginForm.js: ", user);
    }

    return (
        <div className="LoginForm">
            <form onSubmit={onSubmit}>
                <h3>Please Sign In</h3>
                <label htmlFor="username" className="">Username: </label>
                <input type="text"
                    name="username"
                    onChange={onChange}
                    className=""
                    placeholder="Enter Username" />
                <label htmlFor="password" className="">Password: </label>
                <input type="password"
                    name="password"
                    onChange={onChange}
                    className=""
                    placeholder="Enter Password" />
                <button className="" type="submit">Log In</button>
            </form>

            {/* {message ? <Message message={message} /> : null} */}
        </div>
    );
}

export default Login;