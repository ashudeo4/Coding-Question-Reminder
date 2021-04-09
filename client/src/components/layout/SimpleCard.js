import React from "react";
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

export default function SimpleCard({
  name,
  totalQuestions,
  completedQuestions,
}) {
  const classes = useStyles();
  const classesProgress = useStylesProgress();
  let progressValue = (completedQuestions / totalQuestions) * 100;
  if (isNaN(progressValue)) {
    progressValue = 0;
  }
  return (
    <Card className={classes.root}>
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
}
