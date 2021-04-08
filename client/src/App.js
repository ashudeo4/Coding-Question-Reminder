import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Navbar from "./components/layout/Navbar";
import Default from "./components/layout/Default";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Default} />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
