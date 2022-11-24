import React, {useEffect, useMemo, useState} from "react";
import {ExpensesItem} from "../ExpensesItem";
import {Loader} from "../Loader";
import {ErrorMessage} from "../ErrorMessage";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {ExpenseModal} from "../ExpenseModal";
import * as expensesSlice from '../../features/expenses/expensesSlice';
import 'bulma-divider';
import {useNavigate} from "react-router-dom";
import classNames from "classnames";
import { Expense } from "../../types/Expense";

export const ExpensesList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { allExpenses, status: ExpensesStatus } = useAppSelector(
        (state => state.expenses),
    );

    const totalSum = useMemo(() => {
        return allExpenses?.reduce((acc, curr) => acc + curr.amount, 0)
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }, [allExpenses]);

    const [sortBy, setSortBy] = useState('');
    const [visibleExpenses, setVisibleExpenses] = useState<Expense[] | null>(allExpenses);

    const navigate = useNavigate();
    const routeChange = () => {
        navigate('/');
    };

    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem('user');

        if (!userFromLocalStorage) {
            routeChange();
            return;
        } else if (allExpenses) {
            return;
        }


        if (userFromLocalStorage) {
            dispatch(expensesSlice.getExpensesAsync({ id: JSON.parse(userFromLocalStorage).id }));
        }

        setVisibleExpenses(_ => allExpenses);
    }, []);

    useEffect(() => {
        setVisibleExpenses(allExpenses);
    }, [allExpenses]);

    useEffect(() => {
        if (!allExpenses) {
            return;
        }

        setVisibleExpenses(_ => [...allExpenses].sort((prev, curr) => {
            switch (sortBy) {
                case 'amount':
                    return curr.amount - prev.amount;
                case 'spent':
                    const prevDate = new Date(prev.spentat).getTime();
                    const currDate = new Date(curr.spentat).getTime();
                    return currDate - prevDate;
                case 'create':
                    return curr.id - prev.id;
                default:
                    return 0;
            }
        }));
    }, [sortBy]);

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
                <>
                    <div className="box">
                        <span className="title is-3">
                            <span className="has-text-success">
                                Total sum:
                            </span>
                            ${totalSum}
                        </span>

                        <div className="is-divider" data-content="AND"></div>

                        <span className="title is-3">
                            <span className="has-text-success">Total items:</span> <strong>{allExpenses?.length}</strong>
                        </span>
                    </div>

                    <div className="box">
                        <span className="button is-white mr-2">Sort by:</span>
                        <button
                            className={classNames('button is-success mr-2', { 'is-light': sortBy !== 'spent' })}
                            onClick={() => {
                                setSortBy('spent');
                            }}
                        >
                            Date of spent
                        </button>
                        <button
                            className={classNames('button is-success mr-2', { 'is-light': sortBy !== 'create' })}
                            onClick={() => {
                                setSortBy('create');
                            }}
                        >
                            Date of create
                        </button>
                        <button
                            className={classNames('button is-success mr-2', { 'is-light': sortBy !== 'amount' })}
                            onClick={() => {
                                setSortBy('amount');
                            }}
                        >
                            Amount
                        </button>
                        <button
                            className="button is-success mr-2"
                            onClick={() => {
                                setSortBy('');
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </>
            )}

            {ExpensesStatus === 'idle' && visibleExpenses?.map(item => (
                <ExpensesItem key={item.id} expense={item} />
            ))}

            {visibleExpenses?.length === 0 && (
                <p className="box">
                    No expenses yet!
                </p>
            )}
        </div>
    );
}
