import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCESS, REGISTER_SUCCESS, REGISTER_FAIL, USER_PROFILE, LOAD, UNLOAD } from '../action/types'
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
    // token: await AsyncStorage.getItem('tokenmain'),
    isAuthenticated: false,
    isLoading: false,
    user:null,
    signin: false,
    load: false,
    oneuser: []
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                user:action.payload.user,
                isLoading: true

            }
        case LOAD:
            return {
                ...state,
                load: true

            }
        case UNLOAD:
            return {
                ...state,
                load: false

            }
        case USER_LOADED:

            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        case USER_PROFILE:
            return {
                ...state,
                isisAuthenticated: true,
                isLoading: false,
                user: action.payload
            }
        // case "ONEUSER":
        //     return {
        //         ...state,
        //         isisAuthenticated: true,
        //         isLoading: false,
        //         oneuser: action.payload
        //     }
        case LOGIN_SUCCESS:
            AsyncStorage.setItem('tokenmain', action.payload.token)
            AsyncStorage.setItem('user', JSON.stringify(action.payload.user))
            console.log("???????????????????????????????????????",action.payload)
            return {
                ...state,
                ...action.payload,
                user:action.payload.user,
                isAuthenticated: true,
                isLoading: false

            }
        case REGISTER_SUCCESS:

            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                signin: true

            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCESS:
            AsyncStorage.removeItem('tokenmain')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state

    }
}
export default user;