import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useSelector } from "react-redux";

import useCreateRegister from "../../shared/hooks/useCreateRegister";
import { checkIfEmpty } from "../../utility";

const AdminRegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const adminRegister = useCreateRegister();

  const register = () => {
    if (checkIfEmpty(username, password)) {
      return Alert.alert("Fill all Entries");
    }
    adminRegister({ username, password }, "admin");
  };

  return (
    <View style={styles.container}>
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

      <Button
        style={styles.buttonContainer}
        onPress={register}
        mode="contained"
        color="#62e2f0"
        loading={loading}
        labelStyle={{
          fontSize: 17,
          fontWeight: "bold",
        }}
      >
        Register
      </Button>
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
    marginBottom: 20,
  },
});

export default AdminRegisterScreen;
