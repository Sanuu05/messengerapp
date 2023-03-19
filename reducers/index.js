import {combineReducers} from 'redux'
import user from './user'
import error from './error'
import item from './items'
import all from './alluser'
import allmsg from './allmsg'
import post from './postmsg'

export default (combineReducers)({
    item,
    user,
    error,
    all,
    allmsg,
    post
})