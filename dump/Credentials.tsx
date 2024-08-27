import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import TopBar from "../src/components/TopBar";
import SearchInput from "../src/components/SearchInput";
import Credential from "./Credential";
import {
  CredentialItemProps,
  CredentialItemScreenNavigationOptions,
} from "../types/types";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Credentials = ({
  credentials: staticData,
  setCredentialsData: setStaticData,
  theme,
  setTheme,
  isModalVisible,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: CredentialItemScreenNavigationOptions) => {
  const [credentialSearch, setCredentialSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<CredentialItemProps[]>([]);
  const [credentialLoading, setCredentialLoading] = useState<boolean>(false);
  const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const containerStyles = {
    width: width * 1,
  };

  // Functionality To search for credentials
  const searchCredential = (text: string) => {
    setCredentialLoading(true);
    setTimeout(() => {
      const filteredItems = staticData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
      setCredentialLoading(false);
    }, 100); // Simulating an asynchronous search operation
  };

  const renderData = credentialSearch ? filteredData : staticData;

  const clearSearch = () => {
    setTimeout(() => {
      setFilteredData([]);
      setCredentialSearch("");
    }, 1);
  };

  useEffect(() => {
    if (!isModalVisible) {
      bottomSheetModalRef.current?.dismiss();
    }

    // Cleanup function to dismiss the modal when the screen unmounts
    return () => {
      bottomSheetModalRef.current?.dismiss();
    };
  }, [isModalVisible]);

  useEffect(() => {
    if (credentialSearch) {
      setClearSearchIcon(true);
    } else {
      setClearSearchIcon(false);
    }
  }, [credentialSearch]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // holds the amount of height of the bottom sheet of the screen
  const snapPoints = ["35%", "60%"];

  const handlePresentModal = () => {
    if (setIsModalVisible) {
      setIsModalVisible(!isModalVisible);

      if (isModalVisible) {
        bottomSheetModalRef.current?.dismiss();
      } else {
        bottomSheetModalRef.current?.present();
      }
    }
  };

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
        ]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={[
            styles.topBarContainer,
            containerStyles,
            { backgroundColor: isDarkMode ? "#1E272E" : "#fff" },
          ]}
        >
          <TopBar handlePresentModal={handlePresentModal} />
          <SearchInput
            autoFocus={false}
            value={credentialSearch}
            text="Search"
            onChangeText={(text) => {
              setCredentialSearch(text);
              searchCredential(text);
            }}
            iconName={"search"}
            onSearch={() => {}}
            clearSearch={clearSearch}
            clearSearchIcon={clearSearchIcon}
            setIsModalVisible={setIsModalVisible}
            isDarkMode={isDarkMode}
          />
        </View>
        <View style={styles.credentialsContainer}>
          {credentialLoading ? (
            <ActivityIndicator size={"large"} color={"dodgerblue"} />
          ) : renderData.length > 0 ? (
            <FlashList
              data={renderData}
              renderItem={({ item }) => (
                <Credential
                  staticData={staticData}
                  setStaticData={setStaticData}
                  item={item}
                  isDarkMode={isDarkMode}
                  setIsModalVisible={setIsModalVisible}
                />
              )}
              estimatedItemSize={renderData.length}
            />
          ) : (
            <Text
              style={[
                styles.noDataText,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              No available data
            </Text>
          )}
        </View>
        <BottomSheetModal
          backgroundStyle={{
            borderRadius: 20,
            borderColor: "white",
            borderWidth: 0.5,
            backgroundColor: isDarkMode ? "#1E272E" : "rgba(30, 144, 255, 0.9)",
          }}
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onDismiss={
            setIsModalVisible
              ? () => setIsModalVisible(false)
              : () => console.log("")
          }
        >
          <View style={styles.contentContainer}>
            <Text style={[styles.title, { marginBottom: 20 }]}>
              Jordan Lopez
            </Text>
            <Text style={[styles.title, { marginBottom: 20 }]}>
              stevjaytech@gmail.com
            </Text>
            <View style={styles.row}>
              <Text style={styles.subtitle}>Dark mode</Text>
              <Switch
                thumbColor={"white"}
                trackColor={{ false: "grey", true: "black" }}
                value={isDarkMode}
                // onChange={
                //   setIsDarkMode
                //     ? () => setIsDarkMode(!isDarkMode)
                //     : () => console.log("")
                // }
                onValueChange={setIsDarkMode}
              />
            </View>
            <TouchableOpacity>
              <Text
                style={[
                  styles.title,
                  {
                    marginVertical: 20,
                    color: isDarkMode ? "#fff" : "#000",
                    fontSize: 18.6,
                  },
                ]}
              >
                Log Out
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  );
};

export default Credentials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBarContainer: {
    flex: 0.2,
    marginBottom: 25,
  },
  credentialsContainer: {
    flex: 0.8,
  },
  noDataText: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 17,
    color: "#fff",
  },
  subtitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
