import React, { useState } from "react";
import { View, StyleSheet, Alert, Keyboard, Picker } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";

import useLogin from "../hooks/useLogin";
import { checkIfEmpty } from "../../utility";

const Login = ({ user }) => {
  const login = useLogin();
  const { loading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [supervisorName, setSupervisorName] = useState("supervisor");

  const signin = () => {
    Keyboard.dismiss();
    if (checkIfEmpty(username, password)) {
      return Alert.alert("Fill all Entries");
    }

    login(user === "supervisor" ? supervisorName : user, {
      username,
      password,
    });
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => setUsername(newText)}
          autoCapitalize="none"
          placeholder={"Username"}
          autoCorrect={false}
          selectionColor="#62e2f0"
          mode="outlined"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          onChangeText={(newText) => setPassword(newText)}
          placeholder={"Password"}
          autoCapitalize="none"
          autoCorrect={false}
          selectionColor="#62e2f0"
          mode="outlined"
        />
      </View>

      {user === "supervisor" ? (
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={supervisorName}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) =>
              setSupervisorName(itemValue)
            }
          >
            <Picker.Item label="Supervisor" value="supervisor" />
            <Picker.Item
              label="Industry Supervisor"
              value="industrysupervisor"
            />
          </Picker>
        </View>
      ) : null}

      <Button
        style={[styles.buttonContainer]}
        mode="contained"
        color="#62e2f0"
        loading={loading}
        labelStyle={{
          fontSize: 17,
          fontWeight: "bold",
        }}
        onPress={signin}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default Login;
