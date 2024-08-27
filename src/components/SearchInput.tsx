import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import { SearchInputProps, ThemeContextProps } from "../../types/types";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "../../Global/ThemeContext";

// Create the input
const SearchInput = ({
  text,
  autoFocus,
  value,
  onChangeText,
  iconName,
  onSearch,
  clearSearch,
  clearSearchIcon,
  multiline,
  showDetail,
  editable,
  setIsModalVisible,
  isDarkMode,
}: SearchInputProps) => {
  // Getting the height and width of the screen
  const { width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const inputContainerStyles = {
    width: width * 0.85, // 85% of the screen
  };

  return (
    <View style={[inputContainerStyles, styles.inputMainCont]}>
      <Ionicons
        name={iconName}
        size={26}
        style={{ marginLeft: 5 }}
        color={isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"}
      />
      <TextInput
        secureTextEntry={showDetail}
        textContentType="password"
        placeholder={text}
        autoFocus={autoFocus}
        value={value}
        multiline={multiline}
        onChangeText={onChangeText}
        placeholderTextColor={
          isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.55)"
        }
        style={[
          styles.inputContainer,
          {
            width: clearSearchIcon ? "80%" : "78%",
            color: isDarkMode ? "#fff" : "#000",
          },
        ]}
        onEndEditing={onSearch}
        editable={editable}
        onPressIn={
          setIsModalVisible
            ? () => setIsModalVisible(false)
            : () => console.log("")
        }
      />
      {clearSearchIcon && (
        <TouchableOpacity onPress={clearSearch}>
          <FontAwesome5
            name="times-circle"
            size={24}
            color={
              isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "transparent",
    alignSelf: "center",
    padding: 10,
    fontSize: 17.5,
    marginVertical: 8,
    height: "100%",
    width: "78%",
    color: "black",
  },
  inputMainCont: {
    borderColor: "rgba(30, 144, 255, 0.77)",
    borderRadius: 10,
    borderWidth: 1,
    alignSelf: "center",
    alignItems: "center",
    height: 50,
    flexDirection: "row",
    paddingRight: 10,
  },
});
