import { ADD_ITEMS, DELETE_ITEMS, GET_ITEMS, UPDATE_ITEMS, LIKE } from '../action/types'


const item = (state = [], action) => {
    switch (action.type) {

        case GET_ITEMS:
        
            return action.payload.data
        case UPDATE_ITEMS:
            return [...state, action.payload.data]
        case ADD_ITEMS:
            return [...state, action.payload]
        case DELETE_ITEMS:
            return state.filter((state) => state._id !== action.payload)
        case LIKE:

            return state.map((state) => state.id === action.payload._id ? action.payload : state)

        default:
            return state
    }


}
export default item