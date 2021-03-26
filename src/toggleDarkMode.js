import React from "react";
import { useTheme, Switch, Text } from "react-native-paper";
import { View } from "react-native";

import { PreferencesContext } from "./context";

const ToggleDarkMode = () => {
  const theme = useTheme();
  const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

  return (
    <View
      style={{
        margin: 10,
      }}
    >
      <Switch
        style={[{ borderColor: theme.colors.primary }]}
        color={"red"}
        value={isThemeDark}
        onValueChange={toggleTheme}
      />
    </View>
  );
};

export default ToggleDarkMode;
