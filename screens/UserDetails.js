import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "react-native-vector-icons";
import Header from "../components/Header";
const UserDetails = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F2F2F2",
      }}
    >
      <View style={{ paddingVertical: 10, backgroundColor: "white" }}>
        <Header onGoBack={() => navigation.goBack()} />
        <View style={{ paddingTop: 5}}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{
                uri:
                  userDetails?.profilePic ??
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 999,
                resizeMode: "cover",
              }}
            />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                fontFamily: "Alegreya_700Bold",
                letterSpacing: 1,
              }}
            >
              {userDetails?.name ?? "San Saha"}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontFamily: "Alegreya_400Regular",
                color: "grey",
                letterSpacing: 1,
              }}
            >
              {userDetails?.email ?? "sansaha0505@gmail.com"}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: "white",
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Alegreya_700Bold",
            letterSpacing: 1,
          }}
        >
          {"Hey there! I am using Whatsapp "}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Alegreya_400Regular",
            color: "grey",
            letterSpacing: 1,
          }}
        >
          {"28 December 2023"}
        </Text>
      </View>
      <View
        style={{
          padding: 10,
          backgroundColor: "white",
          marginVertical: 0,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Alegreya_400Regular",
            color: "grey",
            letterSpacing: 1,
          }}
        >
          Media , links , docs
        </Text>
        <FontAwesome5
          name="angle-right"
          color="#BFBFBF"
          size={25}
          style={{ marginTop: 0, marginLeft: 0, zIndex: 99 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({});
