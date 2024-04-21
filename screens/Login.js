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
import { loadUser, loguser, sendOtp, userSign } from "../action/user";
import icon from "../assets/chaticon.jpg";
import { TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";

const { width, height } = Dimensions.get("screen");

const Login = () => {
  const [login, setlogin] = useState(true);
  const [forget, setforget] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const postData = async () => {
    try {
      setLoading(true);
      if (data?.email && data?.password) {
        const responseData = await dispatch(loguser(data));
        if (responseData) {
          Toast.show({
            type: "success",
            text1: "Login Successful",
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Fill all the fields",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login process failed, please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  const submit = async () => {
    const { email, name, password, confirmPassword } = data;

    if (!email || !name || !password || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields.",
      });
      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Passwords do not match.",
      });
      return;
    }
    setLoading(true);
    try {
      const response = await userSign(data);
      if (response) {
        setlogin(true);
        setdata({
          email: "",
          password: "",
          name: "",
          confirmPassword: "",
        });
        Toast.show({
          type: "success",
          text1: response,
        });
        // console.log("Signup response:", response);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Signup process failed, please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const authToken = useSelector((state) => state.user.token);
  useFocusEffect(
    React.useCallback(() => {
      setlogin(true);
      setforget(false);
      dispatch(loadUser());
    }, [dispatch, authToken])
  );

  const navigation = useNavigation();
  const forgetpass = async (e) => {
    setLoading(true);
    try {
      if (data.email) {
        const response = await sendOtp({ email: data.email });
        if (response) {
          Toast.show({
            type: "success",
            text1: response?.message,
          });
          navigation.navigate("OTPScreen", {
            email: data.email,
          });
        }
      } else {
        Toast.show({
          type: "error",
          text1: "Send Otp process failed, please try again.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Send Otp process failed, please try again.",
      });
    } finally {
      setLoading(false);
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
              {login ? (
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
                    {forget ? "Reset Password" : "Login"}
                  </Text>
                  <Text
                    style={[styles?.subTitleStyle, { paddingHorizontal: 30 }]}
                  >
                    {forget
                      ? "Ready to Reconnect? Reset Your Password Here"
                      : "The conversation starts here! Log in to your account and join the chat."}{" "}
                  </Text>
                  <TextInput
                    placeholder="Email"
                    style={styles?.textInputStyle}
                    onChangeText={(text) => setdata({ ...data, email: text })}
                  />
                  {forget ? null : (
                    <TextInput
                      placeholder="Password"
                      secureTextEntry={true}
                      style={styles?.textInputStyle}
                      onChangeText={(text) =>
                        setdata({ ...data, password: text })
                      }
                    />
                  )}
                  {forget ? (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={forgetpass}
                      >
                        <View style={styles.btncontainer}>
                          <Text style={styles?.btnTextStyle}>
                            Reset Password
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity activeOpacity={0.8} onPress={postData}>
                        <View style={styles.btncontainer}>
                          <Text style={styles?.btnTextStyle}>Login</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "white",
                    width: "85%",
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
                        width: 150,
                        height: 100,
                        resizeMode: "contain",
                      }}
                    />
                  </View>
                  <Text style={styles?.titleStyle}>Register</Text>
                  <Text style={styles?.subTitleStyle}>
                    Start your messaging journey! Create an account today and
                    stay connected.
                  </Text>
                  <TextInput
                    placeholder="Name"
                    style={styles?.textInputStyle}
                    onChangeText={(text) => setdata({ ...data, name: text })}
                  />
                  <TextInput
                    placeholder="Email"
                    style={styles?.textInputStyle}
                    onChangeText={(text) => setdata({ ...data, email: text })}
                  />
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
                        <Text style={styles?.btnTextStyle}>Signup</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              {forget ? (
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 1,
                    fontFamily: "Alegreya_400Regular",
                    fontSize: 15,
                  }}
                >
                  Go back to Login page{" "}
                  <Text
                    onPress={() => setforget(false)}
                    style={{
                      color: "#32CCFE",
                      fontFamily: "Alegreya_700Bold",
                    }}
                  >
                    Click here
                  </Text>
                </Text>
              ) : (
                <View>
                  {login ? (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 1,
                        fontFamily: "Alegreya_400Regular",
                        fontSize: 15,
                      }}
                    >
                      Forget Password?{" "}
                      <Text
                        onPress={() => setforget(true)}
                        style={{
                          color: "#32CCFE",
                          fontFamily: "Alegreya_700Bold",
                        }}
                      >
                        Reset
                      </Text>
                    </Text>
                  ) : null}
                  {login ? (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        fontFamily: "Alegreya_700Bold",
                        fontSize: 18,
                      }}
                    >
                      Dont have an Account?{" "}
                      <Text
                        onPress={() => setlogin(false)}
                        style={{ color: "#32CCFE" }}
                      >
                        Sign Up
                      </Text>
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 10,
                        fontFamily: "Alegreya_700Bold",
                        fontSize: 18,
                      }}
                    >
                      Have an Account?{" "}
                      <Text
                        onPress={() => setlogin(true)}
                        style={{ color: "#32CCFE" }}
                      >
                        Login
                      </Text>
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Login;

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
