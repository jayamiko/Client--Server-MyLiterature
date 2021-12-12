// Import React
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";

// Import Pages
import AdminPage from './AdminPage/AdminPage'
import HomePage from "./HomePage/HomePage";

export default function Landing() {

    const { stateAuth, dispatch } = useContext(AuthContext);

    return (
        <>
            {
                stateAuth.user.status === "admin" ? (
                    <>
                        <AdminPage />
                    </>
                ) : (
                    <HomePage />
                )
            }
        </>
    )
}