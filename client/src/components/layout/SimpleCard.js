import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#1d1d27",
    color: "#FFFFFF",
    borderRadius: "25px",
    transition: "transform 0.15s ease-in-out",
  },
  cardHovered: {
    transform: "scale3d(1.05, 1.05, 1)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
    color: "#FFFFFF",
  },
  title: {
    fontSize: 14,
    color: "white",
  },
  pos: {
    marginBottom: 12,
    color: "white",
  },
});
const useStylesProgress = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const SimpleCard = ({ name, totalQuestions, completedQuestions, history }) => {
  const classes = useStyles();
  const classesProgress = useStylesProgress();
  let progressValue = (completedQuestions / totalQuestions) * 100;
  if (isNaN(progressValue)) {
    progressValue = 0;
  }
  const [state, setState] = useState({
    raised: false,
    shadow: 1,
  });
  const cardDetail = () => {
    return history.push("/questions");
  };
  return (
    <Card
      className={classes.root}
      classes={{ root: state.raised ? classes.cardHovered : "" }}
      onMouseOver={() => setState({ raised: true, shadow: 3 })}
      onMouseOut={() => setState({ raised: false, shadow: 1 })}
      raised={state.raised}
      zdepth={state.shadow}
      onClick={() => {
        cardDetail();
      }}
    >
      <CardContent>
        <Typography variant="h5">
          <i className="fas fa-code"></i>
        </Typography>
        <Typography variant="h4" component="h2">
          {name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="h2">
            {completedQuestions}
            <span> / </span>
            {totalQuestions}
          </Typography>
          <div className={classesProgress.root}>
            <CircularProgress
              thickness={8}
              variant="determinate"
              value={progressValue}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default withRouter(SimpleCard);
