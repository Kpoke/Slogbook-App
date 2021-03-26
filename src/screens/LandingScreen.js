import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, useTheme } from "react-native-paper";

const LandingScreen = ({ navigation }) => {
  const theme = useTheme();
  const labelledStyle = {
    paddingTop: 5,
    fontWeight: "bold",
    justifyContent: "center",
    alignContent: "center",
    fontSize: 17,
    color: theme.colors.text,
  };
  return (
    <View style={styles.container}>
      <Button
        onPress={() =>
          navigation.navigate("Login", {
            title: "Administrator",
            name: "admin",
          })
        }
        mode="outlined"
        style={{ ...styles.buttonStyle, borderColor: theme.colors.primary }}
        labelStyle={labelledStyle}
      >
        Administrator Login
      </Button>

      <View style={styles.seperator} />

      <Button
        onPress={() =>
          navigation.navigate("Login", {
            title: "Supervisor",
            name: "supervisor",
          })
        }
        mode="outlined"
        style={{ ...styles.buttonStyle, borderColor: theme.colors.primary }}
        labelStyle={labelledStyle}
      >
        Supervisor Login
      </Button>

      <View style={styles.seperator} />

      <Button
        onPress={() =>
          navigation.navigate("Login", {
            title: "Student",
            name: "student",
          })
        }
        mode="outlined"
        style={{ ...styles.buttonStyle, borderColor: theme.colors.primary }}
        labelStyle={labelledStyle}
      >
        Student Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  seperator: {
    margin: 15,
  },
  buttonStyle: {
    width: 250,
    height: 50,
  },
});

export default LandingScreen;
