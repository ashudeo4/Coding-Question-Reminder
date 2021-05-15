import React, { useState, useEffect } from "react";
import ReactMoment from 'react-moment'
import Moment from 'moment'
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { List, ListItem, ListItemText, } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const QuestionsList = ({
    ques,
    userQuestions,
    setReminder,
    removeReminder,
    userId,
    type
}) => {
    const useStyles = makeStyles({
        root: {
            width: "100%",
        },
    });
    const classes = useStyles();
    const [dateList, setDateList] = useState([])
    const [status, setStatus] = useState(false)
    const changeStatus = (e) => {

        if (status) {
            setStatus(false)
            removeReminder(userId, ques._id)
            setDateList([])
        } else {
            const nextThreeDays = Moment().add(3, "days").toDate();
            const nextSevenDays = Moment().add(7, "days").toDate();
            const nextThirtyDays = Moment().add(30, "days").toDate();
            setReminder(userId, ques._id, nextThreeDays, nextSevenDays, nextThirtyDays, type)
            setStatus(true)
            const dates = [nextThreeDays, nextSevenDays, nextThirtyDays]
            const dateList = dates.map((date, index) => {

                return (<ListItem>
                    <ListItemText primary={index + 1 + "'s Reminder:-"} />
                    <ListItemText primary={<ReactMoment format="DD/MM/YY">{date}</ReactMoment>} />
                </ListItem>)
            })
            setDateList(dateList)


        }
    }
    useEffect(() => {

        userQuestions.find((ele) => ele.questionId === ques._id) ? setStatus(true) : setStatus(false)
        const id = ques._id
        const data = userQuestions.find((ele) => ele.questionId === id);
        if (data) {
            const component = data.dateReminder.map((date, index) => (
                <ListItem>
                    <ListItemText primary={index + 1 + "'s Reminder:-"} />
                    <ListItemText primary={<ReactMoment format="DD/MM/YY">{date}</ReactMoment>} />
                </ListItem>
            ));
            setDateList(component);
        }

    }, [userQuestions, ques._id])

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

                                checked={status}
                                onChange={(e) => changeStatus(e)}
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
                                {/* {printReminderDate(ques._id)} */}
                                {dateList.length > 0 ? dateList : "No date"}
                            </List>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default QuestionsList;
