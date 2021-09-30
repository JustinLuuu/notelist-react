import {configureStore} from '@reduxjs/toolkit'
import noteReducer from './noteSlice'
import userReducer from './userSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        notes: noteReducer
    }
})