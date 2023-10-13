import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import InputField from "../layout/InputField";
import Button from "@material-ui/core/Button";
import { updatePassword } from "../../action/user";
const EditProfile = ({ updatePassword }) => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };
  const onChangePassword2Handler = (password2) => {
    setPassword2(password2);
  };
  const submitHandler = () => {
    let userInfo = { password, password2 };
    updatePassword(userInfo);
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      marginTop="2rem"
    >
      <Typography variant="h2" color="primary">
        Edit Profile
      </Typography>
      <Typography variant="h5" color="primary">
        Edit Password
      </Typography>
      <Box component="div" mt={1} display="flex" justifyContent="center">
        <Box component="div" display="flex" flexDirection="column">
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
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default connect(null, { updatePassword })(EditProfile);
