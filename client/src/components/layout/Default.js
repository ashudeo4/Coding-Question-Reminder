import React, { useEffect } from "react";
import { Typography } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { Box } from "@material-ui/core";
import { connect } from "react-redux";
import { getAllUserCount } from "../../action/user";
const Default = ({ isAuthenticated, allUserCount, getAllUserCount }) => {
  useEffect(() => {
    getAllUserCount();
  }, [getAllUserCount]);
  // console.log({ allUserCount });
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Box component="div" height="100">
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        mt={10}
        flexDirection="column"
      >
        <Typography variant="h3" component="h2" color="primary" align="center">
          Coding Question Reminder
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          align="center"
          mt={2}
        >
          Repetition and Consistency is the key.
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          color="primary"
          align="center"
          mt={2}
        >
          User Count
          <span> {allUserCount}</span>
        </Typography>
      </Box>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  allUserCount: state.user.allUserCount,
});
export default connect(mapStateToProps, { getAllUserCount })(Default);
