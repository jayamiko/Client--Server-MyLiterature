import { createContext, useReducer } from "react";

const initialValue = {
    isLogin: false,
    user: {
        id: "",
        name: "",
        email: "",
        gender: "",
        status: "user",
        password: "",
        phone: "",
        photo: "",
    },
};

export const AuthContext = createContext();

const Reducer = (state, action) => {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
        case "AUTH_SUCCESS":
        case "LOGIN":
            localStorage.setItem('token', payload.token)
            return {
                isLogin: true,
                user: payload
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token");
            return {
                isLogin: false,
                user: {
                    name: "",
                    email: "",
                    status: "",
                    gender: "",
                    phone: "",
                    address: "",
                    photo: "",
                },
            };
        default:
            throw new Error("type doesn't match cases");
    }
}

export const AuthContextProvider = ({ children }) => {
    const [stateAuth, dispatch] = useReducer(Reducer, initialValue);

    return (
        <AuthContext.Provider value={{ stateAuth, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};