import { Alert } from "react-native";

export const verifyEmail = (email) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) {
    Alert.alert("Invalid Email Address");
  } else {
    return true;
  }
};

export function checkIfEmpty() {
  for (let i = 0; i < arguments.length; i++) {
    if (!arguments[i]) return true;
  }
  return false;
}

export const transitionSpec = {
  open: {
    animation: "timing",
    config: {
      duration: 1000,
    },
  },
  close: {
    animation: "timing",
    config: {
      duration: 1000,
    },
  },
};

export const cardStyleInterpolator = ({ current, layouts }) => {
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
      ],
    },
  };
};
