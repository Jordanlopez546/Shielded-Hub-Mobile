import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import TheDoubleCircles from "../components/TheDoubleCircles";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { RootStackParams } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import axios from "axios";
import { Base_URL } from "../../Urls/Urls";

// Signup Screen
const SignUp = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.05, // 5% of the screen
  };

  const handleSignUp = async () => {
    setLoading(true);
    try {
      if (password === confirmPassword) {
        if (
          email.trim() !== "" &&
          password.trim() !== "" &&
          username.trim() !== "" &&
          confirmPassword.trim() !== ""
        ) {
          const user = {
            email: email,
            password: password,
            username: username,
          };

          const registerUser = await axios.post(
            `${Base_URL}/auth/register`,
            user
          );

          if (registerUser.status === 200) {
            navigation.replace("LogIn");
          } else {
            Alert.alert("Signup Failed", "User already exists.");
          }
        } else {
          Alert.alert("Instruction", "Fill in the inputs completely.");
        }
      } else {
        Alert.alert("Wrong Password", "Passwords does not match.");
      }
    } catch (error: any) {
      Alert.alert("Signup Failed", "User already exists.");
    }
    setLoading(false);
  };

  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    StatusBar.setBackgroundColor("white");
  }, []);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.doubleCirclesContainer}>
        <TheDoubleCircles />
      </View>
      <View style={styles.getStartedImageContainer}>
        <Text style={[styles.firstText, { marginBottom: 40 }]}>
          Welcome to ShieldedHub!
        </Text>
        <Text
          style={[styles.firstText, { marginBottom: 20, fontWeight: "400" }]}
        >
          Please sign up below
        </Text>
        <Input
          autoFocus={true}
          value={username}
          onChangeText={(text) => setUsername(text)}
          text="Enter a username"
        />
        <Input
          autoFocus={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
          text="Enter your email"
        />
        <Input
          autoFocus={false}
          value={password}
          onChangeText={(text) => setPassword(text)}
          text="Enter your password"
        />
        <Input
          autoFocus={false}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          text="Confirm password"
        />
        <View style={{ marginTop: 20 }}>
          {loading ? (
            <ActivityIndicator size={"large"} color={"dodgerblue"} />
          ) : (
            <CustomButton onPress={handleSignUp} text="Register" />
          )}
        </View>
        <View style={[styles.dontHaveContainer, containerStyles]}>
          <Text style={[styles.firstText, { fontWeight: "400", fontSize: 18 }]}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("LogIn")}
            activeOpacity={0.3}
          >
            <Text
              style={[
                styles.firstText,
                {
                  color: "rgba(30, 144, 255, 0.9)",
                  fontWeight: "500",
                  fontSize: 18,
                },
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  doubleCirclesContainer: {
    flex: 0.15,
    marginBottom: 150,
  },
  getStartedImageContainer: {
    flex: 0.85,
    alignItems: "center",
    justifyContent: "center",
  },
  firstText: {
    fontSize: 20,
    fontWeight: "500",
  },
  firstTextContainer: {
    marginTop: 20,
    justifyContent: "center",
  },
  inputsContainer: {
    alignItems: "center",
  },
  CustomBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
