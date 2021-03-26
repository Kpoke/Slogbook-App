import React, { useState, useCallback } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import * as actions from "../store/actions";
import SettingsButton from "../shared/components/settingsButton";

const LogScreen = () => {
  const dispatch = useDispatch();

  const submitReport = useCallback(
    (formData, token) => {
      Keyboard.dismiss();
      dispatch(actions.submitReport(formData, token));
    },
    [dispatch]
  );

  const [report, setReport] = useState("");
  const [image, setImage] = useState({});
  const { loading, token } = useSelector((state) => state.auth);

  const dateArray = useSelector((state) => state.auth.user?.dateArray);

  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  let showForm = false;
  const today = new Date();

  for (let i = 0; i < dateArray.length; i++) {
    const date = new Date(dateArray[i]);
    if (datesAreOnSameDay(today, date)) {
      showForm = true;
      break;
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      let localUri = result.uri;
      let filename = localUri.split("/").pop();

      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;

      setImage({
        uri: localUri,
        type,
        name: filename,
      });
    }
  };

  const submitLog = () => {
    const logData = new FormData();
    const today = new Date();
    logData.append("report", report);
    logData.append("isReport", true);
    logData.append(
      "date",
      `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
    );
    logData.append("image", image);

    // console.log(logData);
    submitReport(logData, token);
  };

  return showForm ? (
    <View>
      <TextInput
        style={styles.input}
        autoCapitalize="sentences"
        placeholder={"Submit your Logbook Entry for Today"}
        autoCorrect={true}
        multiline={true}
        onChangeText={(newText) => setReport(newText)}
      />
      <SettingsButton title="Upload a Picture" onPress={pickImage} />
      <Button
        mode="contained"
        labelStyle={{
          fontSize: 17,
          fontWeight: "bold",
        }}
        color="#62e2f0"
        loading={loading}
        onPress={submitLog}
      >
        Submit
      </Button>
    </View>
  ) : (
    <View>Not Required to Submit Todaay</View>
  );
};
const styles = StyleSheet.create({
  input: {
    marginVertical: 100,
    height: 100,
    justifyContent: "flex-start",
  },
});

export default LogScreen;
