import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import Input from "../shared/components/input";
import useCreateRegister from "../shared/hooks/useCreateRegister";
import { verifyEmail, checkIfEmpty } from "../utility";

const SupervisorCreate = () => {
  const { loading, token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const supervisorRegister = useCreateRegister();
  const register = () => {
    if (!verifyEmail(email)) return;
    if (checkIfEmpty(username, password, name, email, frequency)) {
      return Alert.alert("Fill all Entries");
    }
    supervisorRegister(
      { username, password, email, name, frequency },
      "supervisor",
      token
    );
  };

  return (
    <View style={styles.container}>
      <Input placeholder="Supervisor Name" setVar={setName} />
      <Input placeholder="Supervisor Email" setVar={setEmail} />
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={frequency}
          style={styles.input}
          onValueChange={(itemValue, itemIndex) => setFrequency(itemValue)}
        >
          <Picker.Item label="Daily" value="Daily" />
          <Picker.Item label="Weekly" value="Weekly" />
        </Picker>
      </View>

      <Input placeholder="Supervisor Username" setVar={setUsername} />
      <Input
        placeholder="Supervisor Password"
        setVar={setPassword}
        extras={{ secureTextEntry: true }}
      />

      <Button
        style={[styles.buttonContainer]}
        mode="contained"
        color="#62e2f0"
        loading={loading}
        labelStyle={{
          fontSize: 17,
          fontWeight: "bold",
        }}
        onPress={register}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
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
    width: 300,
  },
});

export default SupervisorCreate;
