import { useState, useRef, useEffect } from 'react';
import AuthService from '../services/AuthService';
import Message from './Message';

const RegisterForm = (props) => {
    const [user, setUser] = useState({ username: '', password: '', role: '' });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        };
    }, []);

    const resetForm = () => {
        console.log("resetForm function called...");
        setUser({ username: "", pasword: "", role: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        console.log("form submitted...");
        AuthService.register(user).then(data => {
            console.log("Data from Register.js: ", data);
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000);
            }
        });
    }

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log("from onChange: ", user);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>
                <label htmlFor="username" className="">Username: </label>
                <input type="text"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    className=""
                    placeholder="Enter Username" />
                <label htmlFor="password" className="">Password: </label>
                <input type="password"
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    className=""
                    placeholder="Enter Password" />
                <label htmlFor="role" className="">Role: </label>
                <input type="text"
                    name="role"
                    value={user.role}
                    onChange={onChange}
                    className=""
                    placeholder="Enter Role (admin/user)" />
                <button className="" type="submit">Register</button>
            </form>

            {message ? <Message message={message} /> : null}
        </div>
    );
}

export default RegisterForm;