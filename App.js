import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import reducers from "./reducers";
import {
  useFonts,
  Alegreya_400Regular,
  Alegreya_400Regular_Italic,
  Alegreya_500Medium,
  Alegreya_500Medium_Italic,
  Alegreya_700Bold,
  Alegreya_700Bold_Italic,
  Alegreya_800ExtraBold,
  Alegreya_800ExtraBold_Italic,
  Alegreya_900Black,
  Alegreya_900Black_Italic,
} from "@expo-google-fonts/alegreya";
import Bottonav from "./screens/Bottonav";
import Message from "./screens/Message";
const Stack = createNativeStackNavigator();
const store = createStore(reducers, compose(applyMiddleware(thunk)));
import React, { useEffect, useState } from "react";
import splash from "./assets/splash.png";
import CreateGroup from "./components/CreateGroup";
import Login from "./screens/Login";
import { loadUser } from "./action/user";
import { baseUrl } from "./config/main";
import Main from "./Main";
import Toast from "react-native-toast-message";

export default function App() {
  let [fontsLoaded] = useFonts({
    Alegreya_400Regular,
    Alegreya_400Regular_Italic,
    Alegreya_500Medium,
    Alegreya_500Medium_Italic,
    Alegreya_700Bold,
    Alegreya_700Bold_Italic,
    Alegreya_800ExtraBold,
    Alegreya_800ExtraBold_Italic,
    Alegreya_900Black,
    Alegreya_900Black_Italic,
  });
  if (!fontsLoaded) {
    return <Text>Is Loading</Text>;
  } else {

    return (
      <Provider store={store}>
        <>
        <Main />
        <Toast />
        </>
       
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
