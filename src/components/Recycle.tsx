import { memo, useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { RecycleActualProps, ThemeContextProps } from "../../types/types";
import { AntDesign, Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
import { ThemeContext } from "../../Global/ThemeContext";

// Recycle bin item component
const Recycle = ({
  item,
  setIsModalVisible,
  deleteBtn,
  recoverBtn,
  formatDate,
  deletingNowStates,
  isDarkMode,
}: RecycleActualProps) => {
  // Getting the width of the screen
  const { width } = useWindowDimensions();
  const recycleContainerStyles = {
    width: width * 0.85, // 85% of the screen
  };

  // Show menu alert after clicked
  const showAlert = () => {
    if (setIsModalVisible) {
      setIsModalVisible(false);
    }

    {
      Alert.alert("Confirm", "Choose the respective action", [
        {
          text: "Recover",
          onPress: () => recoverBtn(item.credentialId),
        },
        {
          text: "Delete",
          onPress: () => deleteBtn(item.credentialId),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  };

  return (
    <View
      key={item.credentialId}
      style={[
        styles.recycleContainer,
        recycleContainerStyles,
        { backgroundColor: isDarkMode ? "#1E272E" : "#FFFFFF" },
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
        <Text
          style={[styles.headerText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          {item.credentialTitle}
        </Text>
        <Text
          style={[styles.dateText, { color: isDarkMode ? "#fff" : "#000" }]}
        >
          {formatDate(item.createdAt)}
        </Text>
      </View>
      <View style={styles.secondIconContainer}>
        {!deletingNowStates[item.credentialId] ? (
          <TouchableOpacity onPress={showAlert} activeOpacity={0.3}>
            <Feather
              name="more-vertical"
              size={29}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator color={"dodgerblue"} />
        )}
      </View>
    </View>
  );
};

/*



*/

export default memo(Recycle);

const styles = StyleSheet.create({
  recycleContainer: {
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
