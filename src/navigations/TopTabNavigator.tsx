import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TabNavigatorProps, ThemeContextProps } from "../../types/types";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import CredentialsScreen from "../screens/CredentialsScreen";
import NewDetail from "../screens/NewDetail";
import RecycleBinScreen from "../screens/RecycleBinScreen";
import TopBar from "../components/TopBar";
import { BottomSheet } from "../../Global/sheet";
import { ThemeContext } from "../../Global/ThemeContext";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = ({
  isModalVisible,
  setIsModalVisible,
  currentScreen,
  handleScreenChange,
  isDarkMode,
  setIsDarkMode,
  userToken,
  setUserToken,
}: TabNavigatorProps) => {
  // Handle the present modal of the bottom sheet
  const handlePresentModal = () => {
    if (setIsModalVisible) {
      setIsModalVisible(!isModalVisible);
    }
  };

  const closeBottomSheet = () => {
    if (setIsModalVisible) setIsModalVisible(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#1E272E" : "#fff" }}>
      {/* Render the TopBar component here */}
      <TopBar handlePresentModal={handlePresentModal} />

      <Tab.Navigator
        initialRouteName="Credentials"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIndicatorStyle: { backgroundColor: "dodgerblue" },
          tabBarActiveTintColor: "dodgerblue",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: {
            backgroundColor: isDarkMode ? "#1E272E" : "#fff",
          },
        })}
      >
        <Tab.Screen
          name="Credentials"
          listeners={{
            tabPress: (e) => {
              handleScreenChange("Credentials");
            },
          }}
        >
          {(props) => (
            <CredentialsScreen
              {...props}
              currentScreen={currentScreen}
              isModalVisible={isModalVisible}
              setIsModalVisible={setIsModalVisible}
              handleScreenChange={handleScreenChange}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              userToken={userToken}
              setUserToken={setUserToken}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="New Detail"
          listeners={{
            tabPress: (e) => {
              handleScreenChange("New Detail");
            },
          }}
        >
          {(props) => (
            <NewDetail
              {...props}
              currentScreen={currentScreen}
              isModalVisible={isModalVisible}
              userToken={userToken}
              setIsModalVisible={setIsModalVisible}
              handleScreenChange={handleScreenChange}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              setUserToken={setUserToken}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Recycle Bin"
          listeners={{
            tabPress: (e) => {
              handleScreenChange("Recycle Bin");
            },
          }}
        >
          {(props) => (
            <RecycleBinScreen
              currentScreen={currentScreen}
              isModalVisible={isModalVisible}
              userToken={userToken}
              setIsModalVisible={setIsModalVisible}
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
              setUserToken={setUserToken}
              {...props}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>

      {/* Render the BottomSheet component */}
      <BottomSheet
        isVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onClose={closeBottomSheet}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        setUserToken={setUserToken}
      />
    </View>
  );
};

export default TopTabNavigator;
