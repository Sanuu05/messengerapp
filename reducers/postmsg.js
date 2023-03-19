const initial = {
    postmsg: [],
    delemsg: [],
    updatepic: []
}

const post = (state = initial, action) => {
    switch (action.type) {
        case "POSTMSG":
            return {
                postmsg: action.payload.data
            }
        case "DELEMSG":
            return {
                delemsg: action.payload.data
            }
        case "UPDATE_PIC":
            return {
                updatepic: action.payload
            }
        default: return state
    }

}
export default post
