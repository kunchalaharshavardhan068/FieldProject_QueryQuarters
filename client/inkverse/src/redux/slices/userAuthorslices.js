import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

//make http request using middlewares
export const userAuthorLoginThunk=createAsyncThunk('user-author-login',async(userCred,thunkApi)=>{
    
    if(userCred.usertype==='user')
    {
       const res = await axios.post('http://localhost:4000/user-api/login',userCred)
       if(res.data.message==='User Login Successful'){
        //store the token retured in local or session storage
        localStorage.setItem('token',res.data.token);
        //return data
       }
       else {
        return thunkApi.rejectWithValue(res.data.message)
       }
    
    return res.data;
    }
    
    if(userCred.usertype==='author')
    {

       const res = await axios.post('http://localhost:4000/author-api/login',userCred)
       if(res.data.message==='Login Successful'){
        //store the token retured in local or session storage
        localStorage.setItem('token',res.data.token);
       }
       else {
        return thunkApi.rejectWithValue(res.data.message)
       }
    
    return res.data;
    }

} )



export const userAuthorslices = createSlice({
    name:'user-author-login',
    initialState:{
        isPending: false,
        loginUserStatus:false,
        currentUser:{},
        errorOccured:false,
        errmsg:''
    },
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errorOccured=false;
            state.errmsg='';
        }
    },
    extraReducers: builder=>builder
    .addCase(userAuthorLoginThunk.pending,(state,action)=>{
        state.isPending=true;
    })
    .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
        state.isPending=false;
        state.currentUser=action.payload.user;
        state.loginUserStatus=true;
        state.errmsg='';
        state.errorOccured=false;
    })
    .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
        state.currentUser={};
        state.loginUserStatus=false;
        state.errmsg=action.payload;
        state.errorOccured=true;
    }), 
})

//export action creator functions
export const {resetState} = userAuthorslices.actions;
//export root reducer
export default userAuthorslices.reducer;