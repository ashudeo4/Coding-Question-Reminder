import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import { register } from "../../action/auth";
const Register = ({ register, isAuthenticated }) => {
  const responseGoogle = async (googleData) => {
    register(googleData.tokenId);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box component="div" mt={10}>
      <Typography variant="h3" component="h1" color="primary" align="center">
        Sign up.
      </Typography>
      <Box component="div" mt={5} display="flex" justifyContent="center">
        <GoogleLogin
          clientId={process.env.REACT_APP_GoogleClientID}
          render={(renderProps) => (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<i class="fab fa-google" />}
            >
              Continue with Google
            </Button>
          )}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { register })(Register);
