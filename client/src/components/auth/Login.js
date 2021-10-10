import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import { connect } from "react-redux";
import { loginGoogle, login } from "../../action/auth";
import InputField from "../layout/InputField";

const Login = ({ loginGoogle, login, isAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };
  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const submitHandler = () => {
    let userInfo = { email, password };
    login(userInfo);
  };
  const responseGoogle = async (googleData) => {
    loginGoogle(googleData.tokenId);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box component="div" mt={10}>
      <Typography variant="h3" component="h1" color="primary" align="center">
        Sign in.
      </Typography>
      <Box component="div" mt={5} display="flex" justifyContent="center">
        <GoogleLogin
          clientId="687554768689-2tu8atvgbbs552iii4fh1lbdrjhonog5.apps.googleusercontent.com"
          render={(renderProps) => (
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<i className="fab fa-google" />}
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
      <Box component="div" mt={1} display="flex" justifyContent="center">
        <Box component="div" display="flex" flexDirection="column">
          <InputField
            value={email}
            placeholder="Email"
            onChange={onChangeEmailHandler}
          />
          <InputField
            value={password}
            placeholder="Password"
            onChange={onChangePasswordHandler}
          />

          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => submitHandler()}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { loginGoogle, login })(Login);
