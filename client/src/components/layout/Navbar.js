import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Box,
} from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { logout } from "../../action/auth";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuPaper: {
    backgroundColor: "#1d1d27",
  },
}));
const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    logout();
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const guestLinks = (
    <Toolbar>
      <AssignmentTurnedInIcon color="primary" />
      <Typography variant="h6" className={classes.title} color="primary">
        Reminder
      </Typography>
      <Link to="/login">
        <Button color="primary">Login</Button>
      </Link>
      <Link to="/register">
        <Button color="primary">Sign Up</Button>
      </Link>
    </Toolbar>
  );
  const authLinks = (
    <Toolbar>
      <DashboardIcon color="primary" />
      <Typography variant="h6" className={classes.title} color="primary">
        Dashboard
      </Typography>
      <Avatar
        src={!user ? "" : user.picture}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      />

      <Menu
        elevation="1"
        classes={{ paper: classes.menuPaper }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MenuItem>
          <Box display="flex" flexDirection="column">
            <Typography variant="h8" color="primary">
              Signed in as{" "}
            </Typography>
            <Typography variant="h7" color="primary">
              {!user ? "" : user.name}
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem style={{ color: "white" }} onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </Toolbar>
  );
  return (
    <AppBar position="static" color="secondary" elevation="0">
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </AppBar>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
