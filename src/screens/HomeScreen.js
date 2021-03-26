import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import Home from "../shared/components/home";

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  let array = [];
  let buttonTitle;
  let onPressNavigate;
  let arrayItemPressable;
  let subtitleStringFunction;
  let arrayItemOnPressNavigate;
  let titleStringFunction;
  let arrayItemExtras;

  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  const getNextDate = (dateArray) => {
    const thisDay = new Date();
    for (let i = 0; i < dateArray.length; i++) {
      let date = new Date(dateArray[i]);
      if (datesAreOnSameDay(date, thisDay)) {
        return date;
      }
      if (date.getTime() > thisDay.getTime()) {
        return date;
      }
    }
    return dateArray[dateArray.length - 1];
  };

  if (user) {
    if (user.role === "Administrator") {
      array = user.supervisor;
      buttonTitle = "Create a Supervisor Account";
      arrayItemPressable = false;
      onPressNavigate = "SupervisorRegister";
      titleStringFunction = (supervisor) => supervisor.name;
      subtitleStringFunction = (supervisor) => {
        return `Currently managing ${supervisor.student.length} students`;
      };
    } else if (
      user.role === "Supervisor" ||
      user.role === "IndustrySupervisor"
    ) {
      array = user.student;
      arrayItemPressable = true;
      onPressNavigate = "StudentRegister";
      arrayItemOnPressNavigate = "";
      arrayItemExtras = (item) => {
        return {
          array: item.message,
          arrayItemPressable: true,
          arrayItemOnPressNavigate: "Message",
          titleStringFunction: (message) =>
            `${message.isReport ? "LogBook Entry - " : "Enquiry - "} ${
              message.date
            }`,
          subtitleStringFunction: (message) => {
            return `${message.report.substring(0, 50)}... `;
          },
        };
      };

      titleStringFunction = (student) => student.name;
      subtitleStringFunction = (student) => {
        if (student.dateArray.length) {
          return `Due Date for next submission is ${getNextDate(
            student.dateArray
          )}`;
        }
        return `Has not started his/her Internship program`;
      };
      if (user.role === "Supervisor") {
        buttonTitle = "Create a Student Account";
      }
    } else if (user.role === "Student") {
      array = user.message;
      arrayItemPressable = true;
      arrayItemOnPressNavigate = "Message";
      titleStringFunction = (message) =>
        `${message.isReport ? "LogBook Entry - " : "Enquiry - "} ${
          message.date
        }`;
      subtitleStringFunction = (message) => {
        return `${message.report.substring(0, 50)}... `;
      };
    }
  }

  return (
    <Home
      navigate={navigation.navigate}
      user={user}
      subArray={array}
      buttonTitle={buttonTitle}
      onPressNavigate={onPressNavigate}
      arrayItemPressable={arrayItemPressable}
      subtitleStringFunction={subtitleStringFunction}
      titleStringFunction={titleStringFunction}
      arrayItemOnPressNavigate={arrayItemOnPressNavigate}
      arrayItemExtras={arrayItemExtras}
    />
  );
};

export default HomeScreen;
