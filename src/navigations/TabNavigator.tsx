import React from "react";
import NewDetail from "../screens/NewDetail";
import { FontAwesome5, Entypo, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavigatorProps } from "../../types/types";
import CredentialsScreen from "../screens/CredentialsScreen";
import RecycleBinScreen from "../screens/RecycleBinScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = ({
  isModalVisible,
  setIsModalVisible,
  currentScreen,
  handleScreenChange,
  isDarkMode,
  setIsDarkMode,
}: TabNavigatorProps) => {
  return (
    <Tab.Navigator
      initialRouteName="Credentials"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#1E272E" : "#000",
        },
        tabBarIcon: ({ focused }) => {
          let iconColor, iconSize;
          iconColor = focused
            ? isDarkMode
              ? "#fff"
              : "#1E90FF"
            : isDarkMode
            ? "rgba(240, 240, 240, 0.6)"
            : "rgba(240, 240, 240, 0.6)";

          iconSize = focused ? 28 : 24;
          if (route.name === "Credentials") {
            return (
              <FontAwesome5 name="tasks" size={iconSize} color={iconColor} />
            );
          } else if (route.name === "New Detail") {
            return (
              <Entypo name="add-to-list" size={iconSize} color={iconColor} />
            );
          } else if (route.name === "Recycle Bin") {
            return (
              <Ionicons
                name="trash-bin-outline"
                size={iconSize}
                color={iconColor}
              />
            );
          }
        },
        tabBarActiveTintColor: isDarkMode ? "#fff" : "#1E90FF", // Active tab text and icon color
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
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            handleScreenChange={handleScreenChange}
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
            setIsModalVisible={setIsModalVisible}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            handleScreenChange={handleScreenChange}
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
            setIsModalVisible={setIsModalVisible}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            {...props}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
