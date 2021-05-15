import React, { Fragment, useEffect, useState } from "react";
import Card from "../layout/SimpleCard";
import TaskCard from "../layout/TaskCard";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  getLeetcodeQuestion,
  getAlgoexpertQuestion,
  getUserQuestions,
} from "../../action/question";
const Dashboard = ({
  getLeetcodeQuestion,
  getAlgoexpertQuestion,
  leetcode,
  algoexpert,
  userQuestions,
  totalAlgoexpertQuestions,
  totalLeetcodeQuestions,
  getUserQuestions,
}) => {
  useEffect(() => {
    getAlgoexpertQuestion();
    getLeetcodeQuestion();
    getUserQuestions();
  }, [getLeetcodeQuestion, getAlgoexpertQuestion, getUserQuestions]);
  let leetcodeCompletedQuestion = userQuestions.filter(
    (ele) => ele.type === "Leetcode"
  ).length;
  let algoexpertCompletedQuestion = userQuestions.filter(
    (ele) => ele.type === "Algoexpert"
  ).length;
  const listOfPlatforms = [
    {
      id: 1,
      name: "Leetcode",
      totalQuestions: totalLeetcodeQuestions,
      completedQuestions: leetcodeCompletedQuestion,
      questions: leetcode,
    },
    {
      id: 2,
      name: "Algoexpert",
      totalQuestions: totalAlgoexpertQuestions,
      completedQuestions: algoexpertCompletedQuestion,
      questions: algoexpert,
    },
    // { id: 3, name: "Custom", totalQuestions: 150, completedQuestions: 20 },
    // { id: 4, name: "Favorite", totalQuestions: 10, completedQuestions: 10 },
  ];
  const Cards = listOfPlatforms.map((platform) => {
    return (
      <Grid item xs={12} sm={6}>
        <Card
          key={platform.id}
          name={platform.name}
          totalQuestions={platform.totalQuestions}
          completedQuestions={platform.completedQuestions}
          questions={platform.questions}
        />
      </Grid>
    );
  });
  return (
    <Fragment>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        mt={5}
        mx={10}
      >
        <Box display="flex" justifyContent="center" mb={5}>
          <TaskCard />
        </Box>
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
  totalAlgoexpertQuestions: state.question.totalAlgoexpertQuestions,
  algoexpert: state.question.algoexpert,
  userQuestions: state.question.userQuestions,
});
export default connect(mapStateToProps, {
  getLeetcodeQuestion,
  getAlgoexpertQuestion,
  getUserQuestions,
})(Dashboard);
