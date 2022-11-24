import React, { FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserAsync } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useAppDispatch();
    const { user, status } = useAppSelector((state => state.user));

    let navigate = useNavigate();
    const routeChange = () => {
      navigate('/');
    }

    const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await dispatch(getUserAsync({ email, password }));

        if (!localStorage.getItem('user')) {
            return;
        }

        routeChange();
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
      }, [user]);

    return (
        <form
            className="box column is-4 is-offset-4"
            onSubmit={formSubmit}
        >
            <h1 className="title is-3 has-text-success has-text-centered">Login</h1>
            <hr />
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input
                        className="input"
                        type="email"
                        placeholder="you@xpns.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input
                        className="input"
                        type="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <button
                disabled={status === 'loading'}
                className="button is-success is-fullwidth"
            >

                {status === 'loading' ? <Loader /> : (
                    <>
                        Log in
                        <span className="ml-1 icon">
                            <i className="fas fa-sign-in-alt"></i>
                        </span>
                    </>
                )}
            </button>

            <div className="field"></div>

            {status === 'failed' && (
                <div className="notification is-danger">
                    Wrong email or password! Please check it and try again.
                </div>
            )}
        </form>
    )
}
