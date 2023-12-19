import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataUser: (state, action) => {
            state.value = action.payload
        }
    }
})

export const selectUser = state => state.user.value;
export const { setDataUser } = userSlice.actions
export default userSlice.reducer