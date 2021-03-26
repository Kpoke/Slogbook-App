import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { FontAwesome5, FontAwesome, Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsSreen";
import LogScreen from "../screens/LogScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const isStudent = useSelector((state) => state.auth.user?.role === "Student");
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (props) => (
            <FontAwesome5 name="home" size={props.size} color={props.color} />
          ),
        }}
      />
      {isStudent ? (
        <Tab.Screen
          name="Submit a Log"
          component={LogScreen}
          options={{
            tabBarIcon: (props) => (
              <FontAwesome
                name="pencil"
                size={props.size}
                color={props.color}
              />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: (props) => (
            <Ionicons
              name="md-settings"
              size={props.size}
              color={props.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
