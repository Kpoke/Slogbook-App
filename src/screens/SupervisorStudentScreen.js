import React from "react";
import { useSelector } from "react-redux";

import Home from "../shared/components/home";

const SupervisorStudentScreen = ({ navigation, route }) => {
  const { user } = useSelector((state) => state.auth);

  let array = [];
  let arrayItemPressable;
  let subtitleStringFunction;
  let arrayItemOnPressNavigate;
  let titleStringFunction;

  array = user.message;
  arrayItemPressable = true;
  arrayItemOnPressNavigate = "Message";
  titleStringFunction = (message) =>
    `${message.isReport ? "LogBook Entry - " : "Enquiry - "} ${message.date}`;
  subtitleStringFunction = (message) =>
    `${message.report.substring(0, 50)}... `;

  return (
    <Home
      navigate={navigation.navigate}
      subArray={array}
      arrayItemPressable={arrayItemPressable}
      subtitleStringFunction={subtitleStringFunction}
      titleStringFunction={titleStringFunction}
      arrayItemOnPressNavigate={arrayItemOnPressNavigate}
    />
  );
};

export default SupervisorStudentScreen;
