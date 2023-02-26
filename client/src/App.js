import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navbar from "./components/layout/Navbar";
import Default from "./components/layout/Default";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Questions from "./components/questions/Questions";
import EditProfile from "./components/profile/EditProfile";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loadUser } from "./action/auth";
import setAuthToken from "./utils/setAuthToken";
//Redux setup
import { Provider } from "react-redux";
import store from "./store";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#1D1D27",
    },
  },
});
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <Alert />
          <Route exact path="/" component={Default} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <PrivateRoute exact path="/questions" component={Questions} />
            <PrivateRoute exact path="/edit" component={EditProfile} />
          </Switch>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
