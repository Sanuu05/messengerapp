const initail ={
    alluser:[]
}
const all = (state=initail, action)=>{
    switch(action.type){
        case "GETALLUSER":
            return {
                alluser:action.payload.data
            }
        // case "USERMSG":
        //     return{
        //         allmsg:action.payload.data
        //     }    
        default:
            return state    
    }
}
export default all