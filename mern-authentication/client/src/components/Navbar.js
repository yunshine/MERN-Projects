import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import AuthService from '../services/AuthService';

const Navbar = (props) => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li className="">Home</li>
                </Link>
                <Link to="/user/login">
                    <li className="">Login</li>
                </Link>
                <Link to="/user/register">
                    <li className="">Register</li>
                </Link>
            </>
        );
    }

    const authenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li className="">Authenticated Home</li>
                </Link>
                {/* <Link to="/todos">
                    <li className="nav-item nav-link">Todos</li>
                </Link> */}
                {user.role === "admin" ?
                    "admin link goes here..." : null
                    // <Link to="/admin">
                    //     <li className="">Admin</li>
                    // </Link> : null
                }
                <button type="button" className="" onClick={onClickLogoutHandler}>Logout</button>
            </>
        );
    }

    return (
        <nav className="">
            {/* <Link to="/">
                <div className="">Home</div>
            </Link> */}
            <ul className="">
                {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
            </ul>
        </nav >
    );
}

export default Navbar;
