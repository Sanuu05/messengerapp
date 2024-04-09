const initail ={
    alluser:[],
    allActiveUser:[]
}
const all = (state=initail, action)=>{
    switch(action.type){
        case "GETALLUSER":
            return {
                alluser:action.payload.data
            }
        case "GETALLACTIVEUSER":
            return{
                ...state,
                allActiveUser:action.payload.data
            }    
        default:
            return state    
    }
}
export default all