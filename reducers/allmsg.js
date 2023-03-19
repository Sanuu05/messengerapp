const initail ={
    allmsg:[]
}
const allmsg = (state=initail, action)=>{
    switch(action.type){
        
        case "USERMSG":
            return{
                allmsg:action.payload.data
            }    
        default:
            return state    
    }
}
export default allmsg