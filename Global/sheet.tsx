import { useContext, useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import {
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { PanGestureHandler } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialContextProps, RootStackParams } from "../types/types";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as SecureStore from "expo-secure-store";
import { CredentialContext } from "./CredentialContext";

export const BottomSheet = ({
  isVisible,
  onClose,
  setIsModalVisible,
  setIsDarkMode,
  isDarkMode,
  setUserToken,
}: any) => {
  // Getting the width of the screen
  const { height } = useWindowDimensions();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const { setCredentialList, setRecycleBList } = useContext(
    CredentialContext
  ) as CredentialContextProps;

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const sheetHeight = height * 0.4;

  const translateY = useSharedValue(sheetHeight);

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startY: number }) => {
      ctx.startY = translateY.value;
      cancelAnimation(translateY);
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const toValue = event.velocityY > 0 ? sheetHeight : 0;
      translateY.value = withSpring(toValue, { damping: 10, stiffness: 100 });

      if (toValue === sheetHeight && isVisible) {
        // Dragged down completely, close the modal
        runOnJS(onClose)();
        runOnJS(setIsModalVisible)(false);
      }
    },
  });

  const handleShowSheet = () => {
    translateY.value = withSpring(0, { damping: 10, stiffness: 100 });
  };

  const handleHideSheet = () => {
    translateY.value = withSpring(sheetHeight, { damping: 10, stiffness: 100 });
  };

  // ALTERNATIVES IF I NEED TO
  // const handleShowSheet = () => {
  //   translateY.value = withTiming(0, {
  //     duration: 300,
  //     easing: Easing.inOut(Easing.linear),
  //   });
  // };

  // const handleHideSheet = () => {
  //   translateY.value = withTiming(
  //     sheetHeight.height,
  //     { duration: 300, easing: Easing.inOut(Easing.linear) },
  //     () => {
  //       runOnJS(onClose)();
  //     }
  //   );
  // };

  // React to changes in isVisible prop
  useEffect(() => {
    getUser();
    if (isVisible) {
      handleShowSheet();
    } else {
      handleHideSheet();
    }
  }, [isVisible]);

  const handleThemeChange = () => {
    setIsDarkMode(!isDarkMode);
    setIsModalVisible(false);
  };

  const getUser = async () => {
    try {
      const name = await AsyncStorage.getItem("userName");
      const email = await AsyncStorage.getItem("userEmail");

      // Update state with user information
      setUserName(name);
      setUserEmail(email);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      setUserToken(null);

      await SecureStore.deleteItemAsync("userToken");

      // Remove user data from AsyncStorage
      await AsyncStorage.removeItem("authToken");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userId");

      await AsyncStorage.clear();

      setCredentialList([]);
      setRecycleBList([]);

      setIsModalVisible(false);

      // Reset the navigation stack to only contain the login screen
      navigation.reset({
        index: 0,
        routes: [{ name: "LogIn" }],
      });
    } catch (error) {
      // Handle any errors that occur during logout
      console.error("Error logging out:", error);
      Alert.alert(
        "Logout Failed",
        "An error occurred while logging out. Please try again."
      );
    }
  };

  const styles2 = StyleSheet.create({
    bottomSheet: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      padding: 20,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      height: sheetHeight,
      borderColor: "white",
      borderWidth: 0.5,
      backgroundColor: isDarkMode ? "#1E272E" : "#0373fc",
    },
    line: {
      height: 4,
      width: 40,
      backgroundColor: "white",
      alignSelf: "center",
      borderRadius: 2,
      marginBottom: 20,
    },
    content: {
      alignItems: "center",
      flexDirection: "row",
      flex: 0.26,
      justifyContent: "space-between",
      marginBottom: 10,
      padding: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#fff",
    },
    nameText: {
      fontWeight: "500",
      fontSize: 16,
      maxWidth: "90%",
      color: "#E0E0E0",
    },
    logOutDarkMView: {
      flexDirection: "row",
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles2.bottomSheet, bottomSheetStyle]}>
        <View style={styles2.line} />
        <View style={styles2.content}>
          <Text style={styles2.nameText}>{userName}</Text>
          <FontAwesome5 name="user-alt" size={22} color="#E0E0E0" />
        </View>
        <View style={styles2.content}>
          <Text style={styles2.nameText}>{userEmail}</Text>
          <Entypo name="email" size={22} color="#E0E0E0" />
        </View>
        <View style={[styles2.content]}>
          <TouchableOpacity
            onPress={handleLogOut}
            style={[styles2.logOutDarkMView]}
          >
            <Text style={styles2.nameText}>Log Out</Text>
            <AntDesign name="logout" size={22} color="#E0E0E0" />
          </TouchableOpacity>
        </View>
        <View style={[styles2.content]}>
          <TouchableOpacity
            onPress={handleThemeChange}
            style={styles2.logOutDarkMView}
          >
            <Text style={styles2.nameText}>
              {isDarkMode ? "Light" : "Dark"} Mode
            </Text>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={22}
              color="#E0E0E0"
            />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
