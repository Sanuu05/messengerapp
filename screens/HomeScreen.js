import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  AppState,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import {
  getalluser,
  loadUser,
  emploadmsg,
  editprofilepic,
  getActiveUser,
} from "../action/user";
import socket from "../action/socketManager";
import FabButton from "./FabButton";
const { width, height } = Dimensions.get("screen");

const HomeScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const userad = useSelector((state) => state.user.user);
  const userall = useSelector((state) => state.all?.allActiveUser);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!", userad?.user?._id);
      }

      appState.current = nextAppState;
      console.log("AppState", appState.current);
      if (appState.current === "background") {
      }
    });

    return () => {
      subscription?.remove();
    };
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getActiveUser());
      dispatch(editprofilepic({ online: true }));
      dispatch(loadUser());
      dispatch(emploadmsg());
    }, [])
  );

  useEffect(() => {
    socket.on("chatMessage", function (data) {
      dispatch(getActiveUser());
    });
  }, []);
  const Chatlist = ({ v }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 10,
          alignItems: "stretch",
        }}
        onPress={() =>
          navigate.navigate("Msg", {
            ...v,
            type: v?.userDetails ? "user" : "group",
          })
        }
      >
        <Image
          source={{
            uri: v?.userDetails?.profilePic
              ? v?.userDetails?.profilePic
                ? v?.userDetails?.profilePic
                : v?.groupDetails?.profilePic
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          }}
          style={{
            height: 55,
            width: 55,
            resizeMode: "cover",
            borderRadius: 999,
          }}
        />
        <View
          style={{
            marginLeft: 13,
            marginTop: 2,
            borderBottomColor: "#8B8585",
            flex: 1,
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
            {v?.userDetails?.name
              ? v?.userDetails?.name
              : v?.groupDetails?.name}
          </Text>
          {v?.recentMessage ? (
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Alegreya_500Medium",
                letterSpacing: 1,
                color: "#C9CBD5",
              }}
            >
              {v?.recentMessage?.length > 30
                ? `${v?.recentMessage?.slice(0, 30)}......`
                : v?.recentMessage}
            </Text>
          ) : null}
          {v?.recentMedia ? (
            <Text
              style={{
                fontSize: 13,
                fontFamily: "Alegreya_500Medium",
                letterSpacing: 1,
                color: "#C9CBD5",
              }}
            >
              {new URL(v?.recentMedia).pathname.split("/").pop()}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    );
    // }
  };
  const [serach, setsearch] = useState();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={{ elevation: 1, backgroundColor: "white" }}>
        <View style={{ marginLeft: 9 }}>
          <Text
            style={{
              fontSize: 32,
              letterSpacing: 1.8,
              marginLeft: 8,
              marginTop: 0,
              fontFamily: "Alegreya_700Bold",
            }}
          >
            Messages
          </Text>
        </View>
        <View style={{ paddingHorizontal: 18, marginVertical: 6 }}>
          <View
            style={{
              backgroundColor: "#F6F7FB",
              padding: 8,
              borderRadius: 15,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name="search"
              size={20}
              color="#676D6F"
              style={{ marginLeft: 5 }}
            />
            <TextInput
              placeholder="Search by Name or Email-Id"
              style={{
                flex: 1,
                paddingLeft: 5,
                fontSize: 15,
                fontFamily: "Alegreya_400Regular",
              }}
              onChangeText={(text) => setsearch(text)}
            />
          </View>
        </View>
      </View>
      <View style={{ marginHorizontal: 18, marginTop: 15 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
          {userall?.map((v, i) => {
            return <Chatlist v={v} key={i} serach={serach} />;
          })}
        </ScrollView>
      </View>

      <FabButton />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
