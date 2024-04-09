import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon1 from "react-native-vector-icons/Ionicons";

import React, { useEffect } from "react";
import HomeScreen from "./HomeScreen";
import Message from "./Message";
import Account from "./Account";
import Alluser from "./Alluser";
import socket from "../action/socketManager";
import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator();

const Bottonav = () => {
  const userId = useSelector((state) => state?.user?.user?.user?._id);
  useEffect(() => {
    socket.emit("authenticate", userId);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            let iconName, color, size;
            if (route.name === "Home") {
              iconName = focused ? "chatbubble" : "chatbubble-outline";
              color = focused ? "#557BF3" : "grey";
              size = focused ? 33 : 27;
            } else if (route.name === "All") {
              iconName = focused
                ? "person-circle-sharp"
                : "person-circle-outline";
              color = focused ? "#557BF3" : "grey";
              size = focused ? 33 : 27;
            } else if (route.name === "Account") {
              iconName = focused ? "settings" : "settings-outline";
              color = focused ? "#557BF3" : "grey";
              size = focused ? 33 : 27;
            }
            return <Icon1 name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            // tabBarIcon: () =>
            //   <Icon1 name='md-chatbubbles-sharp' size={32} color="grey" />
          }}
        />

        <Tab.Screen
          name="All"
          component={Alluser}
          options={{
            headerShown: false,
            // tabBarIcon: () =>
            //   <Icon1 name='person-circle-sharp' size={32} color="#557BF3" />
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            headerShown: false,
            // tabBarIcon: () =>
            //   <Icon1 name='settings-outline' size={32} color="#557BF3" />
          }}
        />
        {/* <Tab.Screen name="Message" component={Message} options={{
        headerShown: false,
        tabBarIcon: () =>
          <Icon1 name='home' size={22} color="orange" />


      }} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Bottonav;

const styles = StyleSheet.create({});
