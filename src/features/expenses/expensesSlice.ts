import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from "../../types/Expense";
import { fetchExpenses } from "./expensesAPI";

export interface ExpensesState {
    allExpenses: Expense[] | null;
    selectedExpense: Expense | null;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: ExpensesState = {
    allExpenses: null,
    selectedExpense: null,
    status: 'idle',
};

type getExpensesAsyncParans = {
    id: number,
}

export const getExpensesAsync = createAsyncThunk(
    'expenses/fetchExpenses',
    async ({ id }: getExpensesAsyncParans) => {
        return await fetchExpenses( id );
    },
);

export const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        setExpense: (state, action: PayloadAction<Expense | null>) => {
            // eslint-disable-next-line no-param-reassign
            state.selectedExpense = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getExpensesAsync.pending, (state) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'loading';
            })
            .addCase(getExpensesAsync.fulfilled, (state, action) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'idle';
                // eslint-disable-next-line no-param-reassign
                state.allExpenses = action.payload;
            })
            .addCase(getExpensesAsync.rejected, (state) => {
                // eslint-disable-next-line no-param-reassign
                state.status = 'failed';
            });
    },
});

export const { setExpense } = expensesSlice.actions;
export default expensesSlice.reducer;
