import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
import { registerGoogle, register } from "../../action/auth";
import InputField from "../layout/InputField";

const Register = ({ registerGoogle, register, isAuthenticated }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [email, setEmail] = useState("");

  const onChangeNameHandler = (name) => {
    setName(name);
  };
  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };
  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };
  const onChangePassword2Handler = (password2) => {
    setPassword2(password2);
  };
  const submitHandler = () => {
    let userInfo = { name, email, password, password2 };
    register(userInfo);
  };
  const responseGoogle = async (googleData) => {
    registerGoogle(googleData.tokenId);
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
          clientId="687554768689-2tu8atvgbbs552iii4fh1lbdrjhonog5.apps.googleusercontent.com"
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
      <Box component="div" mt={1} display="flex" justifyContent="center">
        <Box component="div" display="flex" flexDirection="column">
          <InputField
            value={name}
            placeholder="Name"
            onChange={onChangeNameHandler}
          />
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
          <InputField
            value={password2}
            placeholder="Password Again"
            onChange={onChangePassword2Handler}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => submitHandler()}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { registerGoogle, register })(Register);
