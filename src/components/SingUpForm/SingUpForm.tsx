import classNames from "classnames";
import React, { useState } from "react";
import { client } from "../../utils/fetch";
import { validateEmail } from "../../utils/utils";
import { ErrorMessage } from "../ErrorMessage";
import { Loader } from "../Loader";

export const SingUpForm: React.FC = () => {
    const [ email, setEmail ] = useState('');
    const [ emailError, setEmailError ] = useState(false);
    const [ userName, setUserName ] = useState('');
    const [ userNameError, setUserNameError ] = useState(false);
    const [ password1, setPassword1 ] = useState('');
    const [ password1Error, setPassword1Error ] = useState(false);
    const [ password2, setPassword2 ] = useState('');
    const [ password2Error, setPassword2Error ] = useState(false);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isError, setIsError ] = useState(false);
    const [ isSuccess, setIsSuccess ] = useState(false);

    const formReset = () => {
        setEmail('');
        setUserName('');
        setPassword1('');
        setPassword2('');
    };

    const formSubmit = async () => {
        if (!userName.trim() || ! email || !password1.trim()
            || !password2.trim() || password1 !== password2
            || userNameError || emailError || password1Error || password2Error
        ) {
            return;
        }
        const userData = {
            name: userName,
            email,
            password: password1,
        };

        setIsLoading(true);
        try {
            await client.post('/users/registration', userData);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 3000);
        }
        setIsLoading(false);
    };

    return (
        <form
            className="box"
            onSubmit={(e) => {
                e.preventDefault();
                formSubmit();
            }}
        >
            <div className="field">
                <label className="label">Username</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        required
                        className={classNames('input', {
                            'is-success': !userNameError && userName.length > 3,
                            'is-danger': userNameError,
                        })}
                        type="text"
                        placeholder="Username"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value);
                            setUserNameError(false);
                        }}
                        onBlur={() => {
                            if (userName.length < 4 || userName.match(/[^a-zA-Z]/)) {
                                setUserNameError(true);
                            }
                        }}
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                    </span>
                </div>
                {userNameError && (
                    <p className="help is-danger">
                        Username should be at least 4 characters length and contains only English letters.
                    </p>
                )}
            </div>

            <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left has-icons-right">
                    <input
                        required
                        className={classNames('input', {
                            'is-success': !emailError && email.length > 5,
                            'is-danger': emailError,
                        })}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(false);
                        }}
                        onBlur={() => {
                            if (!validateEmail(email)) {
                                setEmailError(true);
                            }
                        }}
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </div>
                {emailError && (
                    <p className="help is-danger">This email is invalid</p>
                )}

            </div>

            <div className="field">
                <label className="label">Password</label>
                <p className="control has-icons-left">
                    <input
                        required
                        className={classNames('input', {
                            'is-success': !password1Error && password1.length >= 5,
                            'is-danger': password1Error,
                        })}
                        type="password"
                        placeholder="Password"
                        value={password1}
                        onChange={(e) => {
                            setPassword1(e.target.value);
                            setPassword1Error(false);
                        }}
                        onBlur={() => {
                            if (password1.trim().length < 5) {
                                setPassword1Error(true);
                            }
                        }}
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                    </span>
                </p>
                {password1Error && (
                    <p className="help is-danger">Your password is too short. At least 5 characters.</p>
                )}
            </div>

            <div className="field">
                <label className="label">Confirm password</label>
                <p className="control has-icons-left">
                    <input
                        required
                        className={classNames('input', {
                            'is-success': !password2Error && password2 === password1 && password2.length,
                            'is-danger': password2Error,
                        })}
                        type="password"
                        placeholder="Confirm password"
                        value={password2}
                        onChange={(e) => {
                            setPassword2(e.target.value);
                            setPassword2Error(false);
                        }}
                        onBlur={() => {
                            if (password2 !== password1) {
                                setPassword1Error(true);
                            }
                        }}
                    />
                    <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                    </span>
                </p>
                {password2Error && (
                    <p className="help is-danger">Second password doesnt match the first one.</p>
                )}
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input required type="checkbox" />&nbsp;
                        I agree to the terms and conditions
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button type="submit" className="button is-success">
                        {isLoading ? <Loader /> : 'Submit'}
                    </button>
                </div>
                <div className="control">
                    <button
                        type="reset"
                        className="button is-link is-light"
                        onClick={formReset}
                    >
                        Clear
                    </button>
                </div>
            </div>
            {isSuccess && (
                <div className="notification is-success">
                    Registration completed successfully!
                    Now you need to activate your account.
                    <br />
                    <strong>We have sent a link to your email to activate your account, please follow it.</strong>
                    <br />
                    <strong>
                        PAY ATTENTION! It could take some time, or check your SPAM folder.
                        If you dont get the mail quick you can login to your account and activate it later. :(
                    </strong>
              </div>
            )}
            {isError && <ErrorMessage />}
        </form>
    );
}
