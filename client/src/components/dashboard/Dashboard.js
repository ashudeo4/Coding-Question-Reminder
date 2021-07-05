import React, { Fragment, useEffect, useState } from "react";
import Card from "../layout/SimpleCard";
import TaskCard from "../layout/TaskCard";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Questions from "../questions/Questions";
import Skeleton from "@material-ui/lab/Skeleton";

import {
  getLeetcodeQuestion,
  getAlgoexpertQuestion,
  getUserQuestions,
} from "../../action/question";
const Dashboard = ({
  getLeetcodeQuestion,
  getAlgoexpertQuestion,
  leetcode,
  userQuestions,
  totalLeetcodeQuestions,
  getUserQuestions,
}) => {
  const [questionsLoading, setQuestionsLoading] = useState(true);
  useEffect(() => {
    getLeetcodeQuestion();
    getUserQuestions();
    setQuestionsLoading(false);
  }, [getLeetcodeQuestion, getUserQuestions]);
  let leetcodeCompletedQuestion = userQuestions.filter(
    (ele) => ele.type === "Leetcode"
  ).length;
  console.log("runn", leetcode);
  const listOfPlatforms = [
    {
      id: 1,
      name: "Leetcode",
      totalQuestions: totalLeetcodeQuestions,
      completedQuestions: leetcodeCompletedQuestion,
      questions: leetcode,
    },
  ];

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
        {/* show loader and pass question data to Question component */}

        {questionsLoading || leetcode.length === 0 ? (
          <Skeleton animation="wave" height="100%" width="100%" />
        ) : (
          <Questions questions={leetcode} platformName="Leetcode" />
        )}
      </Box>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  leetcode: state.question.leetcode,
  totalLeetcodeQuestions: state.question.totalLeetcodeQuestions,
  userQuestions: state.question.userQuestions,
});
export default connect(mapStateToProps, {
  getLeetcodeQuestion,
  getUserQuestions,
})(Dashboard);
