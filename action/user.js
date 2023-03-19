import Axios from 'axios'
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL,  GET_ERROR,LOAD,UNLOAD} from './types'
import AsyncStorage from '@react-native-async-storage/async-storage';


const port ="https://msg-snya.onrender.com"
// const port = "http://192.168.29.100:5555"

export const loadUser = () => async (dispatch, getState) => {
    try {
        // dispatch({ type: USER_LOADING });
        // alert('hello')
        // console.log("load") 
        const token =await AsyncStorage.getItem('tokenmain')
        // console.log('tokennew',token)
        const { data } = await Axios.get(`${port}/user/getuser`, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        dispatch({ type: USER_LOADED, payload: data })
        // "https://messenger-cloneapp.herokuapp.com"


    } catch (error) {
        dispatch({ type: AUTH_ERROR })
        console.log("err",error)
        editprofilepic({ online: false })

    }
}
export const online = () =>async(dispatch,getState)=>{

    try {
        // console.log('online send')
        // alert('online')
        const token = getState().user.token;
        const { data } = await Axios.patch(`${port}/user/online`, "hello",{ headers: { "x-auth-token": token } })
        
    } catch (error) {
        editprofilepic({ online: false })
        
    }

}
export const offline = () =>async(dispatch,getState)=>{

    try {
        // console.log('online send')
        // alert('offline')
        const token = getState().user.token;
        const { data } = await Axios.patch(`${port}/user/offline`, "hello",{ headers: { "x-auth-token": token } })
        
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
        // const data  = await Axios.get(`${port}/user/oneuser/${userid}`, { headers: { "x-auth-token": token } })
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

export const loadmsg = (userid) => async (dispatch, getState) => {
    // emploadmsg()

    try {
        dispatch({ type: LOAD });
        // console.log('idd',userid)
        const token = await AsyncStorage.getItem('tokenmain')
        // console.log('tok',userid)
        // console.log('ghgh',token)
        // console.log('denugger')
        const data  = await Axios.get(`${port}/user/oneuser/${userid}`, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        // console.log("daa",data)
        debugger
        // console.log(data)
        dispatch({ type: UNLOAD });
        dispatch({ type: "USERMSG", payload: data })



    } catch (error) {
        // console.log('err')
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
        const data  = await Axios.get(`${port}/user/getuser/${userid}`)
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
        const dataa  = await Axios.post(`${port}/user/nmsg`,{msg:msgres,pic:data,sendid:userid}, { headers: { "x-auth-token": token } })
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
        const data  = await Axios.put(`${port}/user/delmsg`,{id:id}, { headers: { "x-auth-token": token } })
        // console.log('tok', data)
        
        // console.log("daa",data)
        // dispatch({ type: "POSTMSG", payload: data })
        dispatch({ type: "DELEMSG", payload: data })



    } catch (error) {
        // dispatch({ type: AUTH_ERROR })
        editprofilepic({ online: false })

    }
}
export const userSign = (signdata) => async (dispatch) => {
    try {
        
        const { data } = await Axios.post(`${port}/user/signup`, signdata)
        dispatch({ type: REGISTER_SUCCESS, payload: data })
        
    } catch (error) {

        dispatch({ type: REGISTER_FAIL })
        dispatch({ type: GET_ERROR, payload: error.response })
        editprofilepic({ online: false })
    }
}
export const loguser = (dat) => async (dispatch) => {
    try {
        console.log('llogged')
        const { data } = await Axios.post(`${port}/user/login`, dat)
        // console.log('da',data)
        // loadUser()
        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {
        console.log('err',error?.response)
        alert(error?.response)
        dispatch({ type: LOGIN_FAIL })
        dispatch({ type: GET_ERROR, payload: error.response })
        editprofilepic({ online: false })
    }
}
export const editprofilepic = (dat) => async (dispatch,getState) => {
    try {
        const token = await AsyncStorage.getItem('tokenmain')
        const { data } = await Axios.post(`${port}/user/editpic`, dat,{ headers: { "x-auth-token": token } })
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
        console.log('geya;l')
        const user = await Axios.get(`${port}/user/getalluser`)
        dispatch({type: "GETALLUSER", payload: user})
    } catch (error) {
        // console.log(error)
        editprofilepic({ online: false })
        
    }
}
export const logout = () => async (dispatch) => {
    dispatch({ type: LOGOUT_SUCESS })
    editprofilepic({ online: false })
    

}
// export const userprofile =(id)=>async(dispatch)=>{
//     try {
//         const token = localStorage.getItem('token')
//         const { data } = await Axios.get(`http://localhost:1998/user/userone/${id}`, { headers: { "x-auth-token": token } })
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
//         const updateData = await Axios.put(`http://localhost:1998/user/follow`,{followId:postId},{ headers: { "x-auth-token": token } } )
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
//         const updateData = await Axios.put(`http://localhost:1998/user/unfollow`,{unfollowId:postId},{ headers: { "x-auth-token": token } } )
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
//         const updateData = await Axios.put(`http://localhost:1998/user/picupdate`,photo,{ headers: { "x-auth-token": token } } )
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