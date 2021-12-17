import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AuthService from '../services/AuthService';
import Message from './Message';
import { AuthContext } from '../contexts/AuthContext';

const LoginForm = (props) => {
    const [userFromInput, setUserFromInput] = useState({ username: '', password: '' });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);
    let navigate = useNavigate();

    const onSubmit = e => {
        e.preventDefault();
        console.log("form submitted...");
        AuthService.login(userFromInput).then(data => {
            console.log("Data from LoginForm.js: ", data);
            // const { isAuthenticated, user, message } = data;
            const { isAuthenticated, user } = data;
            if (isAuthenticated) {
                console.log("Data from Login.js 2...: ", isAuthenticated, user);
                console.log("authContext", authContext);
                authContext.setUser(user);
                // authContext.setIsAuthenticated(isAuthenticated);

                // props.history.push('/todos');
                navigate("/");
                // props.history.push('/');
            } else {
                // console.log("error... ", message);
                // setMessage(message);
                console.log("error... LoginForm.js");
                setMessage("error... LoginForm.js");
            }
        });

    }

    const onChange = e => {
        setUserFromInput({ ...userFromInput, [e.target.name]: e.target.value });
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

            {message ? <Message message={message} /> : null}
        </div>
    );
}

export default LoginForm;