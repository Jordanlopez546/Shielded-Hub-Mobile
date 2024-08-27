import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { SetStateAction, useState } from "react";
import TheDoubleCircles from "../components/TheDoubleCircles";
import GetStartedAndLoginImageView from "../components/GetStartedAndLoginImageView";
import CustomButton from "../components/CustomButton";
import Input from "../components/Input";
import { RootStackParams } from "../../types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Base_URL } from "../../Urls/Urls";
import * as SecureStore from "expo-secure-store";

// Login Screen
const LogIn = ({
  setUserToken,
}: {
  setUserToken: React.Dispatch<SetStateAction<string>>;
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Getting the height and width of the screen
  const { height, width } = useWindowDimensions();

  // Calculate the height and width based on the current screen dimensions
  const containerStyles = {
    width: width * 0.8, // 80% of the screen
    height: height * 0.05, // 5% of the screen
  };

  const handleLogIn = async () => {
    setLoading(true);

    try {
      // Check if email and password are not empty after trimming
      if (email.trim() !== "" && password.trim() !== "") {
        // Create a user object
        const user = {
          email: email,
          password: password,
        };

        // Make the login request and set a timeout
        const loginUserPromise = axios.post(`${Base_URL}/auth/login`, user);
        const timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(new Error("Login timeout exceeded"));
          }, 4000);
        });

        // Use Promise.race to handle either successful login or timeout
        const loginUser: any = await Promise.race([
          loginUserPromise,
          timeoutPromise,
        ]);

        // Check the status of the login response
        if (loginUser.status === 200) {
          const { token, user } = loginUser.data;
          const userEmail = user.email;
          const userName = user.username;
          const userId = user._id;

          setUserToken(token);
          await SecureStore.setItemAsync("userToken", token);

          // Store user data in AsyncStorage
          await AsyncStorage.setItem("authToken", token);
          await AsyncStorage.setItem("userName", userName);
          await AsyncStorage.setItem("userEmail", userEmail);
          await AsyncStorage.setItem("userId", userId);

          // Reset the navigation stack to only contain "TheTabBarNavigators"
          navigation.reset({
            index: 0,
            routes: [{ name: "TheTabBarNavigators" }],
          });
        } else {
          // Check if it's due to invalid credentials
          if (loginUser.status === 400) {
            Alert.alert("Login Failed", "Invalid email or password.");
          } else {
            Alert.alert(
              "Login Failed",
              "Something went wrong. Please try again."
            );
          }
        }
      } else {
        // Display an alert for incomplete inputs
        Alert.alert("Instruction", "Fill in the inputs completely.");
      }
    } catch (error: any) {
      // Display different alerts based on the type of error
      if (error.message === "Login timeout exceeded") {
        Alert.alert(
          "Login Failed",
          "Login timeout exceeded. Please try again."
        );
      } else {
        Alert.alert("Login Failed", "Invalid Credentials.");
      }
    } finally {
      // Set loading to false, regardless of the outcome
      setLoading(false);
    }
  };

  return (
    <ScrollView
      scrollEnabled
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.container}
    >
      <View style={styles.doubleCirclesContainer}>
        <TheDoubleCircles />
      </View>
      <View style={styles.getStartedImageContainer}>
        <Text style={[styles.firstText, { marginBottom: 15 }]}>
          Welcome back!
        </Text>
        <GetStartedAndLoginImageView text="first" />
      </View>
      <View style={[styles.inputsContainer]}>
        <Input
          autoFocus={true}
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
        <TouchableOpacity activeOpacity={0.3}>
          <Text
            style={[
              styles.firstText,
              {
                color: "rgba(30, 144, 255, 0.77)",
                fontWeight: "400",
                marginVertical: 25,
              },
            ]}
          >
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.CustomBtnContainer}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"dodgerblue"} />
        ) : (
          <CustomButton onPress={handleLogIn} text="Log In" />
        )}
        <View style={[styles.dontHaveContainer, containerStyles]}>
          <Text style={[styles.firstText, { fontWeight: "400", fontSize: 18 }]}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
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
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  doubleCirclesContainer: {
    flex: 0.15,
    marginBottom: 90,
  },
  getStartedImageContainer: {
    flex: 0.78,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 50,
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
    marginBottom: 10,
  },
  CustomBtnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  dontHaveContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 5,
  },
});
