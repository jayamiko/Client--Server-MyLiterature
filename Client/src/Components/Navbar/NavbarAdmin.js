// import React
import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../Context/AuthContextProvider'
import { useHistory } from "react-router-dom";

// Import Style
import './Navbar.css';
import Icon from '../../Images/icon-sm.png';
import avatar from '../../Images/avatar.png';
import Logout from '../../Images/logout 1.png';
import Polygon from '../../Images/Polygon 1.png';

export default function NavbarAdmin() {

    let history = useHistory();
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
        <>
            <div className="navbar" style={{ maxHeight: '10%' }}>
                <img src={Icon} alt="icon-literature" />
                <div className="dropdown p-5 ">
                    <img className="polygon" src={Polygon} alt='' style={{ top: '39px', left: '-5px' }} />
                    <img src={avatar} alt="avatar" style={{ marginRight: '20px' }} />
                    <div className="dropdown-content py-3 px-3">
                        <div className="desc d-flex flex-column gap-4">
                            <div
                                onClick={logoutHandle}
                                className="boxDropdown">
                                <img src={Logout} alt=""></img>
                                <a href="/"><span className='textLogout'>Logout</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}