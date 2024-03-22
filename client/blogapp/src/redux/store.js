import {configureStore} from '@reduxjs/toolkit';
import userAuthorReducer from './slices/userAuthorslices';
export const store = configureStore({
    reducer:{
        userAuthoruserAuthorLoginReducer:userAuthorReducer
    }
})