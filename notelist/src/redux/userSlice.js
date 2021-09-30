import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const getUserAsync = createAsyncThunk(
    'users/getUserAsync',
    async (payload) => {
        const response = await fetch('http://localhost:7000/userExist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: payload.username, password: payload.password })
        });
        if (response.ok) {
            const info = await response.json();
            return {info};
        }
    }
)

export const createUserAsync = createAsyncThunk(
    'users/createUserAsync',
    async (payload) => {
        const response = await fetch('http://localhost:7000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullname: payload.fullname, username:
                    payload.username, password: payload.password
            })
        });
        if (response.ok) {
            const info = await response.json();
            return { info };
        }
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem('user')) || { isAuthenticated: false, info: {} },
    reducers:{
        logout: (state, action) =>{
            return { isAuthenticated: false, info: action.payload };
        }
    },
    extraReducers: {
        [getUserAsync.fulfilled]: (state, action) => {
            const isEmpty = (Object.keys(action.payload.info).length>0);
            return {isAuthenticated: isEmpty, info: action.payload.info}
        },
        [createUserAsync.fulfilled]: (state, action) =>{
            return {isAuthenticated: true, info: action.payload.info}
        }
    }
});

export const {logout} = userSlice.actions;
export default userSlice.reducer;