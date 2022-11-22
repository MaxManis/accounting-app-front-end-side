import React from "react";
import { Expense } from "../../types/Expense";
import { useAppDispatch } from "../../app/hooks";
import * as expensesSlice from '../../features/expenses/expensesSlice';

type Props = {
    expense: Expense,
};

export const ExpensesItem: React.FC<Props> = ({ expense }) => {
    const dispatch = useAppDispatch();

    const setCurrentExpense = () => {
        dispatch(expensesSlice.setExpense(expense));
    };

    return (
        <div className="box">
            <article className="media">
                <div className="media-content">
                    <div className="content">
                        <p>
                            <small>Title:</small><strong> {expense.title} </strong>
                            <br />
                            <small>Note:</small><strong> {expense.note || 'No additional info for this expense'}</strong>
                            <br />
                            <small>Amount:</small><strong> ${expense.amount}</strong> spent at <strong>{expense.spentat}</strong>
                        </p>
                    </div>
                </div>

                <div className="media-right">
                    <button
                        className="button is-info"
                        onClick={setCurrentExpense}
                    >
                        Open
                    </button>
                </div>
            </article>
        </div>
    );
}
