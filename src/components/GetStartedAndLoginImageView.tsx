import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { InputBtnProps } from "../../types/types";

const GetStartedAndLoginImageView = ({ text }: InputBtnProps) => {
  const imagePaths = {
    first: require("../assets/image1.png"),
    second: require("../assets/image2.png"),
  };

  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.5, // 33% of the screen
    height: height * 0.22, // 22% of the screen
  };

  return (
    <View style={[styles.imageContainer, containerStyles]}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={text === "first" ? imagePaths.first : imagePaths.second}
      />
    </View>
  );
};

export default GetStartedAndLoginImageView;

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    transform: [{ rotate: "-5deg" }],
  },
});
