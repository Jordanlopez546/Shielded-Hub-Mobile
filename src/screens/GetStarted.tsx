import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";
import GetStartedAndLoginImageView from "../components/GetStartedAndLoginImageView";
import TheDoubleCircles from "../components/TheDoubleCircles";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../types/types";

// Get Started Screen
const GetStarted = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.57, // 57% of the screen
    height: height * 0.1, // 10% of the screen
  };
  const secondContainerStyles = {
    width: width * 0.74, // 74% of the screen
    height: height * 0.1, // 10% of the screen
  };

  const handleGetStarted = () => {
    navigation.replace("LogIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.doubleCirclesContainer}>
        <TheDoubleCircles />
      </View>
      <View style={styles.getStartedImageContainer}>
        <GetStartedAndLoginImageView text="second" />
        <View style={[styles.firstTextContainer, containerStyles]}>
          <Text style={styles.firstText}>Secure your credentials</Text>
          <Text style={[styles.firstText]}>with ShieldedHub</Text>
        </View>
      </View>
      <View style={[styles.secondTextContainer, secondContainerStyles]}>
        <Text style={[styles.firstText, { fontWeight: "400" }]}>
          A mobile app to secure your credentials and simplify your security
        </Text>
      </View>
      <View style={styles.CustomBtnContainer}>
        <CustomButton onPress={handleGetStarted} text="Get Started" />
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  doubleCirclesContainer: {
    flex: 0.14,
  },
  getStartedImageContainer: {
    flex: 0.55,
    alignItems: "center",
    justifyContent: "center",
  },
  firstText: {
    fontSize: 18,
    fontWeight: "500",
  },
  firstTextContainer: {
    marginTop: 20,
    justifyContent: "center",
  },
  secondTextContainer: {
    flex: 0.1,
    alignSelf: "center",
    justifyContent: "center",
  },
  CustomBtnContainer: {
    flex: 0.21,
    alignItems: "center",
    justifyContent: "center",
  },
});
