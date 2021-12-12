// Import React
import React, { useContext } from "react";
import { useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthContextProvider';

// Import Style
import "./Profile.css";
import { Container } from "react-bootstrap";

// Import Icon
import Email from '../../Images/mail.png';
import iconGender from '../../Images/gender.png';
import Call from '../../Images/call.png';
import Maps from '../../Images/maps.png';

// Import Components
import Navbar from '../../Components/Navbar/Navbar';
import ChangePhoto from './ChangePhoto';
import MyLiterature from './myLiterature'

// Import API
import { API } from "../../config/api";

export default function Profile() {

    const { stateAuth } = useContext(AuthContext);
    const [profile, setProfile] = useState([]);

    const getProfile = async () => {
        try {
            const profileAPI = await API.get('/users')
            setProfile(profileAPI.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <>
            <Navbar />
            <div className="body">
                <Container fluid className="profile-container">
                    <h1 className="mb-4">Profile</h1>
                    {profile.filter((user) => user.email === stateAuth.user.email).map((myProfile) => (
                        <Container className="d-flex px-5 py-4  data-container rounded justify-content-between">
                            <div className='card-profile'>
                                <div className="profile-content px-4">
                                    <div className="d-flex align-items-center gap-3 mb-4 ">
                                        <img className="img-1" src={Email} alt=""></img>
                                        <div>
                                            <p className="fw-bold">{myProfile.email}</p>
                                            <small>Email</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 mb-4 ">
                                        <img src={iconGender} alt=""></img>
                                        <div>
                                            <p className="fw-bold">{myProfile.gender}</p>
                                            <small>Gender</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 mb-4 ">
                                        <img src={Call} alt=""></img>
                                        <div>
                                            <p className="fw-bold">{myProfile.phone}</p>
                                            <small>Mobile Phone</small>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-3 mb-4 ">
                                        <img src={Maps} alt=""></img>
                                        <div>
                                            <p className="fw-bold">
                                                {myProfile.address}
                                            </p>
                                            <small>Address</small>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ChangePhoto
                                        userId={stateAuth.user.id}
                                        photo={myProfile.photo}
                                    />
                                </div>
                            </div>
                            <p className="title-myliterature">My literature</p>
                        </Container>
                    ))}
                    <MyLiterature
                        stateAuth={stateAuth.user.id}
                    />
                </Container>
            </div>
        </>
    )
}