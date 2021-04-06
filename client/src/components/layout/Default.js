import React from "react";
import { Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";

const Default = () => {
  return (
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
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod ipsum ut
        temporibus odio
      </Typography>
    </Box>
  );
};

export default Default;
