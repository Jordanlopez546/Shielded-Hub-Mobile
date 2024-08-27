import { StyleSheet, TextInput, useWindowDimensions } from "react-native";
import React from "react";
import { CustomInputProps } from "../../types/types";

// Create the input
const Input = ({ text, autoFocus, value, onChangeText }: CustomInputProps) => {
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const inputContainerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.06, // 6% of the screen
  };

  return (
    <TextInput
      placeholder={text}
      placeholderTextColor={"rgba(0, 0, 0, 0.55)"}
      autoFocus={autoFocus}
      value={value}
      onChangeText={onChangeText}
      autoCapitalize="none"
      style={[styles.inputContainer, inputContainerStyles]}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(30, 144, 255, 0.77)",
    fontSize: 17.5,
    marginVertical: 8,
  },
});
