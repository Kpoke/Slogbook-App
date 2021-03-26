import React, { useEffect, useCallback } from "react";
import { StackActions } from "@react-navigation/native";
import { StyleSheet, View, Image } from "react-native";
import { useDispatch } from "react-redux";

import * as actions from "../store/actions/";

const LoadingScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const checkAuthState = useCallback(() => dispatch(actions.authCheckState()), [
    dispatch,
  ]);
  useEffect(() => {
    setTimeout(() => {
      checkAuthState();
    }, 3000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo.png")}
        style={styles.backgroundImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "center",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderWidth: 2,
  },
});

export default LoadingScreen;
