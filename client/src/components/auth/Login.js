import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const Login = (props) => {
  return (
    <Box component="div" mt={10}>
      <Typography variant="h3" component="h1" color="primary" align="center">
        Sign in.
      </Typography>
      <Box component="div" mt={5} display="flex" justifyContent="center">
        <Button
          variant="outlined"
          color="primary"
          size="large"
          startIcon={<i class="fab fa-google" />}
        >
          Continue with Google
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
