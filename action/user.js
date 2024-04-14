import Axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL,  GET_ERROR,LOAD,UNLOAD} from './types'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../config/main';


export const loadUser = () => async (dispatch, getState) => {
    try {
        // Retrieving the token securely
        const token = await AsyncStorage.getItem('tokenmain');

        // Configuring headers for the HTTP request
        const config = {
            headers: {
                "x-auth-token": token
            }
        };

        // API call to get user data
        const { data } = await Axios.get(`${baseUrl}/auth/getuser`, config);
        AsyncStorage.setItem('tokenmain', data?.token)
        AsyncStorage.setItem('user', JSON.stringify(data?.user))
        dispatch({ type: USER_LOADED, payload: data });
        return data;
    } catch (error) {
        console.error("Error loading user:", error);

        // Dispatching to the store that there was an auth error
        dispatch({ type: AUTH_ERROR });

        // Updating user profile to reflect that the user is not online
        dispatch(editprofilepic({ online: false }));

        // Logging error to the console
        if (error.response) {
            console.log('HTTP error:', error.response);
        } else if (error.request) {
            console.log('Network error:', error.request);
        } else {
            console.log('Error:', error.message);
        }
    }
};

export const online = () =>async(dispatch,getState)=>{

    try {
        // console.log('online send')
        // alert('online')
        const token = getState().user.token;
        const { data } = await Axios.patch(`${baseUrl}/auth/online`, "hello",{ headers: { "x-auth-token": token } })
        
    } catch (error) {
        editprofilepic({ online: false })
        
    }

}
export const offline = () =>async(dispatch,getState)=>{

    try {
        // console.log('online send')
        // alert('offline')
        const token = getState().user.token;
        const { data } = await Axios.patch(`${baseUrl}/auth/offline`, "hello",{ headers: { "x-auth-token": token } })
        
    } catch (error) {
        editprofilepic({ online: false })
        
    }

}
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
        dispatch({ type: "USERMSG", payload: {data:[]} })



    } catch (error) {
        // console.log('err')
        dispatch({ type: AUTH_ERROR })
        editprofilepic({ online: false })

    }
}

export const loadmsg = (userid,type) => async (dispatch, getState) => {
    // emploadmsg()

    try {
        dispatch({ type: LOAD });
        // console.log('loadmsg',userid)
        // console.log('idd',userid)
        const token = await AsyncStorage.getItem('tokenmain')
        // console.log('tok',userid)
        // console.log('ghgh',token)
        console.log('denugger',type)
        const data  = await Axios.get(`${baseUrl}/auth/oneuser/${userid}/${type}`, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        // console.log("daa",data)
        // debugger
        console.log("allmsg",data)
        dispatch({ type: UNLOAD });
        dispatch({ type: "USERMSG", payload: data })



    } catch (error) {
        console.log('err=>>>>>>>>>>>>>>>>>>>>>.',error)
        dispatch({ type: AUTH_ERROR })
        editprofilepic({ online: false })

    }
}
export const loadoneuser = (userid) => async (dispatch, getState) => {
    // emploadmsg()
    console.log('mmmmm')

    try {
        // dispatch({ type: LOAD });
        // console.log('idd',userid)
        // const token = await AsyncStorage.getItem('tokenmain')
        // console.log('tok',userid)
        // console.log('ghgh',token)
        // console.log('denugger')
        const data  = await Axios.get(`${baseUrl}/auth/getuser/${userid}`)
        // console.log('tok', data)
        // console.log("daa",data)
        // debugger
        console.log("ss",data)
        // dispatch({ type: UNLOAD });
        dispatch({ type: "ONEUSER", payload: data })



    } catch (error) {
        console.log('err')
        dispatch({ type: AUTH_ERROR })
        editprofilepic({ online: false })

    }
}
export const sendmsg = (msgres, userid,data) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
       
        // console.log({msg:msgres,pic:data,sendid:userid})
        console.log('msg')
        const token = await AsyncStorage.getItem('tokenmain')
        // alert(userid)
        const dataa  = await Axios.post(`${baseUrl}/auth/nmsg`,{msg:msgres,pic:data,sendid:userid}, { headers: { "x-auth-token": token } })
        // // console.log('tok', data)
        
        dispatch({ type: "POSTMSG", payload: dataa })



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })
        alert('errr')
        editprofilepic({ online: false })

    }
}
export const delmsg = (id) => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // console.log('idd',userid)
        // alert(id)
        console.log('vbvb',id)
        const token = await AsyncStorage.getItem('tokenmain')
        const data  = await Axios.put(`${baseUrl}/auth/delmsg`,{id:id}, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        
        // console.log("daa",data)
        // dispatch({ type: "POSTMSG", payload: data })
        dispatch({ type: "DELEMSG", payload: data })



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })
        editprofilepic({ online: false })

    }
}


export const userSign = (signUpData) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`${baseUrl}/auth/signup`, signUpData);
        dispatch({ type: REGISTER_SUCCESS, payload: data });
        return data; // Optional: Useful if you need the data response after dispatching
    } catch (error) {
        console.error('Signup failed:', error);

        // Better error handling, check if error.response exists before dispatching
        if (error.response) {
            dispatch({ type: GET_ERROR, payload: error.response });
            // You might want to show an alert or a message to the user here
            alert('Signup failed: ' + (error.response.data.message || 'Unknown error'));
        } else {
            dispatch({ type: GET_ERROR, payload: { message: 'No response from server' } });
            alert('No response from server');
        }

        dispatch({ type: REGISTER_FAIL });

        // Update profile status
        dispatch(editprofilepic({ online: false })); // Ensure this is the intended effect
    }
};

export const loguser = (userData) => async (dispatch) => {
    try {
        const { data } = await Axios.post(`${baseUrl}/auth/login`, userData);
        dispatch({ type: LOGIN_SUCCESS, payload: data });
        return data; // Optional: Return data if needed elsewhere
    } catch (error) {
        // Handle different aspects of error object
        console.error('Login failed:', error);

        // Conditional display of error alert if error message exists
        if (error?.response?.data?.message) {
            alert(error.response.data.message);
        } else {
            alert('An error occurred during login.');
        }

        // Dispatch failure and error information
        dispatch({ type: LOGIN_FAIL });
        dispatch({ type: GET_ERROR, payload: error.response });

        // Optionally handle user profile update (assuming editprofilepic is an action or function)
        dispatch(editprofilepic({ online: false }));
    }
};
export const editprofilepic = (dat) => async (dispatch,getState) => {
    try {
        const token = await AsyncStorage.getItem('tokenmain')
        const { data } = await Axios.post(`${baseUrl}/auth/editpic`, dat,{ headers: { "x-auth-token": token } })
        // alert(data)
        dispatch({ type: "UPDATE_PIC", payload: data })
        // alert("Profile Pic updated sucessfully")
    } catch (error) {

        // dispatch({ type: LOGIN_FAIL })
        // dispatch({ type: GET_ERROR, payload: error.response })
        editprofilepic({ online: false })
    }
}
export const getalluser = ()=> async(dispatch)=>{
    try {
        const user = await Axios.get(`${baseUrl}/auth/getalluser`)  
        dispatch({type: "GETALLUSER", payload: user})
    } catch (error) {
        console.log(error)
        editprofilepic({ online: false })
    }
}

export const getActiveUser = ()=> async(dispatch)=>{
    try {
        console.log('geya;2')
        const token = await AsyncStorage.getItem('tokenmain')
        const user = await Axios.get(`${baseUrl}/auth/activeUser`,{ headers: { "x-auth-token": token }})
        // console.log('geya;l>>>sasasa',user)
        dispatch({type: "GETALLACTIVEUSER", payload: user})
    } catch (error) {
        console.log(error)
        editprofilepic({ online: false })
        
    }
}
export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCESS })
    // editprofilepic({ online: false })
    

}
// export const userprofile =(id)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         const { data } = await Axios.get(`http://localhost:1998/auth/userone/${id}`, { headers: { "x-auth-token": token } })
//         // console.log('tok', data)
//         dispatch({ type: USER_PROFILE, payload: data })
        
//     } catch (error) {
//         dispatch({ type: LOGIN_FAIL })
        
//     }
// }
// export const follow = (postId)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         // console.log('val', postId)
//         const updateData = await Axios.put(`http://localhost:1998/auth/follow`,{followId:postId},{ headers: { "x-auth-token": token } } )
//         console.log(updateData)
//         // dispatch({type:USER_LOADED, payload:updateData})
//         // console.log('like',updateData)
        
//     } catch (error) {
//         dispatch({type:AUTH_ERROR})
//     }
// }
// export const unfollow = (postId)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         // console.log('val', postId)
//         const updateData = await Axios.put(`http://localhost:1998/auth/unfollow`,{unfollowId:postId},{ headers: { "x-auth-token": token } } )
//         console.log(updateData)
//         // dispatch({type:USER_LOADED, payload:updateData})
//         // console.log('like',updateData)
        
//     } catch (error) {
//         dispatch({type:AUTH_ERROR})
//     }
// }
// export const updatepic = (photo)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         // console.log('val', postId)
//         const updateData = await Axios.put(`http://localhost:1998/auth/picupdate`,photo,{ headers: { "x-auth-token": token } } )
//         // console.log(updateData)
//         dispatch({type:USER_LOADED, payload:updateData})
//         // console.log('like',updateData)
        
//     } catch (error) {
//         dispatch({type:AUTH_ERROR})
//     }
// }
// export const clear = () => async (dispatch) => {
//     dispatch({ type: CLEAR_ERROR })
// }