import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import * as expensesSlice from '../../features/expenses/expensesSlice';
import classNames from "classnames";
import {useNavigate} from "react-router-dom";
import {ActivationHelper} from "../ActivationHelper";

export const MyProfile: React.FC = () => {
    const [showHelp, setShowHelp] = useState(false);

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(
        (state => state.user),
    );
    const { allExpenses, status } = useAppSelector(
        (state => state.expenses),
    );
    const navigate = useNavigate();
    const routeChange = () => {
        navigate('/');
    }

    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem('user');

        if (!userFromLocalStorage) {
            routeChange();
            return;

        } else if (allExpenses) {
            return;
        }

        dispatch(expensesSlice.getExpensesAsync({ id: JSON.parse(userFromLocalStorage).id }))
    }, [])

    return (
        <article className="panel is-success">
            <p className="panel-heading">
                My profile : {user?.name}
            </p>
            <a className="panel-block is-active">
            <span className="panel-icon">
                <i className="fas fa-user" aria-hidden="true"></i>
            </span>
                {user?.name}
            </a>
            <a className="panel-block">
            <span className="panel-icon">
                <i className="fas fa-envelope" aria-hidden="true"></i>
            </span>
                {user?.email}
            </a>
            <a className="panel-block">
            <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
            </span>
                {status === 'loading' ? (
                    <span className="panel-icon">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </span>
                ) : (
                    allExpenses?.length || 0
                )}
            </a>
            <a className="panel-block">
            <span className="panel-icon">
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
            </span>
                {status === 'loading' ? (
                    <span className="panel-icon">
                        <i className="fas fa-spinner fa-pulse"></i>
                    </span>
                ) : (
                    '$ ' + allExpenses?.reduce((p, c) => p + c.amount, 0) || 0
                )}

            </a>
            <a
                onClick={() => {
                    if (user?.active) {
                        return;
                    }
                    setShowHelp(true);
                    setTimeout(() => {
                        setShowHelp(false);
                    }, 15000);
                }}
                className={classNames('panel-block', {
                    'has-text-success': user?.active,
                    'has-text-danger': !user?.active,
                })}
            >
            <span className="panel-icon">
                <i className="fas fa-lock" aria-hidden="true"></i>
            </span>
                {user?.active ? 'Verified account' : 'Non verified account'}
            </a>

            {showHelp && <ActivationHelper />}
        </article>
    );
}
