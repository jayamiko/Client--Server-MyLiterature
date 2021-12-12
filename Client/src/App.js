// Import React
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContextProvider";

// Import Admin Page
import AdminPage from './Pages/AdminPage/AdminPage';
import PrivateRoute from "./Components/PrivateRoutes/PrivateRoutes";

// Import User Pages
import Landing from './Pages/Landing/Landing';
import Home from './Pages/Home'
import Profile from "./Pages/Profile/Profile";
import AddLiterature from "./Pages/AddLiterature/AddLiterature";
import MyCollections from "./Pages/MyCollections/MyCollections";
import DetailLiterature from './Pages/DetailLiterature/DetailLiterature';
import NotFound from './Pages/NotFound'

// Import Style
import './App.css';

// Import API
import { API, setAuthToken } from "./config/api";

// init token on axios every time the app is refreshed
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  const { dispatch } = useContext(AuthContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status !== 200) {
        dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;
      payload.token = localStorage.token;
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/add-literature" component={AddLiterature} />
        <Route exact path="/my-collections" component={MyCollections} />
        <Route exact path="/detail-literature/:id" component={DetailLiterature} />

        {/* Admin Page */}
        <PrivateRoute exact path="/admin-page" component={AdminPage} />

        {/* 404 NOT FOUND */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
