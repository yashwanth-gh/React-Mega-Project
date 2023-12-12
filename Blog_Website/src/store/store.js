import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
const store = configureStore({
    reducer:{
        // here when we create object and then we make reducers of variours slices as KEYS
        // you have to access the reducer in useSelector as state.auth.variable_name
        auth:authReducer,

    }
    
})

export default store;