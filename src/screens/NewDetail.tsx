import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext, useState } from "react";
import TopBar from "../components/TopBar";
import SearchInput from "../components/SearchInput";
import {
  CredentialContextProps,
  CredentialItemProps,
  CredentialItemScreenNavigationOptions,
  RootStackParams,
  ThemeContextProps,
} from "../../types/types";
import { BottomSheet } from "../../Global/sheet";
import ToastNotification from "../../Global/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Base_URL } from "../../Urls/Urls";
import { CredentialContext } from "../../Global/CredentialContext";
import { ThemeContext } from "../../Global/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const NewDetail = ({
  isModalVisible,
  setIsModalVisible,
  setIsDarkMode,
  isDarkMode,
  userToken: token,
}: CredentialItemScreenNavigationOptions) => {
  const [title, setTitle] = useState<string>("");
  const [emailOrUsername, setEmailOrUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [showPassword, setShowPassword] = useState(true);
  const [successNotification, setSuccessNotification] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);

  const { setCredentialList } = useContext(
    CredentialContext
  ) as CredentialContextProps;

  const handleAddCredentials = async () => {
    try {
      if (
        title.trim() !== "" &&
        emailOrUsername.trim() !== "" &&
        password.trim() !== ""
      ) {
        setCreateLoading(true);
        const credentialItem = {
          credentialTitle: title,
          credentialEmail: emailOrUsername,
          credentialPassword: password,
          credentialNotes: notes,
        };

        const { data } = await axios.post(
          `${Base_URL}/user/addCredential`,
          credentialItem,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Update the credentials state with the new credential
        setCredentialList((prevCredentials: CredentialItemProps[]) => [
          data,
          ...prevCredentials,
        ]);

        setCreateLoading(false);

        setSuccessNotification(true);

        // Clear the input fields
        setEmailOrUsername("");
        setTitle("");
        setNotes("");
        setPassword("");
      } else {
        Alert.alert("Instruction", "Please fill in the inputs.", [
          {
            text: "Okay",
            style: "cancel",
          },
        ]);
      }
    } catch (e) {}
  };

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const noteInputContainerStyles = {
    width: width * 0.85,
    height: height * 0.16,
  };

  const clearOrCreateContainerWidth = {
    width: width * 0.8,
  };

  const handleClearInputs = () => {
    setTitle("");
    setEmailOrUsername("");
    setPassword("");
    setNotes("");
  };

  const responsiveMargin = width * 0.12;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#1E272E" : "#FFFFFF", paddingTop: 10 },
      ]}
    >
      <View>
        <View style={[styles.inputMargin]}>
          <SearchInput
            iconName={"document-outline"}
            value={title}
            onChangeText={(text) => setTitle(text)}
            text="Title of Credential"
            setIsModalVisible={setIsModalVisible}
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"at"}
            value={emailOrUsername}
            onChangeText={(text) => setEmailOrUsername(text)}
            autoFocus={false}
            text="Email/Username"
            setIsModalVisible={setIsModalVisible}
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.inputMargin}>
          <SearchInput
            iconName={"lock-closed-outline"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoFocus={false}
            text="Password"
            showDetail={showPassword}
            setIsModalVisible={setIsModalVisible}
            isDarkMode={isDarkMode}
          />
          {password && (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ position: "absolute", right: responsiveMargin }}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text
                style={[
                  styles.showHideText,
                  { color: isDarkMode ? "white" : "blue" },
                ]}
              >
                {showPassword ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TextInput
          value={notes}
          onChangeText={(text) => setNotes(text)}
          textAlignVertical="top"
          multiline={true}
          placeholder="Notes(Optional)"
          placeholderTextColor={
            isDarkMode ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
          }
          style={[
            styles.noteInput,
            noteInputContainerStyles,
            { color: isDarkMode ? "white" : "black" },
          ]}
          onPressIn={
            setIsModalVisible
              ? () => setIsModalVisible(false)
              : () => console.log("")
          }
        />
        <View
          style={[
            styles.createOrClearTextContainer,
            clearOrCreateContainerWidth,
          ]}
        >
          <TouchableOpacity
            onPress={() => handleClearInputs()}
            activeOpacity={0.3}
          >
            <Text
              style={[
                styles.createOrClearText,
                { color: isDarkMode ? "white" : "black" },
              ]}
            >
              Clear
            </Text>
          </TouchableOpacity>
          {createLoading ? (
            <ActivityIndicator size={"small"} color={"dodgerblue"} />
          ) : (
            <TouchableOpacity
              onPress={() => handleAddCredentials()}
              activeOpacity={0.3}
            >
              <Text
                style={[
                  styles.createOrClearText,
                  { color: isDarkMode ? "white" : "black" },
                ]}
              >
                Create
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {successNotification ? (
        <ToastNotification
          message="Credential Added."
          iconName="done"
          setSuccessNotification={setSuccessNotification}
        />
      ) : null}
    </View>
  );
};

export default NewDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    marginBottom: 20,
  },
  noteInput: {
    borderWidth: 1,
    borderColor: "#1E90FF",
    alignSelf: "center",
    borderRadius: 10,
    padding: 15,
    fontSize: 17.5,
  },
  createOrClearTextContainer: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  createOrClearText: {
    fontSize: 21,
  },
  inputMargin: {
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  showHideText: {
    color: "blue",
  },
});
