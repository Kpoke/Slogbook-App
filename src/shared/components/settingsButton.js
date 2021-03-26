import React from "react";
import { Button } from "react-native-paper";

const SettingsButton = ({ onPress, title, loading }) => {
  return (
    <Button
      onPress={onPress}
      style={{
        alignSelf: "stretch",
        margin: 20,
      }}
      loading={loading}
      mode="contained"
      color="#62e2f0"
      labelStyle={{
        fontSize: 15,
        fontWeight: "bold",
      }}
    >
      {title}
    </Button>
  );
};

export default SettingsButton;
