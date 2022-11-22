import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import expensesReducer from '../features/expenses/expensesSlice';
import userReducer from '../features/user/userSlice';
import categoriesReducer from '../features/categories/categoriesSlice';

export const store = configureStore({
    reducer: {
        expenses: expensesReducer,
        user: userReducer,
        categories: categoriesReducer
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

/* eslint-disable @typescript-eslint/indent */
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
