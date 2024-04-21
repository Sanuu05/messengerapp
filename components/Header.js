import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome5 } from "react-native-vector-icons";
const Header = ({ onPressHeader, onGoBack, data }) => {
  return (
    <View
      style={{
        elevation: 0,
        paddingBottom: 15,
        backgroundColor: "white",
        position: "relative",
        height: 50,
        zIndex: 100,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        top: 0,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#F2F2F2",
          elevation: 0,
          marginLeft: 15,
          height: 45,
          width: 45,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={onGoBack}
      >
        <FontAwesome5
          name="angle-left"
          color="#BFBFBF"
          size={30}
          style={{ marginTop: 0, marginLeft: 0, zIndex: 99 }}
        />
      </TouchableOpacity>
      {data?.name ? (
        <TouchableOpacity onPress={onPressHeader} style={{ marginLeft: 20 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: data?.profilePic
                  ? data?.profilePic
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
              }}
              style={{
                width: 45,
                height: 45,
                resizeMode: "cover",
                borderRadius: 999,
              }}
            />
            <View
              style={{
                marginLeft: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Alegreya_700Bold",
                  textAlign: "center",
                  marginTop: 0,
                  padding: 0,
                  color: "#6B7073",
                }}
              >
                {data?.name}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontFamily: "Alegreya_400Regular",
                  textAlign: "center",
                  marginTop: 0,
                  padding: 0,
                  color: data?.online ? "#86C7BF" : "red",
                }}
              >
                {data?.online ? "Online" : "Offline"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
