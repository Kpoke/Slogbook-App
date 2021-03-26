import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";

import SettingsButton from "../shared/components/settingsButton";
import * as actions from "../store/actions";
import ToggleDarkMode from "../toggleDarkMode";

const SettingsScreen = () => {
  const { loading, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const logout = useCallback(() => {
    dispatch(actions.logout());
  }, [dispatch]);

  const uploadAvatar = useCallback(
    (formData, token) => {
      dispatch(actions.updateAvatar(formData, token));
    },
    [dispatch]
  );

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

      const imageData = new FormData();
      imageData.append("avatar", {
        uri: localUri,
        type,
        name: filename,
      });
      uploadAvatar(imageData, token);
    }
  };

  return (
    <View style={styles.container}>
      <SettingsButton
        title="Change Profile Picture"
        onPress={pickImage}
        loading={loading}
      />
      <SettingsButton title="Sign Out" onPress={logout} />
      <ToggleDarkMode />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
