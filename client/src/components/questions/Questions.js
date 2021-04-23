import React, { useEffect } from "react";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { ListItem, ListItemText, List } from "@material-ui/core";
import { connect } from "react-redux";
import {
  setReminder,
  removeReminder,
  userLeetcodeQuestions,
} from "../../action/question";
const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

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
  const printReminderDate = (id) => {
    const data = userQuestions.find((ele) => ele.questionId === id);
    if (data) {
      const component = data.dateReminder.map((date, index) => (
        <ListItem>
          <ListItemText primary={index + 1 + "'s Reminder:-"} />
          <ListItemText primary={<Moment format="DD/MM/YY">{date}</Moment>} />
        </ListItem>
      ));
      return component;
    }
  };
  const reminder = (e, quesId) => {
    if (e.target.checked) {
      setReminder(user._id, quesId);
      userLeetcodeQuestions();
    } else {
      removeReminder(user._id, quesId);
      userLeetcodeQuestions();
    }
  };
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
  const classes = useStyles();
  const easy = easyQuestion.map((ques) => {
    return (
      <div className={classes.root} key={ques._id}>
        <Accordion style={{ backgroundColor: "#1d1d27", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <Checkbox
                  checked={
                    userQuestions.find((ele) => ele.questionId === ques._id)
                      ? true
                      : false
                  }
                  onChange={(e) => reminder(e, ques._id)}
                  style={{ color: "white" }}
                />
              }
              label={ques.name}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="primary">
              <Link href={ques.link} target="_blank" rel="noreferrer">
                Goto Question
              </Link>
              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  {printReminderDate(ques._id)}
                </List>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });
  const medium = mediumQuestion.map((ques) => {
    return (
      <div className={classes.root} key={ques._id}>
        <Accordion style={{ backgroundColor: "#1d1d27", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <Checkbox
                  style={{ color: "white" }}
                  checked={
                    userQuestions.find((ele) => ele.questionId === ques._id)
                      ? true
                      : false
                  }
                  onChange={(e) => reminder(e, ques._id)}
                />
              }
              label={ques.name}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="primary">
              <Link href={ques.link} target="_blank" rel="noreferrer">
                Goto Question
              </Link>
              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  {printReminderDate(ques._id)}
                </List>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  });
  const hard = hardQuestion.map((ques) => {
    return (
      <div className={classes.root} key={ques._id}>
        <Accordion style={{ backgroundColor: "#1d1d27", color: "white" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <FormControlLabel
              aria-label="Acknowledge"
              onClick={(event) => event.stopPropagation()}
              onFocus={(event) => event.stopPropagation()}
              control={
                <Checkbox
                  style={{ color: "white" }}
                  checked={
                    userQuestions.find((ele) => ele.questionId === ques._id)
                      ? true
                      : false
                  }
                  onChange={(e) => reminder(e, ques._id)}
                />
              }
              label={ques.name}
            />
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="primary">
              <Link href={ques.link} target="_blank" rel="noreferrer">
                Goto Question
              </Link>
              <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">
                  {printReminderDate(ques._id)}
                </List>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
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
