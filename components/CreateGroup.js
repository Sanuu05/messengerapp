import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  usef,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon1 from "react-native-vector-icons/FontAwesome5";
import { AntDesign } from "react-native-vector-icons/";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { getalluser } from "../action/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const CreateGroup = () => {
  const port = "https://veajqzj9se.execute-api.ap-south-1.amazonaws.com";
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.all.alluser);
  console.log({ allUsers });
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getalluser());

      // const socket = io(port)
      // socket.on('new-message', function (data) {
      //     // console.log('Got announcement:', data);
      //     setreload(data)
      //     // setModalVisible(false)
      // });
    }, [dispatch])
  );

  const selectUserFun = (id) => {
    if (selectedUsers?.includes(id)) {
      setSelectedUsers(selectedUsers?.filter((item) => item != id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  const createGroupFun = async () => {
    try {
      console.log(">>>>>>>>");
      const token = await AsyncStorage.getItem("tokenmain");
      const { data } = await axios.post(
        `${port}/auth/creategrp`,
        { name: name, members: selectedUsers },
        { headers: { "x-auth-token": token } }
      );
      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", data);
      if (data?._id) {
        navigation.replace("Msg", {...data,type:"group"});
      }
    } catch (error) {
      console.log("errr", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#A4B4FE" }}>
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
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon1
          name="angle-left"
          color="#BFBFBF"
          size={30}
          style={{ marginTop: 0, marginLeft: 0, zIndex: 99 }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "column",
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 100,
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "orange",
          }}
        >
          <View
            style={{
              height: 85,
              width: 85,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              backgroundColor: "#F2F2F2",
            }}
          >
            <Icon1 name="user" size={50} />
          </View>
        </View>
        <TextInput
          placeholder="Group Name"
          value={name}
          style={{
            backgroundColor: "#FFF",
            width: "80%",
            height: 50,
            paddingHorizontal: 10,
            marginVertical: 10,
            borderRadius: 10,
            marginHorizontal: 5,
            fontSize: 17,
            fontFamily: "Alegreya_700Bold",
          }}
          onChangeText={(text) => {
            setName(text);
          }}
        />
      </View>
      <ScrollView
        style={{
          backgroundColor: "#FFF",
          padding: 10,
          paddingTop: 20,
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
        }}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {allUsers?.map((item) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                alignItems: "stretch",
                padding: 10,
              }}
              onPress={() => selectUserFun(item?._id)}
            >
              <Image
                source={{
                  uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                }}
                style={{
                  height: 55,
                  width: 55,
                  resizeMode: "cover",
                  borderRadius: 999,
                }}
              />
              <View
                style={{ flexDirection: "row", flex: 1, alignItems: "center" }}
              >
                <View
                  style={{
                    marginLeft: 13,
                    marginTop: 2,
                    borderBottomColor: "#8B8585",
                    flex: 1,
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 21,
                      fontFamily: "Alegreya_700Bold",
                      letterSpacing: 1,
                      color: "#676D6F",
                    }}
                  >
                    {item?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: "Alegreya_500Medium",
                      letterSpacing: 1,
                      color: "#C9CBD5",
                    }}
                  >
                    {item?.email}
                  </Text>
                </View>
                <AntDesign
                  name={
                    selectedUsers?.includes(item?._id)
                      ? "checkcircle"
                      : "checkcircleo"
                  }
                  size={24}
                  color={"#6983fa"}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        disabled={!selectedUsers?.length}
        onPress={createGroupFun}
        style={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: "white",
          borderRadius: 50,
        }}
      >
        <AntDesign
          name="rightcircle"
          size={60}
          color={selectedUsers?.length ? "#6983fa" : "#A4B4FE"}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({});
