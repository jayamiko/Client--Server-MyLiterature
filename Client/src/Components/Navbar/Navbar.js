// Import React
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../Context/AuthContextProvider'

// Import Style
import './Navbar.css'
import Icon from '../../Images/icon-sm.png'

export default function Navbar() {

    let history = useHistory();
    const { pathname } = useLocation();
    const split = pathname.split("/");
    const { stateAuth, dispatch } = useContext(AuthContext);

    const logoutHandle = (e) => {
        e.preventDefault();
        dispatch({
            type: "LOGOUT",
            isLogin: false,
            user: {
                email: "",
                password: "",
            },
        });
        history.push('/')
    };

    return (
        <div className="navbar">
            <Link to='/home'>
                <div className='iconNavbar'>
                    <img src={Icon} alt='icon-literature' />
                </div>
            </Link>
            <div className="menu">
                <Link to="/profile"
                    style={{ textDecoration: "none" }}
                >
                    <span>
                        <a href="/profile"
                            className={`nav-color ${split[1] === "profile"
                                ? "nav-active"
                                : "nav-pasif"
                                }`}
                            style={{ textDecoration: 'none' }}>
                            Profile
                        </a>
                    </span>
                </Link>
                <Link to="/my-collections"
                    style={{ textDecoration: "none" }}>
                    <span>
                        <a href="/my-collections"
                            className={`nav-color ${split[1] === "my-collections"
                                ? "nav-active"
                                : "nav-pasif"
                                }`}
                            aria-current="page"
                            style={{ textDecoration: 'none' }}>
                            My Collections
                        </a>
                    </span>
                </Link>
                <Link to="/add-literature"
                    style={{ textDecoration: "none" }}>
                    <span>
                        <a href="/add-literature"
                            className={`nav-color ${split[1] === "add-literature"
                                ? "nav-active"
                                : "nav-pasif"
                                }`}
                            aria-current="page"
                            style={{ textDecoration: 'none' }}>
                            Add Literature
                        </a>
                    </span>
                </Link>
                <span onClick={logoutHandle}>
                    <a href="/"
                        className={`nav-color ${split[1] === "/"
                            ? "nav-active"
                            : "nav-pasif"
                            }`}
                        style={{ textDecoration: 'none' }}>
                        Logout
                    </a>
                </span>
            </div>
        </div>
    )
}