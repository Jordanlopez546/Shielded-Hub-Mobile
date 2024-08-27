import {
  Alert,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";
import { RecycleChildProps } from "../types/types";

const Recycle = ({
  item,
  colour,
  expireText,
  recoverBtn,
  deleteBtn,
  isDarkMode,
  setIsModalVisible,
}: RecycleChildProps) => {
  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    // height: height * 0.08, // 8% of the screen
  };

  const showAlert = () => {
    if (setIsModalVisible) {
      setIsModalVisible(false);
    }

    {
      recoverBtn
        ? Alert.alert("Confirm", "Choose the respective action", [
            {
              text: "Recover",
              onPress: () => recoverBtn && recoverBtn(),
            },
            {
              text: "Delete",
              onPress: () => deleteBtn && deleteBtn(),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ])
        : Alert.alert("Confirm", "Choose the respective action", [
            {
              text: "Delete",
              onPress: () => deleteBtn && deleteBtn(),
            },
            {
              text: "Cancel",
              style: "cancel",
            },
          ]);
    }
  };

  return (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.4}
      style={[
        styles.credentialContainer,
        containerStyles,
        { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
      ]}
    >
      <View style={styles.firstIconContainer}>
        <AntDesign
          name="profile"
          size={25}
          color={isDarkMode ? "#fff" : "#000"}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.headerText, { color: colour ? colour : "black" }]}>
          {item.title.length > 25
            ? item.title.substring(0, 20) + "..."
            : item.title}
        </Text>
        <Text style={[styles.dateText, { color: colour ? colour : "black" }]}>
          {expireText ? expireText : "Today, 16:45"}
        </Text>
      </View>
      <View style={styles.secondIconContainer}>
        <TouchableOpacity onPress={showAlert} activeOpacity={-0.3}>
          <Feather
            name="more-vertical"
            size={29}
            color={isDarkMode ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default Recycle;

const styles = StyleSheet.create({
  credentialContainer: {
    alignSelf: "center",
    borderColor: "#1E90FF",
    borderRadius: 10,
    flexDirection: "row",
    padding: 3,
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: "white",
  },
  firstIconContainer: {
    width: "10%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secondIconContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    width: "80%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    paddingHorizontal: 10,
  },
  headerText: {
    fontWeight: "400",
    fontSize: 17,
    marginBottom: 5,
  },
  dateText: {
    fontWeight: "300",
    fontSize: 15,
  },
});
