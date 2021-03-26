import React from "react";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import merge from "deepmerge";

import { navigationRef } from "./RootNavigation";
import LoadingScreen from "../screens/LoadingScreen";
import LandingScreen from "../screens/LandingScreen";
import Login from "../screens/LoginScreen";
import AdminRegisterScreen from "../screens/Administrator/adminregister";
import HomeTabs from "./TabNavigation";
import { PreferencesContext } from "../context";
import SupervisorCreate from "../screens/SupervisorCreateScreen";
import { transitionSpec, cardStyleInterpolator } from "../utility";
import StudentCreate from "../screens/StudentCreateScreen";
import StudentUpdate from "../screens/StudentUpdateScreen";
import MessageScreen from "../screens/MessageScreen";

const CombinedDefaultTheme = merge(PaperDefaultTheme, NavigationDefaultTheme);
const CombinedDarkTheme = merge(PaperDarkTheme, NavigationDarkTheme);

const Stack = createStackNavigator();
const MainApp = () => {
  const [isThemeDark, setIsThemeDark] = React.useState(false);

  let theme = isThemeDark
    ? {
        ...CombinedDarkTheme,
        roundness: 2,
        colors: {
          ...CombinedDarkTheme.colors,
          text: "#fff",
        },
      }
    : {
        ...CombinedDefaultTheme,
        roundness: 2,
        colors: {
          ...CombinedDefaultTheme.colors,
          primary: "#db1b0d",
          accent: "#fce786",
          text: "#1c0200",
        },
      };

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  const role = useSelector((state) => state.auth.user?.role);

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme} ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerTitleAlign: "center",
            }}
          >
            <Stack.Screen
              name="Loading"
              component={LoadingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={({ route }) => ({
                title: ` ${route.params.title} Login `,
              })}
            />
            <Stack.Screen
              name="AdminRegister"
              component={AdminRegisterScreen}
              options={{
                headerTitle: "Create an Administrator Account",
              }}
            />
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{
                headerShown: false,
              }}
            />

            {role === "Administrator" ? (
              <Stack.Screen
                name="SupervisorRegister"
                component={SupervisorCreate}
                options={{
                  headerTitle: "Create a Supervisor Account",
                  transitionSpec: transitionSpec,
                }}
                screenOptions={{
                  cardStyleInterpolar: cardStyleInterpolator,
                }}
              />
            ) : null}

            {role === "Supervisor" ? (
              <Stack.Screen
                name="StudentRegister"
                component={StudentCreate}
                options={{
                  headerTitle: "Create a Student Account",
                  transitionSpec: transitionSpec,
                }}
                screenOptions={{
                  cardStyleInterpolar: cardStyleInterpolator,
                }}
              />
            ) : null}

            {role === "Student" ? (
              <Stack.Screen
                name="StudentUpdate"
                component={StudentUpdate}
                options={{
                  headerTitle: "Update your Student Account",
                  transitionSpec: transitionSpec,
                }}
                screenOptions={{
                  cardStyleInterpolar: cardStyleInterpolator,
                }}
              />
            ) : null}

            {role === "Student" ||
            role === "Supervisor" ||
            role === "IndustrySupervisor" ? (
              <Stack.Screen
                name="Message"
                component={MessageScreen}
                options={{
                  headerShown: false,
                }}
              />
            ) : null}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
};

export default MainApp;
