import { memo, useContext } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import {
  CredentialActualProps,
  CredentialItemScreenParams,
  RootStackParams,
  ThemeContextProps,
} from "../../types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ThemeContext } from "../../Global/ThemeContext";

// Credential item component
const Credential = ({
  item,
  setIsModalVisible,
  deleteBtn,
  formatDate,
  deletingNowStates,
  isDarkMode,
}: CredentialActualProps) => {
  // Getting the width of the screen
  const { width } = useWindowDimensions();
  const credentialContainerStyles = {
    width: width * 0.85, // 85% of the screen
  };

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  // Navigate to a credential item
  const navigateToCredentialItem = () => {
    if (setIsModalVisible) {
      setIsModalVisible(false);
    }

    navigation.navigate("CredentialItemScreen", {
      credentialId: item.credentialId,
      credentialTitle: item.credentialTitle,
      credentialEmail: item.credentialEmail,
      credentialPassword: item.credentialPassword,
      credentialNotes: item.credentialNotes,
    } as CredentialItemScreenParams);
  };

  // Confirm deletion before deleting
  const showAlert = () => {
    if (setIsModalVisible) {
      setIsModalVisible(false);
    }

    {
      Alert.alert("Confirm Delete", "Are you sure you want to delete?", [
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
    <TouchableOpacity
      key={item.credentialId}
      activeOpacity={0.4}
      onPress={() => navigateToCredentialItem()}
      style={[
        styles.credentialContainer,
        credentialContainerStyles,
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
              name="trash-2"
              size={25}
              color={isDarkMode ? "#fff" : "#000"}
            />
          </TouchableOpacity>
        ) : (
          <ActivityIndicator color={"dodgerblue"} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default memo(Credential);

const styles = StyleSheet.create({
  credentialContainer: {
    alignSelf: "center",
    borderColor: "#1E90FF",
    borderRadius: 10,
    flexDirection: "row",
    padding: 3,
    borderWidth: 1,
    marginBottom: 10,
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
