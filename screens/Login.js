import {
  StyleSheet,
  Text,
  View,
  // TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, loguser, userSign } from "../action/user";
import { app, provider } from "../firebase";
import icon from "../assets/chaticon.jpg";
import { TextInput } from "react-native-paper";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const { width, height } = Dimensions.get("screen");

const Login = () => {
  const [login, setlogin] = useState(true);
  const [forget, setforget] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  const [loading, setloading] = useState(false);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [active, setactive] = useState(true);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  useFocusEffect(
    React.useCallback(() => {
      setactive(true);
      wait(8000).then(() => {
        setactive(false);
      });
    }, [dispatch])
  );
  const postData = () => {
    if (data?.email && data?.password) {
      setloading(true);
      console.log(loading);
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          if (userCredential?.user?.emailVerified) {
            dispatch(loguser({ email: userCredential.user.email }));
            setloading(false);
          } else {
            alert("User email id is not verified");
            setloading(false);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setloading(false);
          // ..
          //   console.table(error);
          alert(error?.message);
        });
    } else {
    }
  };
  const auth = getAuth();
  const submit = () => {
    // dispatch(userSign(data))
    if (data.email && data.name && data.cpassword && data.password) {
      if (data.password === data.cpassword) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userCredential) => {
            const user = userCredential.user;
            sendEmailVerification(user);
            dispatch(
              userSign({ email: data.email.toLowerCase(), name: data.name })
            );
          })
          .catch((error) => {
            alert(error?.message);
          });
      } else {
        alert("Enter same password");
      }
    } else {
      alert("Fill All field");
    }
  };
  const authToken = useSelector((state) => state.user.token);

  const authUser = useSelector((state) => state.user.user);
  const SignUpSuccess = useSelector((state) => state.user.signin);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(loadUser());
    }, [dispatch, authToken])
  );
  useFocusEffect(
    React.useCallback(() => {
      if (authUser?.user) {
        navigate.navigate("Bottom");
      } else {
        navigate.navigate("Login");
      }
    }, [dispatch, authUser])
  );
  useFocusEffect(
    React.useCallback(() => {
      if (SignUpSuccess) {
        setlogin(true);
      }
    }, [dispatch, SignUpSuccess])
  );

  const forgetpass = (e) => {
    if (data.email) {
      sendPasswordResetEmail(auth, data.email)
        .then((userCredential) => {
          alert("Reset password link has been send to email");
          setforget(false);
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
    }
  };
  if (false) {
    return (
      <View
        style={{
          height: height,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color="#32CCFE" />
      </View>
    );
  } else {
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

                    <Text style={styles?.titleStyle}>{forget?"Reset Password":"Login"}</Text>
                    <Text style={[styles?.subTitleStyle,{paddingHorizontal:30}]}>
                      {forget ? "Ready to Reconnect? Reset Your Password Here" : "The conversation starts here! Log in to your account and join the chat."}{" "}
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
                    ) : loading ? (
                      <ActivityIndicator size="large" color="#32CCFE" />
                    ) : (
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
                          onPress={postData}
                        >
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
                    Start your messaging journey! Create an account today and stay connected.
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
                        setdata({ ...data, cpassword: text })
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
  }
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