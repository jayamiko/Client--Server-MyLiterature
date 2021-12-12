// Import React
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// Import Components
import { AuthContext } from "../../Context/AuthContextProvider";

// Import Style
import { Button, Modal, Form } from "react-bootstrap";
import './Login.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Import API
import { API, setAuthToken } from '../../config/api'

toast.configure()

export default function Login() {

    const [modal, setModal] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);

    const { stateAuth, dispatch } = useContext(AuthContext);
    let history = useHistory();

    const checkAuth = () => {
        if (stateAuth.isLogin === true) {
            history.push("/home");
        }
    };
    checkAuth();

    const openModalLogin = () => {
        setModal(true);
        setRegisterModal(false);
    };
    const openModalRegister = () => {
        setRegisterModal(true);
        setModal(false);
    };
    const closeModalLogin = () => setModal(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    const submitLogin = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const body = JSON.stringify(form);

            const response = await API.post("/login", body, config);
            console.log(response);

            setAuthToken(response?.data.data.token);

            if (response?.status === 200) {
                dispatch({
                    type: "LOGIN",
                    payload: response.data.data,
                });

                if (response?.status === 200) {
                    toast.success('Login Success!', {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 2000
                    })
                }

                closeModalLogin();
            }
        } catch (error) {
            console.log(error);
            toast.error(`Your email and password are invalid`, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        }
    };


    return (
        <>
            <button onClick={openModalLogin} className="btnLogin">
                Sign In
            </button>

            <Modal show={modal} className='bodyModalLogin'>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={closeModalLogin}
                    required
                >x</button>
                <Modal.Body>
                    <h2 className="headerModal">Sign In</h2>
                    <Form onSubmit={submitLogin} className='formModal'>
                        <Form.Group className="mb-4" controlId="email">
                            <Form.Control
                                onChange={handleChange}
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
                            controlId="password"
                        >
                            <Form.Control
                                onChange={handleChange}
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Password'
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
                                Sign In
                            </Button>
                            <small style={{ marginTop: '10px' }}>
                                Already have an account ?  Klik {""}
                                <a href='/' className='link' onClick={closeModalLogin}>Here</a>
                            </small>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}