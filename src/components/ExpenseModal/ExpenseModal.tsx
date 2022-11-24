import React, { useState } from "react";
import classNames from "classnames";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as expensesSlice from '../../features/expenses/expensesSlice';

import { Loader } from "../Loader";
import { ErrorMessage } from "../ErrorMessage";

const API_URL = 'https://kind-pink-bullfrog-cap.cyclic.app';

export const ExpenseModal: React.FC = () => {
    const dispatch = useAppDispatch();
    const { selectedExpense } = useAppSelector((state => state.expenses));
    const { user } = useAppSelector((state => state.user));

    const closeModal = () => {
        dispatch(expensesSlice.setExpense(null));
    };

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const deleteExpense = async () => {
        setIsLoading(true);
        try {
            await fetch(`${API_URL}/expenses/${selectedExpense?.id}`, { method: 'DELETE' });
            await dispatch(expensesSlice.getExpensesAsync({ id: user?.id || 1 }));
            closeModal();
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    }

    return (
        <div className={classNames('modal', {
            'is-active': selectedExpense,
        })}>
            <div
                className="modal-background"
                onClick={closeModal}
            ></div>
            <div className="modal-content">
                <div className="box">
                    <article className="media">
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <small>Title:</small><strong> {selectedExpense?.title} </strong>
                                    <br />
                                    <small>Note:</small><strong> {selectedExpense?.note || 'No additional info for this expense'}</strong>
                                    <br />
                                    <small>Amount:</small><strong> ${selectedExpense?.amount}</strong>
                                    <br />
                                    <small>Spent at:</small> <strong>{selectedExpense?.spentat}</strong>
                                    <br />
                                    <small>Category:</small> <strong>{selectedExpense?.category}</strong>
                                </p>

                                <button
                                    className="button is-warning"
                                    onClick={deleteExpense}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader /> : 'Delete'}
                                </button>

                                {isError && <ErrorMessage />}
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <button
                className="modal-close is-large"
                aria-label="close"
                onClick={closeModal}
            ></button>
        </div>
    );
}
