import React from "react";
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

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const Questions = () => {
  const classes = useStyles();
  const easy = (
    <div className={classes.root}>
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
            control={<Checkbox style={{ color: "white" }} />}
            label="Two Sum"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="primary">
            The click event of the nested action will propagate up and expand
            the accordion unless you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
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
            control={<Checkbox style={{ color: "white" }} />}
            label="Regular Expression Matching"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="primary">
            The click event of the nested action will propagate up and expand
            the accordion unless you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
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
            control={<Checkbox style={{ color: "white" }} />}
            label="Letter Combinations of a Phone Number"
          />
        </AccordionSummary>
        <AccordionDetails>
          <Typography color="primary">
            The click event of the nested action will propagate up and expand
            the accordion unless you explicitly stop it.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );

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
          {easy}
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box my={2}>
            <Typography variant="h4" color="primary" align="center">
              Hard
            </Typography>
          </Box>
          {easy}
        </Grid>
      </Grid>
    </Box>
  );
};
export default Questions;
