import { Platform, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import {
  IsDarkModeContext,
  ModalContext,
  UserTokenContext,
} from "./Global/UISettings";
import { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";
import { CredentialProvider } from "./Global/CredentialContext";
import { HandleScreenChangeFunction } from "./types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export default function App() {
  const modalVal = useContext(ModalContext);
  const isDarkModeVal = useContext(IsDarkModeContext);
  const userTokenval = useContext(UserTokenContext);

  const [isModalVisible, setIsModalVisible] = useState<boolean>(
    modalVal || false
  );
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isDarkModeVal || false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userIsActive, setUserIsActive] = useState<boolean>(true);
  const [userToken, setUserToken] = useState<string>(userTokenval || "");

  const [currentScreen, setCurrentScreen] = useState<string>("Credentials");

  const handleScreenChange: HandleScreenChangeFunction = useCallback(
    (screen: string) => {
      setIsModalVisible(false); // Close modal when switching screens
      setCurrentScreen(screen);
    },
    []
  );

  const changeStatusBarColourAndTheme = () => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "dark-content");
    StatusBar.setBackgroundColor(isDarkMode ? "#1E272E" : "#fff");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1E272E" : "#fff",
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
  });

  useEffect(() => {
    checkTokenAndTheme();
  }, []);

  const checkTokenAndTheme = async () => {
    try {
      const themePreference = await AsyncStorage.getItem("themePreference");
      if (themePreference !== null) {
        setIsDarkMode(themePreference === "dark");
      }
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const saveThemePreference = async () => {
    try {
      await AsyncStorage.setItem(
        "themePreference",
        isDarkMode ? "dark" : "light"
      );
    } catch (err) {
      // Nothing
    }
  };

  useEffect(() => {
    saveThemePreference();
    changeStatusBarColourAndTheme();
  }, [isDarkMode]);

  if (isLoading) {
    return null;
  }

  return (
    <UserTokenContext.Provider value={userToken}>
      <IsDarkModeContext.Provider value={isDarkMode}>
        <CredentialProvider>
          <SafeAreaView style={[styles.container]}>
            <NavigationContainer>
              <StackNavigator
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                currentScreen={currentScreen}
                handleScreenChange={handleScreenChange}
                initialRouteName={"LogIn"}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                userToken={userToken}
                setUserToken={setUserToken}
              />
            </NavigationContainer>
          </SafeAreaView>
        </CredentialProvider>
      </IsDarkModeContext.Provider>
    </UserTokenContext.Provider>
  );
}
