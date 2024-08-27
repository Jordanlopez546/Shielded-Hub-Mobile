import { NavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Dispatch, SetStateAction } from "react";

// Input Btn Common type of string
export type InputBtnProps = {
  text: string;
};

// Custom Input props for Signup and login screens
export type CustomInputProps = InputBtnProps & {
  autoFocus?: boolean;
  value: string;
  onChangeText?: (text: string) => void;
};

// Custom Btn buttons props types
export type CustomBtnProps = InputBtnProps & {
  onPress: () => void;
};

// Stack Navigator screen props types
export type RootStackParams = {
  GetStarted: undefined;
  LogIn: undefined;
  SignUp: undefined;
  TheTabBarNavigators: undefined;
  CredentialItemScreen: CredentialItemScreenParams;
  DrawerStackNavigator: undefined;
};

export type RootStackNavigationProp = StackNavigationProp<RootStackParams>;

// Tab Bar Navigator screen props types
export type TabParamList = {
  Credentials: undefined;
  NewDetail: undefined;
  RecycleBin: undefined;
};

// Tab Bar Navigator screen navigation props type
export type TabNavigatorProps = CredentialItemScreenNavigationOptions & {
  navigation: NavigationProp<TabParamList>;
  isDarkMode?: boolean;
  setIsDarkMode?: React.Dispatch<SetStateAction<boolean>>;
  handleScreenChange: HandleScreenChangeFunction;
};

// Search input props types
export type SearchInputProps = CustomInputProps & {
  iconName: "search" | "at" | "document-outline" | "lock-closed-outline";
  onSearch?: () => void;
  clearSearch?: () => void;
  clearSearchIcon?: boolean;
  multiline?: boolean;
  showDetail?: boolean;
  editable?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  isDarkMode?: boolean;
  isModalVisible?: boolean;
};

// Credential detail item props types
export interface CredentialItemProps {
  credentialId: string;
  credentialTitle: string;
  credentialEmail: string;
  credentialPassword: string;
  credentialNotes?: string;
  createdAt: string;
}

// The Credential component items props
export interface CredentialActualProps {
  item: CredentialItemProps;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  deleteBtn: Function;
  formatDate: Function;
  isDarkMode?: boolean;
  deletingNowStates: any;
}

// Recycle bin item props types
export interface RecycleActualProps {
  item: CredentialItemProps;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  recoverBtn: Function;
  deleteBtn: Function;
  isDarkMode?: boolean;
  formatDate: Function;
  deletingNowStates: any;
}

// Credential Child props types
export interface CredentialChildProps {
  item: CredentialItemProps;
  colour?: string;
  createdText?: string;
  recoverBtn?: () => void;
  deleteBtn?: () => void;
  staticData: CredentialItemProps[];
  setStaticData: Dispatch<SetStateAction<CredentialItemProps[]>>;
  isDarkMode?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

// Recycle bin child props types
// export interface RecycleChildProps {
//   item: CredentialItemProps;
//   colour?: string;
//   expireText?: string;
//   recoverBtn?: () => void;
//   deleteBtn?: () => void;
//   isDarkMode?: boolean;
//   setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
// }

// Credential item screen params prop types
export interface CredentialItemScreenParams {
  credentialId: string;
  credentialTitle: string;
  credentialEmail: string;
  credentialPassword: string;
  credentialNotes?: string;
  setStaticData: Dispatch<SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
}

// Handle screen change function type
export type HandleScreenChangeFunction = (screen: string) => void;

// Credential item screen route prop type
export type CredentialItemScreenRouteProp = RouteProp<
  RootStackParams,
  "CredentialItemScreen"
>;

// Credential item screen props types
export interface CredentialItemScreenProps {
  route: CredentialItemScreenRouteProp;
  navigation: StackNavigationProp<RootStackParams, "CredentialItemScreen">;
}

// Recycle Screen Global Props
export interface RecycleScreenGlobalProps {
  isModalVisible?: boolean;
  setIsModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  currentScreen?: string;
  isDarkMode?: boolean;
  userToken: string;
  setUserToken: React.Dispatch<SetStateAction<string>>;
  setIsDarkMode?: React.Dispatch<React.SetStateAction<boolean>>;
}
// Credential Item screen navigation data(Static data for the app) prop types
export interface CredentialItemScreenNavigationOptions
  extends RecycleScreenGlobalProps {
  userActiveSc?: boolean;
  handleScreenChange: HandleScreenChangeFunction;
}

// Stack credential items props types
export interface StackCredentialItemProps {
  route: CredentialItemScreenRouteProp;
  navigation: StackNavigationProp<RootStackParams, "CredentialItemScreen">;
  isDarkMode?: boolean;
  userToken: string;
}

// Home Stack Navigator Props types
export type HomeStackNavigatorProps = {
  navigation: StackNavigationProp<RootStackParams>;
  route: any;
  setStaticData: React.Dispatch<React.SetStateAction<CredentialItemProps[]>>;
  staticData: CredentialItemProps[];
};

// Toast Notification types
export type ToastNotificationType = {
  message: string;
  iconName: string;
  isDarkMode?: boolean;
  setSuccessNotification?: React.Dispatch<React.SetStateAction<boolean>>;
};

// Credential Context props
export interface CredentialContextProps {
  credentialList: CredentialItemProps[];
  setCredentialList: React.Dispatch<
    React.SetStateAction<CredentialItemProps[]>
  >;
  recycleBList: CredentialItemProps[];
  setRecycleBList: React.Dispatch<React.SetStateAction<CredentialItemProps[]>>;
}

// Theme Context props
export interface ThemeContextProps {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}
