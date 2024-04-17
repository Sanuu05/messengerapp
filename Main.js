import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import Bottonav from "./screens/Bottonav";
import Message from "./screens/Message";
import CreateGroup from "./components/CreateGroup";
import Login from "./screens/Login";
import splash from "./assets/splash.png";
import { useState } from "react";
import { loadUser } from "./action/user";

const Main = () => {
    const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    setIsLoading(true);
    setIsAuthenticated(false);
    loadAuthUser();
  }, []);
  const dispatch = useDispatch()
  const userAuth = useSelector((state) => state.user.user);
  const loadAuthUser = async () => {
    try {
      const data = await dispatch(loadUser());
      console.log({ data });
      if (data?.user?.id) {
        setIsLoading(false);
        setIsAuthenticated(true);
      } else {
        setIsLoading(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  };


  if (isLoading) {
    return <Image source={splash} style={{ width: "100%", flex: 1 }} />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userAuth?.user ? (
          <>
            <Stack.Screen name="Bottom" component={Bottonav} />
            <Stack.Screen name="Msg" component={Message} />
            <Stack.Screen name="CreateGroup" component={CreateGroup} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Login} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
