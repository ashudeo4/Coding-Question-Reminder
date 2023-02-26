import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link } from "@material-ui/core";

import { connect } from "react-redux";
import { getTodayQuestions } from "../../action/question";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: "25px",
    backgroundColor: "#1d1d27",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useStylesAccordion = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const TaskCard = ({ todayQuestions, getTodayQuestions }) => {
  useEffect(() => {
    getTodayQuestions();
  }, [getTodayQuestions]);
  const classes = useStyles();
  const classesAccordion = useStylesAccordion();

  const tasks = todayQuestions.map((ques) => (
    <div className={classesAccordion.root} key={ques._id}>
      <Accordion style={{ backgroundColor: "#1d1d27", color: "white" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classesAccordion.heading}>
            {ques.name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="primary">
            <Link href={ques.link} target="_blank" rel="noreferrer">
              Goto Question
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  ));
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Today Questions
        </Typography>
        {todayQuestions.length > 0 ? (
          tasks
        ) : (
          <Typography variant="h6" component="h2" color="primary" gutterBottom>
            No questions
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
const mapStateToProps = (state) => ({
  todayQuestions: state.question.todayQuestions,
});
export default connect(mapStateToProps, { getTodayQuestions })(TaskCard);
