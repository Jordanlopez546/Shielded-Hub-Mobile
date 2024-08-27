import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";

// Initialize variables with font names
let regular = "Poppins-Regular";
let black = "Poppins-Black";
let extraBold = "Poppins-ExtraBold";
let light = "Poppins-Light";
let semiBold = "Poppins-SemiBold";
let thin = "Poppins-Thin";

const MyFonts = () => {
  // Fetching Fonts
  const [fontsLoaded] = useFonts({
    [regular]: require("../fonts/Poppins-Regular.ttf"),
    [black]: require("../fonts/Poppins-Black.ttf"),
    [extraBold]: require("../fonts/Poppins-ExtraBold.ttf"),
    [light]: require("../fonts/Poppins-Light.ttf"),
    [semiBold]: require("../fonts/Poppins-SemiBold.ttf"),
    [thin]: require("../fonts/Poppins-Thin.ttf"),
  });

  // Effect to check font loading status
  useEffect(() => {
    if (!fontsLoaded) {
      console.error("Fonts not loaded!");
    }
  }, [fontsLoaded]);

  return (
    <View>
      {fontsLoaded ? (
        <Text style={{ fontFamily: semiBold }}>MyFonts</Text>
      ) : (
        <Text>Loading fonts...</Text>
      )}
    </View>
  );
};

export default MyFonts;

// Exporting the names of the fonts
export { regular, black, extraBold, light, semiBold, thin };
