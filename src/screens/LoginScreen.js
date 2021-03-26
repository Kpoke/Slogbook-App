import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import Login from "../shared/components/login";

const LoginScreen = ({ navigation, route }) => {
  const name = route.params.name;

  return (
    <View style={styles.container}>
      <Login user={name} />

      {name === "admin" ? (
        <Button
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("AdminRegister")}
          mode="contained"
          labelStyle={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          Register
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  input: {
    height: 50,
    width: 300,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    width: 250,
  },
});

export default LoginScreen;
