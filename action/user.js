import Axios from "axios";
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_ERROR,
  LOAD,
  UNLOAD,
} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../config/main";
import Toast from "react-native-toast-message";

//TODO:LOAD AUTH USER
export const loadUser = () => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem("tokenmain");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };
    const { data } = await Axios.get(`${baseUrl}/auth/getuser`, config);
    AsyncStorage.setItem("tokenmain", data?.token);
    AsyncStorage.setItem("user", JSON.stringify(data?.user));
    dispatch({ type: USER_LOADED, payload: data });
    return data;
  } catch (error) {
    console.error("Error loading user:", error);
    dispatch({ type: AUTH_ERROR });
    dispatch(editprofilepic({ online: false }));
  }
};

export const online = () => async (dispatch, getState) => {
  try {
    // console.log('online send')
    // alert('online')
    const token = getState().user.token;
    const { data } = await Axios.patch(`${baseUrl}/auth/online`, "hello", {
      headers: { "x-auth-token": token },
    });
  } catch (error) {
    editprofilepic({ online: false });
  }
};
export const offline = () => async (dispatch, getState) => {
  try {
    // console.log('online send')
    // alert('offline')
    const token = getState().user.token;
    const { data } = await Axios.patch(`${baseUrl}/auth/offline`, "hello", {
      headers: { "x-auth-token": token },
    });
  } catch (error) {
    editprofilepic({ online: false });
  }
};
export const emploadmsg = () => async (dispatch, getState) => {
  try {
    // // dispatch({ type: USER_LOADING });
    // // console.log('idd',userid)
    // const token = await AsyncStorage.getItem('tokenmain')
    // // console.log('tok',userid)
    // // console.log('ghgh',token)
    // // console.log('denugger')
    // const data  = await Axios.get(`${baseUrl}/auth/oneuser/${userid}`, { headers: { "x-auth-token": token } })
    // // console.log('tok', data)
    // // console.log("daa",data)
    // debugger
    // console.log(data)
    dispatch({ type: "USERMSG", payload: { data: [] } });
  } catch (error) {
    // console.log('err')
    dispatch({ type: AUTH_ERROR });
    editprofilepic({ online: false });
  }
};

export const loadmsg = (userid, type) => async (dispatch, getState) => {
  // emploadmsg()

  try {
    dispatch({ type: LOAD });
    // console.log('loadmsg',userid)
    // console.log('idd',userid)
    const token = await AsyncStorage.getItem("tokenmain");
    // console.log('tok',userid)
    // console.log('ghgh',token)
    console.log("denugger", type);
    const data = await Axios.get(`${baseUrl}/auth/oneuser/${userid}/${type}`, {
      headers: { "x-auth-token": token },
    });
    // console.log('tok', data)
    // console.log("daa",data)
    // debugger
    console.log("allmsg", data);
    dispatch({ type: UNLOAD });
    dispatch({ type: "USERMSG", payload: data });
  } catch (error) {
    console.log("err=>>>>>>>>>>>>>>>>>>>>>.", error);
    dispatch({ type: AUTH_ERROR });
    editprofilepic({ online: false });
  }
};
export const loadoneuser = (userid) => async (dispatch, getState) => {
  // emploadmsg()
  console.log("mmmmm");

  try {
    // dispatch({ type: LOAD });
    // console.log('idd',userid)
    // const token = await AsyncStorage.getItem('tokenmain')
    // console.log('tok',userid)
    // console.log('ghgh',token)
    // console.log('denugger')
    const data = await Axios.get(`${baseUrl}/auth/getuser/${userid}`);
    // console.log('tok', data)
    // console.log("daa",data)
    // debugger
    console.log("ss", data);
    // dispatch({ type: UNLOAD });
    dispatch({ type: "ONEUSER", payload: data });
  } catch (error) {
    console.log("err");
    dispatch({ type: AUTH_ERROR });
    editprofilepic({ online: false });
  }
};
export const sendmsg = (msgres, userid, data) => async (dispatch, getState) => {
  try {
    // dispatch({ type: USER_LOADING });

    // console.log({msg:msgres,pic:data,sendid:userid})
    console.log("msg");
    const token = await AsyncStorage.getItem("tokenmain");
    // alert(userid)
    const dataa = await Axios.post(
      `${baseUrl}/auth/nmsg`,
      { msg: msgres, pic: data, sendid: userid },
      { headers: { "x-auth-token": token } }
    );
    // // console.log('tok', data)

    dispatch({ type: "POSTMSG", payload: dataa });
  } catch (error) {
    // dispatch({ type: AUTH_ERROR })
    alert("errr");
    editprofilepic({ online: false });
  }
};
export const delmsg = (id) => async (dispatch, getState) => {
  try {
    // dispatch({ type: USER_LOADING });
    // console.log('idd',userid)
    // alert(id)
    console.log("vbvb", id);
    const token = await AsyncStorage.getItem("tokenmain");
    const data = await Axios.delete(`${baseUrl}/item/deleteMessage/${id}`, {
      headers: { "x-auth-token": token },
    });

    // console.log("daa",data)
    // dispatch({ type: "POSTMSG", payload: data })
    dispatch({ type: "DELEMSG", payload: data });
  } catch (error) {
    // dispatch({ type: AUTH_ERROR })
    editprofilepic({ online: false });
  }
};

export const userSign = async (signUpData) => {
  try {
    const { data } = await Axios.post(`${baseUrl}/auth/signup`, signUpData);
    return data; // Optional: Useful if you need the data response after dispatching
  } catch (error) {
    if (error.response) {
      Toast.show({
        type: "error",
        text1: error.response.data.message || "Unknown error",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "An error occurred during signup.",
      });
    }
  }
};

export const loguser = (userData) => async (dispatch) => {
  try {
    const { data } = await Axios.post(`${baseUrl}/auth/login`, userData);
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>.", data);
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    return data; // Optional: Return data if needed elsewhere
  } catch (error) {
    // Handle different aspects of error object
    console.error("Login failed:", error);

    // Conditional display of error alert if error message exists
    if (error?.response?.data?.message) {
      // alert(error.response.data.message);
      Toast.show({
        type: "error",
        text1: error?.response?.data?.message,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "An error occurred during login.",
      });
    }

    // Dispatch failure and error information
    dispatch({ type: LOGIN_FAIL });
    dispatch({ type: GET_ERROR, payload: error.response });

    // Optionally handle user profile update (assuming editprofilepic is an action or function)
    dispatch(editprofilepic({ online: false }));
  }
};
export const editprofilepic = (dat) => async (dispatch, getState) => {
  try {
    const token = await AsyncStorage.getItem("tokenmain");
    const { data } = await Axios.post(`${baseUrl}/auth/editpic`, dat, {
      headers: { "x-auth-token": token },
    });
    // alert(data)
    dispatch({ type: "UPDATE_PIC", payload: data });
    // alert("Profile Pic updated sucessfully")
  } catch (error) {
    // dispatch({ type: LOGIN_FAIL })
    // dispatch({ type: GET_ERROR, payload: error.response })
    editprofilepic({ online: false });
  }
};
export const getalluser = () => async (dispatch) => {
  try {
    const user = await Axios.get(`${baseUrl}/auth/getalluser`);
    dispatch({ type: "GETALLUSER", payload: user });
  } catch (error) {
    console.log(error);
    editprofilepic({ online: false });
  }
};

export const getActiveUser = () => async (dispatch) => {
  try {
    console.log("geya;2");
    const token = await AsyncStorage.getItem("tokenmain");
    const user = await Axios.get(`${baseUrl}/auth/activeUser`, {
      headers: { "x-auth-token": token },
    });
    // console.log('geya;l>>>sasasa',user)
    dispatch({ type: "GETALLACTIVEUSER", payload: user });
  } catch (error) {
    console.log(error);
    editprofilepic({ online: false });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT_SUCESS });
  // editprofilepic({ online: false })
};

export const sendOtp = async (obj) => {
  try {
    const { data } = await Axios.post(`${baseUrl}/auth/request-otp`, obj);
    return data;
  } catch (error) {
    Toast.show({
        type: 'error',
        text1: error?.response?.data?.message
      });
  }
};

export const verifyOtp = async (obj) => {
  try {
    const { data } = await Axios.post(`${baseUrl}/auth/verify-otp`, obj);
    return data;
  } catch (error) {
    Toast.show({
        type: 'error',
        text1: error?.response?.data?.message
      });
  }
};

export const resetPassword = async (obj) => {
  try {
    const { data } = await Axios.post(`${baseUrl}/auth/reset-password`, obj);
    return data;
  } catch (error) {
    Toast.show({
        type: 'error',
        text1: error?.response?.data?.message
      });
  }
};
