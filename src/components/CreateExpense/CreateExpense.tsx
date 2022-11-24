import React, { useEffect, useState } from 'react';
import classNames from "classnames";
import { ErrorMessage } from "../ErrorMessage";
import { Loader } from "../Loader";
import { client } from "../../utils/fetch";
import { Expense } from "../../types/Expense";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as expensesSlice from '../../features/expenses/expensesSlice';
import { getCategoriesAsync } from '../../features/categories/categoriesSlice';
import { useNavigate } from "react-router-dom";
import { SuccessLabel } from "../SuccessLabel";
import {ActivationHelper} from "../ActivationHelper";

export const CreateExpense: React.FC = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(
        (state => state.user),
    );
    const { allCategories: categories, status: categoriesStatus } = useAppSelector(
        (state => state.categories)
    );

    const [title, setTitle] = useState('');
    const [titleErr, setTitleErr] = useState(false);
    const [amount, setAmount] = useState(0);
    const [amountErr, setAmountErr] = useState(false);
    const [category, setCategory] = useState('');
    const [categoryError, setCategoryError] = useState(false);
    const [note, setNote] = useState('');
    const [spentat, setSpentAt] = useState('');
    const [spentAtErr, setSpentAtErr] = useState(false);
    const [formErr, setFormErr] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    let navigate = useNavigate();
    const routeChange = () => {
        navigate('/');
    };

    useEffect(() => {
        const localUser = localStorage.getItem('user');
        if (!localUser) {
            routeChange();

            return;
        }

        if (categories) {
            return;
        }

        dispatch(getCategoriesAsync({ id: user?.id || JSON.parse(localUser).id }));
    }, []);

    const createExpense = async () => {
        setIsLoading(true);

        try {
            const data = {
                userid: user?.id,
                title,
                amount,
                category,
                note,
                spentat,
            };

            await client.post<Omit<Expense, 'id'>>('/expenses', data);
            if (user) {
                await dispatch(expensesSlice.getExpensesAsync({ id: user.id }));
            }
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
            formClear();
        } catch (e) {
            setLoadError(true);
            setTimeout(() => {
                setLoadError(false);
            }, 4000);
        }

        setIsLoading(false);
    };

    const formClear = () => {
        setNote('');
        setAmount(0);
        setTitle('');
        setSpentAt('');
    };

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (titleErr || amountErr || spentAtErr || !title
            || !amount || !spentat || categoryError || !category
        ) {
            setFormErr(true);
            setTimeout(() => {
                setFormErr(false);
            }, 3000);

            return;
        }

        createExpense();
    };

    return (
        <div>
            {loadError && (
                <ErrorMessage />
            )}

            {isLoading && (
                <Loader />
            )}

            <form
                className="box"
                onSubmit={formSubmit}
            >
                <h1 className="title is-4 has-text-success">Create expense</h1>

                <hr />

                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            className={classNames('input', {
                                'is-danger': titleErr,
                            })}
                            required
                            type="text"
                            placeholder="Car..."
                            value={title}
                            onChange={(e) => {
                                setTitleErr(false);
                                setTitle(e.target.value);
                            }}
                            onBlur={() => {
                                if (!title.trim()) {
                                    setTitleErr(true);
                                }
                            }}
                        />
                        {titleErr && (
                            <p className="help is-danger">Expense title required!</p>
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Amount</label>
                    <div className="control">
                        <input
                            className={classNames('input', {
                                'is-danger': amountErr,
                            })}
                            required
                            type="number"
                            placeholder="123"
                            value={amount}
                            onChange={(e) => {
                                setAmountErr(false);
                                setAmount(+e.target.value);
                            }}
                            onBlur={() => {
                                if (!amount) {
                                    setAmountErr(true);
                                }
                            }}
                        />
                        {amountErr && (
                            <p className="help is-danger">Amount required!</p>
                        )}
                    </div>
                </div>

                <div className="field">
                    <label className="label">Category</label>
                    <div className="control">
                        {(categoriesStatus === 'idle' && !categories?.length) ? (
                            <p className="notification is-warning">
                                You dont have any categories for your expenses. Create your first category!
                            </p>
                        ) : (
                            <>
                                <div className="select">
                                    {categoriesStatus === 'loading' && (
                                        <Loader />
                                    )}

                                    {categories && (
                                        <select
                                            onChange={e => {
                                                setCategoryError(false);
                                                setCategory(_ => e.target.value);
                                            }}
                                            onBlur={() => {
                                                if (!category) {
                                                    setCategoryError(true);
                                                }
                                            }}
                                            value={category}
                                        >
                                            <option disabled value="">Choose a category</option>
                                            {categories?.map(item => (
                                                <option
                                                    key={item.id}
                                                    value={item.name}
                                                >
                                                    {item.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {categoryError && (
                                    <p className="help is-danger">Category required!</p>
                                )}
                            </>
                        )}

                    </div>
                </div>

                <div className="field">
                    <label className="label">Note</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            placeholder="Something about this item..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Spent at</label>
                    <div className="control">
                        <input
                            className={classNames('input', {
                                'is-danger': spentAtErr,
                            })}
                            type="date"
                            placeholder="2012-12-12"
                            value={spentat}
                            onChange={(e) => {
                                setSpentAtErr(false);
                                setSpentAt(e.target.value);
                            }}
                            onBlur={() => {
                                if (!spentat) {
                                    setSpentAtErr(true);
                                }
                            }}
                        />
                        {spentAtErr && (
                            <p className="help is-danger">Spent at date required!</p>
                        )}
                    </div>
                </div>

                {user?.active ? (
                    <button
                        className="button is-success"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader />
                        ) : 'Create'}
                    </button>
                ) : (
                    <button
                        type="button"
                        className="button is-warning"
                        onClick={() => {
                            setShowHelp(true);
                            setTimeout(() => {
                                setShowHelp(false);
                            }, 15000)
                        }}
                    >
                        Verify your account to create an Expense!
                    </button>
                )}

                {showHelp && <ActivationHelper />}

                {formErr && (
                    <p className="help is-danger">Data is invalid, please check it and try again!</p>
                )}

                {isSuccess && <SuccessLabel />}
            </form>
        </div>
    );
}
