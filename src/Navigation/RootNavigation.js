import * as React from "react";
import { StackActions } from "@react-navigation/native";

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export const reset = (name, params) => {
  navigationRef.current?.reset({
    routes: [{ name, params }],
  });
};
