import React, { useRef, useState } from "react";
import {
  View,
  Button,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import icon from "../assets/chaticon.jpg";
import { verifyOtp } from "../action/user";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Loader from "../components/Loader";
const OTPScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Update OTP state when input changes
    let newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Focus next input if current input is filled
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const navigation = useNavigation();
  const handleOTPSubmit = async () => {
    try {
      // Handle OTP submission here
      setLoading(true)
      const enteredOTP = otp.join("");
      const response = await verifyOtp({
        email: props?.route?.params?.email,
        otp: enteredOTP,
      });
      if (response) {
        Toast.show({
          type: "success",
          text1: response?.message,
        });
        navigation.navigate("ResetPassword", {
          email: props?.route?.params?.email,
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Verify Otp process failed, please try again.",
      });
    }finally{
        setLoading(false)
    }
  };

  return (
    <View style={styles.container}>
        <Loader isVisible={loading} />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 5,
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
        <Text style={styles?.titleStyle}>OTP</Text>
        <Text style={[styles?.subTitleStyle, { paddingHorizontal: 30 }]}>
          Enter OTP to Reset Password
        </Text>
      </View>
      <View style={styles.inputContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => handleInputChange(index, text)}
            value={value}
          />
        ))}
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={handleOTPSubmit}>
          <View style={styles.btncontainer}>
            <Text style={styles?.btnTextStyle}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
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
          onPress={() => navigation.navigate("Login")}
          style={{
            color: "#32CCFE",
            fontFamily: "Alegreya_700Bold",
          }}
        >
          Click here
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    width: "15%",
    padding: 10,
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
  //   inputFocused: {
  //     borderColor: 'blue', // Change to the color you want when focused
  //     borderWidth: 2,
  //   },
  btncontainer: {
    backgroundColor: "#32CCFE",
    borderRadius: 50,
    minWidth: 200,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  btnTextStyle: {
    textAlign: "center",
    fontFamily: "Alegreya_500Medium",
    fontSize: 22,
    color: "white",
  },
});

export default OTPScreen;
