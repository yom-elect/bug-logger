import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";

const Alerts = ({ show, variant, message }) => {
  return show && <Alert variant={variant}>{message}</Alert>;
};

export default Alerts;
