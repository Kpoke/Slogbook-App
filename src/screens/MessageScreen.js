import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import Message from "../shared/components/message";

const MessageScreen = ({ route }) => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    if (user.role === "Supervisor" || user.role === "IndustrySupervisor") {
    } else if (user.role === "Student") {
    }
  }

  return <Message message={route.params.item} role={user.role} />;
};

export default MessageScreen;
