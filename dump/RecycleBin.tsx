import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
  TouchableOpacity,
  Switch,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import TopBar from "../src/components/TopBar";
import SearchInput from "../src/components/SearchInput";
import Credential from "./Credential";
import { RecycleItemProps, RecycleScreenGlobalProps } from "../types/types";
import Recycle from "./Recycle";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

const RecycleBin = ({
  theme,
  setTheme,
  isModalVisible,
  setIsModalVisible,
  isDarkMode,
  setIsDarkMode,
}: RecycleScreenGlobalProps) => {
  const [recyclebinSearch, setRecyclebinSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<RecycleItemProps[]>([]);
  const [recyclebinLoading, setRecyclebinLoading] = useState<boolean>(false);
  const [clearSearchIcon, setClearSearchIcon] = useState<boolean>(false);

  // Getting the width of the screen
  const { width, height } = useWindowDimensions();

  const containerStyles = {
    width: width * 1,
  };

  const staticData: RecycleItemProps[] = [
    {
      id: 1,
      title: "Facebook Login",
    },
    {
      id: 2,
      title: "Whatsapp Login",
    },
    {
      id: 3,
      title: "Instagram Login",
    },
    {
      id: 4,
      title: "Snapchat Login",
    },
  ];

  // Functionality To search for credentials
  const searchRecyclebin = (text: string) => {
    setRecyclebinLoading(true);
    setTimeout(() => {
      const filteredItems = staticData.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filteredItems);
      setRecyclebinLoading(false);
    }, 100); // Simulating an asynchronous search operation
  };

  const renderData = recyclebinSearch ? filteredData : staticData;

  const clearSearch = () => {
    setTimeout(() => {
      setFilteredData([]);
      setRecyclebinSearch("");
    }, 1);
  };

  const recoverBtnFunc = () => {
    console.log("Recovering...");
  };
  const deleteBtnFunc = () => {
    console.log("Deleting...");
  };

  useEffect(() => {
    if (recyclebinSearch) {
      setClearSearchIcon(true);
    } else {
      setClearSearchIcon(false);
    }
  }, [recyclebinSearch]);

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

  useEffect(() => {
    if (!isModalVisible) {
      bottomSheetModalRef.current?.dismiss();
    }

    // Cleanup function to dismiss the modal when the screen unmounts
    return () => {
      bottomSheetModalRef.current?.dismiss();
    };
  }, [isModalVisible]);

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
            value={recyclebinSearch}
            text="Search"
            onChangeText={(text) => {
              setRecyclebinSearch(text);
              searchRecyclebin(text);
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
          {recyclebinLoading ? (
            <ActivityIndicator size={"large"} color={"dodgerblue"} />
          ) : renderData.length > 0 ? (
            <FlatList
              data={renderData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Recycle
                  recoverBtn={recoverBtnFunc}
                  deleteBtn={deleteBtnFunc}
                  expireText="Expires in 30 days"
                  colour="red"
                  item={item}
                  isDarkMode={isDarkMode}
                  setIsModalVisible={setIsModalVisible}
                />
              )}
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
                onChange={
                  setIsDarkMode
                    ? () => setIsDarkMode(!isDarkMode)
                    : () => console.log("")
                }
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

export default RecycleBin;

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
