import React, { useEffect, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Skeleton from '@material-ui/lab/Skeleton';
import { useLocation } from 'react-router-dom'
import { connect } from "react-redux";
import {
  setReminder,
  removeReminder,
  getUserQuestions,
} from "../../action/question";

import QuestionsList from './QuestionsList'
const Questions = ({
  leetcode,
  user,
  setReminder,
  removeReminder,
  userQuestions,
  getUserQuestions,

}) => {
  // useEffect(() => {
  //   getUserQuestions();
  // }, [getUserQuestions]);

  const location = useLocation()
  if (location.state.questions.length > 0) {
    localStorage.setItem(location.state.key, JSON.stringify(location.state.questions));
  } else {
    leetcode = JSON.parse(localStorage.getItem(location.state.key));
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  } else {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const easyQuestion = location.state.questions.filter((ques) => ques.difficulty === "EASY");
  const mediumQuestion = location.state.questions.filter(
    (ques) => ques.difficulty === "MEDIUM"
  );
  const hardQuestion = location.state.questions.filter((ques) => ques.difficulty === "HARD");
  const easy = easyQuestion.map((ques) => {
    return <QuestionsList ques={ques} removeReminder={removeReminder} userId={user._id} setReminder={setReminder} userQuestions={userQuestions} type={location.state.key} />;
  });
  const medium = mediumQuestion.map((ques) => {
    return <QuestionsList ques={ques} removeReminder={removeReminder} userId={user._id} setReminder={setReminder} userQuestions={userQuestions} type={location.state.key} />;


  });
  const hard = hardQuestion.map((ques) => {
    return <QuestionsList ques={ques} removeReminder={removeReminder} userId={user._id} setReminder={setReminder} userQuestions={userQuestions} type={location.state.key} />;
  });
  let columns = location.state.key === "Algoexpert" ? 3 : 4
  const veryhardQuestion = location.state.key === "Algoexpert" ? location.state.questions.filter((ques) => ques.difficulty === "VERYHARD") : null
  const veryhard = location.state.key === "Algoexpert" ? veryhardQuestion.map((ques) => {
    return <QuestionsList ques={ques} removeReminder={removeReminder} userId={user._id} setReminder={setReminder} userQuestions={userQuestions} type={location.state.key} />;
  }) : null

  const page = (<Box mx={5} py={5}>
    <Typography color="primary" variant="h3" align="center">
      {location.state.key}
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} sm={columns}>
        <Box my={2}>
          <Typography variant="h4" color="primary" align="center">
            Easy
            </Typography>
        </Box>
        {easy}
      </Grid>
      <Grid item xs={12} sm={columns}>
        <Box my={2}>
          <Typography variant="h4" color="primary" align="center">
            Medium
            </Typography>
        </Box>
        {medium}
      </Grid>
      <Grid item xs={12} sm={columns}>
        <Box my={2}>
          <Typography variant="h4" color="primary" align="center">
            Hard
            </Typography>
        </Box>
        {hard}
      </Grid>
      {location.state.key === "Algoexpert" ? (<Grid item xs={12} sm={columns}>
        <Box my={2}>
          <Typography variant="h4" color="primary" align="center">
            Very Hard
            </Typography>
        </Box>
        {veryhard}
      </Grid>) : null}
    </Grid>
  </Box>)
  return (


    user ? page : <Skeleton animation="wave" height="100" width="80%" />

  );
};
const mapStateToProps = (state) => ({
  leetcode: state.question.leetcode,
  user: state.auth.user,
  userQuestions: state.question.userQuestions,
});
export default connect(mapStateToProps, {
  setReminder,
  removeReminder,
  getUserQuestions,

})(Questions);
