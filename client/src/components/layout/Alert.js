import React from "react";
import { connect } from "react-redux";
import { Alert as MaterialAlert } from "@material-ui/lab/";
const Alert = ({ alerts }) => {
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => {
      return (
        <MaterialAlert severity={alert.alertType} key={alert.id}>
          {alert.msg}
        </MaterialAlert>
      );
    })
  );
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});
export default connect(mapStateToProps)(Alert);
