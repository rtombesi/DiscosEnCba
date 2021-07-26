import React from "react";
import { Image, StyleSheet } from "react-native";

export default function logo() {
  return (
    <Image
      source={require("../../assets/img/icon.png")}
      resizeMode="contain"
      style={styles.logo}
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 55,
    height: 55,
    marginRight: 15,
  },
});
