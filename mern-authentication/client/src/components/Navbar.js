import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';

const Navbar = (props) => {
    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

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
                <Link to="/login">
                    <li className="">Login</li>
                </Link>
                <Link to="/register">
                    <li className="">Register</li>
                </Link>
            </>
        );
    }

    const authenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li className="">Home</li>
                </Link>
                {/* <Link to="/todos">
                    <li className="nav-item nav-link">Todos</li>
                </Link> */}
                {user.role === "admin" ?
                    <Link to="/admin">
                        <li className="">Admin</li>
                    </Link> : null
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
            <div className="" id="navbarText">
                <ul className="">
                    {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
                </ul>
            </div>
        </nav >
    );
}

export default Navbar;
