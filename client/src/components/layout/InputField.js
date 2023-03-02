import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
  textField: {
    backgroundColor: "#181820",
    outline: "none",
    borderColor: "white",
    color: "white",
    borderWidth: "1px",
    height: "3rem",
    width: "15rem",
    paddingLeft: "12px",
    paddingRight: "12px",
    borderRadius: "5px",
    marginBottom: "15px",
  },
});
const InputField = ({ value, placeholder, onChange, type }) => {
  const classes = useStyles();
  return (
    <input
      className={classes.textField}
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={(e) => onChange(e.target.value)}
    ></input>
  );
};
export default InputField;
