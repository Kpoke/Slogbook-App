import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import { Picker } from "@react-native-picker/picker";

import Input from "../shared/components/input";
import useCreateRegister from "../shared/hooks/useCreateRegister";
import { verifyEmail, checkIfEmpty } from "../utility";

const StudentCreate = () => {
  const { loading, token } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState(400);
  const [session, setSession] = useState("");
  const [matric, setMatric] = useState(0);
  const [course, setCourse] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const studentRegister = useCreateRegister();
  const register = () => {
    if (!verifyEmail(email)) return;
    if (
      checkIfEmpty(username, password, name, email, session, matric, course)
    ) {
      return Alert.alert("Fill all Entries");
    }
    studentRegister(
      { username, password, email, name, level, session, matric, course },
      "student",
      token
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 30 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Input placeholder="Student Name" setVar={setName} />
        <Input placeholder="Student Email" setVar={setEmail} />
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={level}
            style={styles.input}
            onValueChange={(itemValue, itemIndex) => setLevel(itemValue)}
          >
            <Picker.Item label={"300"} value={300} />
            <Picker.Item label={"400"} value={400} />
          </Picker>
        </View>
        <Input placeholder="Matric Number" setVar={setMatric} />
        <Input placeholder="Session" setVar={setSession} />
        <Input placeholder="Course of Study" setVar={setCourse} />

        <Input placeholder="Student Username" setVar={setUsername} />
        <Input
          placeholder="Student Password"
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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

export default StudentCreate;
