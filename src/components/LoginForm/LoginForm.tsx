import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
      }, [user]);

    return (
        <form
            className="box"
            onSubmit={async (e) => {
                e.preventDefault();
                await dispatch(getUserAsync({ email, password }));

                if (!localStorage.getItem('user')) {
                    return;
                }

                routeChange();
            }}
        >
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input
                        className="input"
                        type="email"
                        placeholder="e.g. alex@example.com"
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

            <button disabled={status === 'loading'} className="button is-success">
                {status === 'loading' ? <Loader /> : 'Sign in'}</button>

            <div className="field"></div>

            {status === 'failed' && (
                <div className="notification is-danger">
                    Wrong email or password! Please check it and try again.
                </div>
            )}
        </form>
    )
}
