import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
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
}));
const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static" color="transparent" elevation="0">
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
    </AppBar>
  );
};

export default Navbar;
