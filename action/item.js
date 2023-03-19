import Axios from 'axios'
import {ADD_ITEMS, AUTH_ERROR, DELETE_ITEMS, GET_ERROR, GET_ITEMS, ITEMS_LOADING, UPDATE_ITEMS} from './types'

const port ="https://msg-snya.onrender.com"
// const port = "http://192.168.29.100:5555"

export const getallitems = ()=> async(dispatch)=>{
    try {
        dispatch({ type: ITEMS_LOADING });
        const itemData = await Axios.get(`${port}/item/all`)
        dispatch({type:GET_ITEMS, payload:itemData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const getitem = ()=> async(dispatch)=>{
    try {
        dispatch({ type: ITEMS_LOADING });
        const token = localStorage.getItem('token')
        const itemData = await Axios.get(`${port}/item/get`, { headers: { "x-auth-token": token } })
        dispatch({type:GET_ITEMS, payload:itemData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const getfollowingitem = ()=> async(dispatch)=>{
    try {
        dispatch({ type: ITEMS_LOADING });
        const token = localStorage.getItem('token')
        const itemData = await Axios.get(`${port}/item/allfollowing`, { headers: { "x-auth-token": token } })
        dispatch({type:GET_ITEMS, payload:itemData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}

export const additem = (data)=>async(dispatch)=>{
    try {
        
        const token = localStorage.getItem('token')
        // console.log(data)
        const addData = await Axios.post(`${port}/item/post`,data ,{ headers: { "x-auth-token": token } })
        dispatch({type:ADD_ITEMS, payload:addData})
    } catch (error) {
        dispatch({type:GET_ERROR, payload: error.response})
    }
}
export const delitem =(id)=> async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        const delData = await Axios.delete(`http://localhost:1998/item/delete/${id}`,{ headers: { "x-auth-token": token } })
        dispatch({type:DELETE_ITEMS, payload:delData})
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
        
    }
}

export const updateitem =(id, data)=>async(dispatch)=>{
    try {
        // const token = localStorage.getItem('token')
        const updateData = await Axios.patch(`http://localhost:8888/item/update/${id}`,data )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}

//like

export const updatelike = (postId)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`http://localhost:1998/item/like`,postId,{ headers: { "x-auth-token": token } } )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
        // console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const updateunlike = (postId)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`http://localhost:1998/item/unlike`,postId,{ headers: { "x-auth-token": token } } )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
        // console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}
export const comment = (postId,text)=>async(dispatch)=>{
    try {
        const token = localStorage.getItem('token')
        // console.log('val', postId)
        const updateData = await Axios.put(`http://localhost:1998/item/comment`,{postId:postId, text:text},{ headers: { "x-auth-token": token } } )
        dispatch({type:UPDATE_ITEMS, payload:updateData})
        // console.log('like',updateData)
        
    } catch (error) {
        dispatch({type:AUTH_ERROR})
    }
}