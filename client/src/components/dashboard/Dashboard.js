import React, { Fragment, useState } from "react";
import Card from "../layout/SimpleCard";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const Dashboard = () => {
  const [listOfPlatforms, setListOfPlatforms] = useState([
    { id: 1, name: "Leetcode", totalQuestions: 75, completedQuestions: 15 },
    { id: 2, name: "Algoexpert", totalQuestions: 150, completedQuestions: 50 },
    { id: 3, name: "Custom", totalQuestions: 150, completedQuestions: 200 },
    { id: 4, name: "Favorite", totalQuestions: 10, completedQuestions: 10 },
  ]);
  const Cards = listOfPlatforms.map((platform) => {
    return (
      <Grid item xs={12} sm={6}>
        <Card
          key={platform.id}
          name={platform.name}
          totalQuestions={platform.totalQuestions}
          completedQuestions={platform.completedQuestions}
        />
      </Grid>
    );
  });
  return (
    <Fragment>
      <Box mx={10} mt={2}>
        <Grid container spacing={4}>
          {Cards}
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Dashboard;
