import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import {
  setReminder,
  removeReminder,
  userLeetcodeQuestions,
} from "../../action/question";

import QuestionsList from './QuestionsList'
const Questions = ({
  leetcode,
  user,
  setReminder,
  removeReminder,
  userQuestions,
  userLeetcodeQuestions,
}) => {
  useEffect(() => {
    userLeetcodeQuestions();
  }, [userLeetcodeQuestions]);


  if (leetcode.length > 0) {
    localStorage.setItem("leetcode", JSON.stringify(leetcode));
  } else {
    leetcode = JSON.parse(localStorage.getItem("leetcode"));
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const easyQuestion = leetcode.filter((ques) => ques.difficulty === "EASY");
  const mediumQuestion = leetcode.filter(
    (ques) => ques.difficulty === "MEDIUM"
  );
  const hardQuestion = leetcode.filter((ques) => ques.difficulty === "HARD");
  const easy = easyQuestion.map((ques) => {
    return <QuestionsList ques={ques} removeReminder={removeReminder} userId={user._id} setReminder={setReminder} userQuestions={userQuestions} />;
  });
  const medium = mediumQuestion.map((ques) => {
    return <QuestionsList ques={ques} removeReminder={removeReminder} userId={user._id} setReminder={setReminder} userQuestions={userQuestions} />;


  });
  const hard = hardQuestion.map((ques) => {
    return <QuestionsList ques={ques} removeReminder={removeReminder} userId={user._id} setReminder={setReminder} userQuestions={userQuestions} />;
  });
  return (
    <Box mx={5} py={5}>
      <Typography color="primary" variant="h3" align="center">
        Leetcode
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
};
const mapStateToProps = (state) => ({
  leetcode: state.question.leetcode,
  user: state.auth.user,
  userQuestions: state.question.userLeetcodeQuestions,
});
export default connect(mapStateToProps, {
  setReminder,
  removeReminder,
  userLeetcodeQuestions,
})(Questions);
