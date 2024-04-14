import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { editprofilepic, loadUser, logout } from "../action/user";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
// import { io } from "socket.io-client"
const { width, height } = Dimensions.get("screen");

const Account = () => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [imagedata, setimagedata] = useState();
  const [reload, setrelaod] = useState();
  // const baseUrl = "https://veajqzj9se.execute-api.ap-south-1.amazonaws.com"
  // const baseUrl = "http://192.168.29.100:8080"
  useFocusEffect(
    React.useCallback(() => {
      // dispatch(getalluser())
      // dispatch(loadUser())
      // const socket = io("http://192.168.29.100:5555")
      // socket.on('new-message', function (data) {
      //     // console.log('Got announcement:', data);
      //     setreload(data)
      //     // setModalVisible(false)
      // });
    }, [dispatch, reload])
  );
  const navigation = useNavigation();

  const userad = useSelector((state) => state?.user?.user?.user);

  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      //   allowsEditing:true,
      base64: true,
      quality: 1,
    })

    if (!result.canceled) {
      setimagedata(result?.assets[0]);
      setModalVisible(true);
    }
  };
  const [load, setload] = useState(false);
  const sendphoto = () => {
    if (imagedata) {
      setrelaod("");
      setload(true);
      let base64Img = `data:image/jpg;base64,${imagedata?.base64}`;
      let apiUrl = "https://api.cloudinary.com/v1_1/sannu/image/upload";
      let data = {
        file: base64Img,
        upload_preset: "insta-clone",
      };

      fetch(apiUrl, {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      })
        .then(async (response) => {
          let data = await response.json();
          if (data.secure_url) {

            dispatch(editprofilepic({ profilePic: data.url }));
            wait(3000).then(() => {
              dispatch(loadUser())
              setModalVisible(false);
              setload(false);
            });
          }
        })
        .catch((err) => {
          alert("Cannot upload");
          setload(false);
        });
    }
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useEffect(() => {
    // const socket = io(baseUrl)
    // socket.on('update', function (data) {
    //   console.log('del announcement:', data);
    //   if (String(userad._id) == String(data)) {
    //     // setModalVisible(false)
    //     setload(false)
    //     setrelaod(data)
    //   }
    // })
  }, []);
  // console.log("my nmn nbvvc",userad)
  return (
    <SafeAreaView style={{ height: height, backgroundColor: "white" }}>
      <View style={{ marginTop: 25 }}>
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
              uri: userad?.profilePic
                ? userad?.profilePic
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
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
            {userad?.name}
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Alegreya_400Regular",
              color: "grey",
              letterSpacing: 1,
            }}
          >
            {userad?.email}
          </Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ backgroundColor: "white", height: height, padding: 10 }}>
          {/* <Text>Hello modal</Text> */}
          {imagedata ? (
            <Image
              source={{
                uri: imagedata?.uri,
              }}
              style={{
                width: "100%",
                height: height - 200,
                resizeMode: "contain",
              }}
            />
          ) : null}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <TouchableOpacity
              style={{
                elevation: 1,
                padding: 8,
                backgroundColor: "#F6F8FD",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: 100,
              }}
              onPress={() => {
                setModalVisible(false);
                setimagedata();
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Alegreya_700Bold",
                  textAlign: "center",
                }}
              >
                Cancel
              </Text>
              {/* <Icon name='close' size={50} color="#557BF3"  /> */}
            </TouchableOpacity>
            {load && modalVisible ? (
              <TouchableOpacity
                style={{
                  elevation: 1,
                  padding: 8,
                  backgroundColor: "#F6F8FD",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                }}
                onPress={sendphoto}
              >
                <ActivityIndicator size="small" color="#32CCFE" />
                {/* <Icon name='close' size={50} color="#557BF3"  /> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  elevation: 1,
                  padding: 8,
                  backgroundColor: "#F6F8FD",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: 100,
                }}
                onPress={sendphoto}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "Alegreya_700Bold",
                    textAlign: "center",
                  }}
                >
                  Save
                </Text>
                {/* <Icon name='close' size={50} color="#557BF3"  /> */}
              </TouchableOpacity>
            )}

            {/* <View style={{ elevation: 10, backgroundColor: '#F6F8FD' }}>
              <Icon name='send' size={50} color="#557BF3" onPress={sendphoto} />
            </View> */}
          </View>

          {/* <Button onPress={sendphoto} title="Send" /> */}
        </View>
      </Modal>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <View
          style={{
            backgroundColor: "#F6F8FD",
            minHeight: 100,
            paddingVertical: 25,
            elevation: 0,
            borderRadius: 5,
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5,
            }}
            onPress={showImagePicker}
          >
            <Text style={{ fontSize: 20, fontFamily: "Alegreya_400Regular" }}>
              Change Profile Picture
            </Text>
            <Icon name="account" size={25} color="black" />
          </TouchableOpacity>
          {/* <View style={{ paddingHorizontal: 10, paddingVertical: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
            <Text style={{ fontSize: 20, fontFamily: 'Alegreya_400Regular' }}>Change Password</Text>
            <Icon name='onepassword' size={25} color="black" />
          </View> */}
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginVertical: 5,
            }}
            onPress={() => {
              // dispatch(editprofilepic({ online: false }))
              dispatch(logout());
              // navigation.navigate('Login')
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "Alegreya_400Regular" }}>
              Logout
            </Text>
            <Icon name="logout" size={25} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({});
