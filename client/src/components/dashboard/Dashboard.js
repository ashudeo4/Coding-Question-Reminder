import React, { Fragment, useState, useEffect } from "react";
import Card from "../layout/SimpleCard";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import { getLeetcodeQuestion } from "../../action/question";
const Dashboard = ({
  getLeetcodeQuestion,
  leetcode,
  totalLeetcodeQuestions,
}) => {
  useEffect(() => {
    getLeetcodeQuestion();
  }, [getLeetcodeQuestion]);
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
          totalQuestions={totalLeetcodeQuestions}
          completedQuestions={platform.completedQuestions}
        />
      </Grid>
    );
  });
  return (
    <Fragment>
      <Box mx={10} mt={5}>
        <Grid container spacing={4}>
          {Cards}
        </Grid>
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  leetcode: state.question.leetcode,
  totalLeetcodeQuestions: state.question.totalLeetcodeQuestions,
});
export default connect(mapStateToProps, { getLeetcodeQuestion })(Dashboard);
