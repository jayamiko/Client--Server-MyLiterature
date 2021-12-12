import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";


const PrivateRoute = ({ component: Component, ...rest }) => {

    const { stateAuth, dispatch } = useContext(AuthContext);
    console.log(stateAuth);

    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    stateAuth.isLogin === true ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to="/" />
                    )
                }
            />
        </>
    );
};

export default PrivateRoute;