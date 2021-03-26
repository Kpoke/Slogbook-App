import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Button, Card, Avatar, TouchableRipple } from "react-native-paper";

const defaultImage = require("../../../assets/default.jpg");
const Home = ({
  navigate,
  user,
  subArray,
  arrayItemPressable,
  arrayItemOnPressNavigate,
  subtitleStringFunction,
  buttonTitle,
  onPressNavigate,
  titleStringFunction,
  arrayItemExtras,
}) => {
  const wrapper = (WrappedComponent, item) => {
    let extras;
    if (arrayItemExtras) {
      extras = arrayItemExtras(item);
    }
    let pressable = arrayItemPressable;
    if (user.role === "Supervisor" || user.role === "IndustrySupervisor") {
      pressable = pressable && item.message.length > 0;
    }
    return pressable ? (
      <TouchableRipple
        onPress={() => navigate(arrayItemOnPressNavigate, { item, extras })}
      >
        {WrappedComponent}
      </TouchableRipple>
    ) : (
      WrappedComponent
    );
  };

  let username = "";
  let array = [];
  let userAvatar = defaultImage;
  if (user) {
    array = subArray;
    username = user.username;
    if (user.avatarUrl) {
      userAvatar = { uri: user.avatarUrl };
    }
  }

  const _renderItem = ({ item }) => {
    let source = defaultImage;
    if (item.avatarUrl) {
      source = { uri: item.avatarUrl };
    }
    if (item.imageUrl) {
      source = { uri: item.imageUrl };
    }
    return wrapper(
      <Card.Title
        style={{
          margin: 10,
          borderWidth: 2,
          padding: 5,
          borderColor: "#62e2f0",
        }}
        title={titleStringFunction(item)}
        subtitle={subtitleStringFunction(item)}
        left={(props) => <Avatar.Image {...props} source={source} />}
      />,
      item
    );
  };
  return (
    <View style={styles.container}>
      <Card.Title
        style={styles.nameStyle}
        title={username}
        titleStyle={{
          fontSize: 30,
          fontWeight: "600",
          marginLeft: 40,
          paddingTop: 7,
          color: "red",
        }}
        left={(props) => <Avatar.Image {...props} source={userAvatar} />}
      />

      <FlatList
        data={array}
        keyExtractor={(item) => item._id}
        renderItem={_renderItem}
        style={{ alignSelf: "stretch" }}
      />

      {buttonTitle ? (
        <Button
          style={[styles.buttonContainer]}
          mode="contained"
          color="#62e2f0"
          onPress={() => navigate(onPressNavigate)}
          labelStyle={{
            fontSize: 17,
            fontWeight: "bold",
          }}
        >
          {buttonTitle}
        </Button>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: "center",
  },
  nameStyle: {
    marginLeft: 0,
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Home;
