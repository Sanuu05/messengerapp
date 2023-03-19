import { GET_ERROR, CLEAR_ERROR } from '../action/types';

const initialState = {
    msg :null
    // status:null,
    // id:null
}
const error= (state= initialState, action)=>{
    switch(action.type){
        case GET_ERROR:
            return {
                msg : action.payload.data.msg
                
            };
        case CLEAR_ERROR:
            return{
                msg:null
            };
        default:
            return state        
    }
}
export default error;