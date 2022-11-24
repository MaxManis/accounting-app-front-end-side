import classNames from "classnames";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCategoriesAsync } from "../../features/categories/categoriesSlice";
import { client } from "../../utils/fetch";
import { ErrorMessage } from "../ErrorMessage";
import { Loader } from "../Loader";
import {SuccessLabel} from "../SuccessLabel";

export const CreateCategory: React.FC = () => {
    const [category, setCategory] = useState('');
    const [nameError, setNameError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { user } = useAppSelector((state => state.user))
    const dispatch = useAppDispatch();

    const formSubmit = async () => {
        if (nameError || !category.trim().length) {
            return;
        }

        setIsLoading(true);
        try {
            if (!user) {
                return;
            }

            await client.post('/categories', { userid: user?.id, name: category });
            await dispatch(getCategoriesAsync({ id: user?.id }));
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    }

    return (
        <form
            action=""
            className="box"
            onSubmit={(e) => {
                e.preventDefault();
                formSubmit();
            }}
        >
            <div className="field">
                <label className="label has-text-success">New category name</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        className={classNames('input', {
                            'is-success': !nameError && category.length >= 3,
                            'is-danger': nameError,
                        })}
                        type="text"
                        placeholder="New category name"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value);
                            setNameError(false);
                        }}
                        onBlur={() => {
                            if (category.trim().length < 3) {
                                setNameError(true);
                            }
                        }}
                    />
                    <span className="icon is-small is-left">
                        <i className="fas fa-arrow-right"></i>
                    </span>
                </div>
                {nameError && (
                    <p className="help is-danger">This name is unavailable for category :(</p>
                )}
            </div>

            <div className="control">
                <button type="submit" className="button is-success">
                    {isLoading ? <Loader /> : 'Create'}
                </button>
            </div>

            {isSuccess && <SuccessLabel />}

            {isError && <ErrorMessage />}
        </form>
    )
};
