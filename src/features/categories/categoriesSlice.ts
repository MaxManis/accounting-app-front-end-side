import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from "../../types/Category";
import { fetchCategories } from "./categoriesAPI";

export interface CategoriesState {
    allCategories: Category[] | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: CategoriesState = {
    allCategories: null,
    status: 'idle',
};

type getCategoriesAsyncParans = {
    id: number,
}

export const getCategoriesAsync = createAsyncThunk(
    'categories/fetchCategories',
    async ({ id }: getCategoriesAsyncParans) => {
        return await fetchCategories( id );
    },
);

export const categoriesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[] | null>) => {
            // eslint-disable-next-line no-param-reassign
            state.allCategories = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesAsync.pending, (state) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'loading';
            })
            .addCase(getCategoriesAsync.fulfilled, (state, action) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'idle';
                // eslint-disable-next-line no-param-reassign
                state.allCategories = action.payload;
            })
            .addCase(getCategoriesAsync.rejected, (state) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'failed';
            });
    },
});

export const { setCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;