import React, { useState } from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import './Nav.scss'
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setUser } from "../../features/user/userSlice";
import { client } from "../../utils/fetch";
import {Loader} from "../Loader";

export const Nav: React.FC = () => {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAppSelector(
        (state => state.user),
    );

    const dispatch = useAppDispatch();
    let navigate = useNavigate();
    const routeChange = () => {
      navigate('/');
    }

    const logoutUser = async () => {
        setIsLoading(true);
        await client.get('/users/logout');
        dispatch(setUser(null));
        localStorage.removeItem('user');
        setIsLoading(false);
        routeChange();
        window.location.reload();
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="d--flex" href="/">
                    <img className="logo" src="./EXPNS-logo.png" width="112" height="28" />
                </a>

                <a
                    role="button"
                    className={classNames('navbar-burger', {
                        'is-active': mobileMenu,
                    })}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div
                id="navbarBasicExample"
                className={classNames('navbar-menu', {
                    'is-active': mobileMenu,
                })}
            >
                <div
                    className="navbar-start"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    <NavLink
                        to="/"
                        className={({ isActive }) => classNames('navbar-item', {
                            'has-background-success-light has-text-success-dark': isActive,
                        })}
                    >
                        Home
                    </NavLink>

                    {user && (
                        <>
                            <NavLink
                                to="/expenses"
                                className={({ isActive }) => classNames('navbar-item', {
                                    'has-background-success-light has-text-success-dark': isActive,
                                })}
                            >
                                Expenses
                            </NavLink>

                            <div className="navbar-item has-dropdown is-hoverable">
                                <NavLink
                                    to="/create"
                                    className={({ isActive }) => classNames('navbar-item', {
                                        'has-background-success-light has-text-success-dark': isActive,
                                    })}
                                >
                                    Create
                                </NavLink>

                                <div className="navbar-dropdown">
                                    <Link
                                        to="/create"
                                        className="navbar-item"
                                    >
                                        Create expense
                                    </Link>
                                    <Link
                                        to="/create/category"
                                        className="navbar-item"
                                    >
                                        Create category
                                    </Link>

                                    <hr className="navbar-divider" />

                                    <Link
                                        to="/create/create-faq"
                                        className="navbar-item"
                                    >
                                        Create FAQ
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="navbar-item has-dropdown is-hoverable">
                        <NavLink
                            to="/about"
                            className={({ isActive }) => classNames('navbar-item', {
                                'has-background-success-light has-text-success-dark': isActive,
                            })}
                        >
                            About
                        </NavLink>

                        <div className="navbar-dropdown">
                            <Link
                                to="/about"
                                className="navbar-item"
                            >
                                About project
                            </Link>
                            <hr className="navbar-divider" />
                            <Link
                                to="/about/author"
                                className="navbar-item"
                            >
                                About author
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    className="navbar-end"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    <div className="navbar-item">
                        <div className="buttons">
                            {!user ? (
                                <>
                                    <Link to="/singup" className="button is-success">
                                        <strong>Sign up</strong>
                                    </Link>
                                    <Link to="/login" className="button is-success is-light">
                                        Log in
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="button is-success is-light"
                                        onClick={logoutUser}
                                    >
                                        {isLoading ? <Loader /> : 'Log out'}
                                    </button>

                                    <Link
                                        to="/my-profile"
                                        className={classNames('button', {
                                            'is-success': user.active,
                                            'is-warning': !user.active,
                                        })}
                                    >
                                        {user.name}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
