import React from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";
import { connect } from "react-redux";
import {
  setReminder,
  removeReminder,
  getUserQuestions,
} from "../../action/question";

import QuestionsList from "./QuestionsList";
const Questions = ({
  user,
  setReminder,
  removeReminder,
  userQuestions,
  questions,
  platformName,
}) => {
  if (questions.length > 0) {
    localStorage.setItem(platformName, JSON.stringify(questions));
  } else {
    questions = JSON.parse(localStorage.getItem(platformName));
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const easyQuestion = questions.filter((ques) => ques.difficulty === "EASY");
  const mediumQuestion = questions.filter(
    (ques) => ques.difficulty === "MEDIUM"
  );
  const hardQuestion = questions.filter((ques) => ques.difficulty === "HARD");
  const easy = easyQuestion.map((ques) => {
    return (
      <QuestionsList
        ques={ques}
        removeReminder={removeReminder}
        userId={user._id}
        setReminder={setReminder}
        userQuestions={userQuestions}
        type={platformName}
      />
    );
  });
  const medium = mediumQuestion.map((ques) => {
    return (
      <QuestionsList
        ques={ques}
        removeReminder={removeReminder}
        userId={user._id}
        setReminder={setReminder}
        userQuestions={userQuestions}
        type={platformName}
      />
    );
  });
  const hard = hardQuestion.map((ques) => {
    return (
      <QuestionsList
        ques={ques}
        removeReminder={removeReminder}
        userId={user._id}
        setReminder={setReminder}
        userQuestions={userQuestions}
        type={platformName}
      />
    );
  });

  const page = (
    <Box mx={5} py={5}>
      <Typography color="primary" variant="h3" align="center">
        {platformName}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Box my={2}>
            <Typography variant="h4" color="primary" align="center">
              Easy
            </Typography>
          </Box>
          {easy}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box my={2}>
            <Typography variant="h4" color="primary" align="center">
              Medium
            </Typography>
          </Box>
          {medium}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box my={2}>
            <Typography variant="h4" color="primary" align="center">
              Hard
            </Typography>
          </Box>
          {hard}
        </Grid>
      </Grid>
    </Box>
  );
  return user ? page : <Skeleton animation="wave" height="100" width="100%" />;
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
  userQuestions: state.question.userQuestions,
});
export default connect(mapStateToProps, {
  setReminder,
  removeReminder,
  getUserQuestions,
})(Questions);
