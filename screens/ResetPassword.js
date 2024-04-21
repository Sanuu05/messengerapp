import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
  } from "react-native";
  import React, { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { useFocusEffect, useNavigation } from "@react-navigation/native";
  import { useDispatch, useSelector } from "react-redux";
  import { loadUser, loguser, resetPassword, sendOtp, userSign } from "../action/user";
  import icon from "../assets/chaticon.jpg";
  import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
  
  const { width, height } = Dimensions.get("screen");
  
  const ResetPassword = (props) => {
    const [data, setdata] = useState({
      password: "",
      confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const submit = async () => {
      const {  password, confirmPassword } = data;
  
      if ( !password || !confirmPassword) {
        Toast.show({
            type: 'error',
            text1: "Please fill in all fields."
          });
        return;
      }
  
      if (password !== confirmPassword) {
        Toast.show({
            type: 'error',
            text1: "Passwords do not match."
          });
        return;
      }
      setLoading(true)
      try {
        const response = await resetPassword({email:props?.route?.params?.email,newPassword:password});
        if (response) {
          setdata({
            password: "",
            confirmPassword: "",
          });
          Toast.show({
            type: 'success',
            text1: response?.message
          });
          navigation.navigate('Login')
        }
      } catch (error) {
        console.error("Signup failed:", error);
        Toast.show({
            type: 'error',
            text1: "Reset process failed, please try again."
          });
      }finally{
        setLoading(false)
      }
    };
  


  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <SafeAreaView
          style={{
            flex: 1,
            paddingHorizontal: 10,
          }}
        >
            <Loader isVisible={loading} />
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled={true}
            style={{ flexGrow: 1 }}
          >
            <View
              style={{
                height: height - 50,
                backgroundColor: "white",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                flex: 1,
              }}
            >
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 0,
                  backgroundColor: "white",
                  flex: 1,
                }}
              >
        
                  <View
                    style={{
                      backgroundColor: "white",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      width: "100%",
                      alignContent: "center",
                      paddingVertical: 20,
                      borderRadius: 15,
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={icon}
                        style={{
                          width: 300,
                          height: 200,
                          resizeMode: "contain",
                        }}
                      />
                    </View>
  
                    <Text style={styles?.titleStyle}>
                    ResetPassword
                    </Text>
                    <Text
                      style={[styles?.subTitleStyle, { paddingHorizontal: 30 }]}
                    >
                      
                        Reset your password ! Log in to your account and join the chat
                    </Text>
                    <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles?.textInputStyle}
                    onChangeText={(text) =>
                      setdata({ ...data, password: text })
                    }
                  />
                  <TextInput
                    placeholder="Confirm Password"
                    style={styles?.textInputStyle}
                    onChangeText={(text) =>
                      setdata({ ...data, confirmPassword: text })
                    }
                  />
                  
               
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity activeOpacity={0.8} onPress={submit}>
                          <View style={styles.btncontainer}>
                            <Text style={styles?.btnTextStyle}>ResetPassword</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    
                  </View>
                
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    );
  };
  
  export default ResetPassword;
  
  const styles = StyleSheet.create({
    btncontainer: {
      backgroundColor: "#32CCFE",
      borderRadius: 50,
      minWidth: 200,
      padding: 12,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    textInputStyle: {
      paddingVertical: 0,
      paddingHorizontal: 5,
      marginHorizontal: 8,
      marginVertical: 7,
      backgroundColor: "white",
      elevation: 0,
      borderRadius: 5,
      fontFamily: "Alegreya_500Medium",
    },
    btnTextStyle: {
      textAlign: "center",
      fontFamily: "Alegreya_500Medium",
      fontSize: 22,
      color: "white",
    },
    titleStyle: {
      textAlign: "center",
      fontFamily: "Alegreya_700Bold",
      fontSize: 25,
    },
    subTitleStyle: {
      textAlign: "center",
      fontFamily: "Alegreya_500Medium",
      color: "grey",
      paddingTop: 10,
    },
  });
  