import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

const Input = ({ setVar, placeholder, extras }) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      onChangeText={(newText) => setVar(newText)}
      autoCapitalize="none"
      placeholder={placeholder}
      autoCorrect={false}
      selectionColor="#62e2f0"
      mode="outlined"
      {...extras}
    />
  </View>
);

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
  },
  inputContainer: {
    marginBottom: 20,
  },
});

export default Input;
