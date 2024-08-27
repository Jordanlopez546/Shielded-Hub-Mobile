import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import Icon from "react-native-vector-icons/MaterialIcons";
import { ToastNotificationType } from "../types/types";

const ToastNotification = ({
  message,
  iconName,
  setSuccessNotification,
}: ToastNotificationType) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
      setSuccessNotification ? setSuccessNotification(false) : null;
    }, 1000); // Hide the toast after 0.5 seconds

    // Cleanup the timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, []); // Empty dependency array to run only once on mount.

  return isVisible ? (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={{
        top: 40,
        backgroundColor: "#20639B",
        width: "90%",
        position: "absolute",
        borderRadius: 5,
        padding: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        shadowColor: "#003049",
        shadowOpacity: 0.4,
        shadowRadius: 2,
        shadowOffset: { width: 0, height: 1 },
        elevation: 2,
        alignSelf: "center",
      }}
    >
      <Icon name={iconName} size={30} color="#F6F4F4" />
      <View>
        <Text
          style={{
            color: "#F6F4F4",
            fontWeight: "bold",
            marginLeft: 10,
            fontSize: 16,
          }}
        >
          {message}
        </Text>
      </View>
    </Animated.View>
  ) : null; // Render nothing when isVisible is false
};

export default ToastNotification;
