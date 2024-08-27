import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopBar = ({
  handlePresentModal,
}: {
  handlePresentModal?: () => void;
}) => {
  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const [userL, setUserL] = useState<string | null>(null);

  const containerStyles = {
    width: width * 0.82,
  };

  const getUserLetter = async () => {
    try {
      const user = await AsyncStorage.getItem("userName");
      setUserL(user?.charAt(0).toUpperCase() || null);
    } catch (error) {
      // Nothing
    }
  };

  useEffect(() => {
    getUserLetter();
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.overallLogoContainer, containerStyles]}>
        <View style={[styles.logoContainer]}>
          <Image
            style={styles.image}
            source={require("../assets/applogo.png")}
          />
        </View>
        <TouchableOpacity
          onPress={handlePresentModal}
          style={[styles.logoContainer]}
        >
          <Text style={styles.userText}>{userL}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({
  overallLogoContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#1E90FF",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 40,
  },
  userText: {
    fontSize: 33,
    fontWeight: "500",
    color: "white",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginTop: 10
  },
});
