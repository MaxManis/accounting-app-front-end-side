import React, {useEffect, useMemo, useState} from "react";
import { ExpensesItem } from "../ExpensesItem";
import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ExpenseModal } from "../ExpenseModal";
import * as expensesSlice from '../../features/expenses/expensesSlice';
import 'bulma-divider';
import {useNavigate} from "react-router-dom";

export const ExpensesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { allExpenses, status: ExpensesStatus, selectedExpense } = useAppSelector(
        (state => state.expenses),
    );
    const { user } = useAppSelector(
        (state => state.user),
    );
    const totalSum = useMemo(() => {
        return allExpenses?.reduce((acc, curr) => acc + curr.amount, 0)
    }, [allExpenses]);

    let navigate = useNavigate();
    const routeChange = () => {
        navigate('/');
    }

    useEffect(() => {
        if (!localStorage.getItem('user')) {
            routeChange();
        }

        if (allExpenses) {
            return;
        }

        const userFromLocalStorage = localStorage.getItem('user');

        if (userFromLocalStorage) {
            dispatch(expensesSlice.getExpensesAsync({ id: JSON.parse(userFromLocalStorage).id }));
        }

    }, []);

    return (
        <div className="box">
            <ExpenseModal />

            {ExpensesStatus === 'loading' && (
                <Loader />
            )}

            {ExpensesStatus === 'failed' && (
                <ErrorMessage />
            )}

            {ExpensesStatus === 'idle' && allExpenses && (
                <div className="box">
                    <span className="title is-3">
                        <span className="has-text-success">Total sum:</span> ${totalSum?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>

                    <div className="is-divider" data-content="AND"></div>

                    <span className="title is-3">
                        <span className="has-text-success">Total items:</span> <strong>{allExpenses?.length}</strong>
                    </span>
                </div>
            )}

            {ExpensesStatus === 'idle' && allExpenses?.map(item => (
                <ExpensesItem key={item.id} expense={item} />
            ))}

            {allExpenses?.length === 0 && (
                <p className="box">
                    No expenses yet!
                </p>
            )}
        </div>
    );
}
