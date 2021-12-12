// Import React
import { useState, useContext } from "react";

// Import Components
import { AuthContext } from "../../Context/AuthContextProvider";

// Import Style
import './Register.css'
import { Button, Modal, Form } from "react-bootstrap";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import API
import { API, setAuthToken } from '../../config/api'

toast.configure()

export default function Register() {

    const { stateAuth, dispatch } = useContext(AuthContext);
    const [modal, setModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    const openModalLogin = () => {
        setModal(true);
        setRegisterModal(false);
    };
    const openModalRegister = () => {
        setRegisterModal(true);
        setModal(false);
    };
    const closeModalRegister = () => setRegisterModal(false);

    const [formRegister, setFormRegister] = useState({
        fullname: "",
        email: "",
        password: "",
        gender: "male",
        phone: "",
        address: "",
    })

    const { fullname, email, password, gender, phone, address } = formRegister;

    const registerHandleChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.id]: e.target.value,
        })
    }

    const loginHandler = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify({
                email: formRegister.email,
                password: formRegister.password,
            });

            const response = await API.post("/login", body, config);

            setAuthToken(response?.data.data.token);

            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data.data,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submitRegister = async (e) => {
        try {
            e.preventDefault();

            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const body = JSON.stringify(formRegister)
            const response = await API.post("/register", body, config)
            console.log(response.status);

            if (response?.status === 200) {
                toast.success('Register Success!', {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            }

            closeModalRegister()
            loginHandler()

        } catch (error) {
            console.log(error);
            toast.error(`Please fill in your data valid`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    }

    return (
        <>
            <Modal show={registerModal} onHide={closeModalRegister} className='bodyModal'>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModalRegister}
                    required
                >x</button>
                <Modal.Body>
                    <h2 className="headerModal">Sign Up</h2>
                    <Form onSubmit={submitRegister} className='formModal'>
                        <Form.Group className="mb-4" controlId="formBasicEmail">
                            <Form.Control
                                onChange={registerHandleChange}
                                type="email"
                                name="email"
                                id="email"
                                placeholder='Email'
                                className='inputModal'
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-4"
                            controlId="formBasicPassword"
                        >
                            <Form.Control
                                onChange={registerHandleChange}
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
                                className='inputModal'
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicName">
                            <Form.Control
                                name="fullname"
                                onChange={registerHandleChange}
                                type="text"
                                id="fullname"
                                placeholder='Full Name'
                                className='inputModal'
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="gender">
                            <Form.Select
                                aria-label="gender"
                                className='inputModal'
                                value={formRegister.gender}
                                onChange={registerHandleChange}
                            >
                                <option value="male"
                                    style={{ color: 'grey' }}
                                >Male</option>
                                <option value="female"
                                    style={{ color: 'grey' }}
                                >Female</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="formBasicPhone">
                            <Form.Control
                                onChange={registerHandleChange}
                                name="phone"
                                type="text"
                                id="phone"
                                placeholder='Phone'
                                className='inputModal'
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4" controlId="address">
                            <Form.Control
                                onChange={registerHandleChange}
                                name="address"
                                type="text"
                                id="address"
                                placeholder='Address'
                                className='inputModal'
                                required
                            />
                        </Form.Group>
                        <div class="formModal">
                            <Button
                                className="submitRegister"
                                variant="warning"
                                type="submit"
                                required>
                                Sign Up
                            </Button>
                            <small style={{ marginTop: "10px" }}>
                                Already have an account ?  Klik {""}
                                <a href='/' className='link' onClick={openModalLogin}>Here</a>
                            </small>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <span>
                <button
                    className="btnRegister"
                    onClick={openModalRegister}
                    href="#services">
                    Sign Up
                </button>
            </span>
        </>
    )
}