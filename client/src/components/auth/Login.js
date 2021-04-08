import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import GoogleLogin from "react-google-login";
const Login = (props) => {
  const responseGoogle = (res) => {
    console.log(res);
  };
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

export default Login;
