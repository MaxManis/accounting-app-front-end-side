import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { fetchUser } from "./userAPI";

export interface UserState {
    user: User | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
    user: null,
    status: 'idle',
};

type geyUserAsyncParams = {
    email: string,
    password: string,
}

export const getUserAsync = createAsyncThunk(
    'user/fetchUser',
    async ({ email, password }: geyUserAsyncParams) => {
        return await fetchUser(email, password);
    },
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            // eslint-disable-next-line no-param-reassign
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserAsync.pending, (state) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'loading';
            })
            .addCase(getUserAsync.fulfilled, (state, action) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'idle';
                // eslint-disable-next-line no-param-reassign
                state.user = action.payload;
            })
            .addCase(getUserAsync.rejected, (state) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'failed';
            });
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;