import React from "react";
import { Link } from "react-router-dom";

export const HomePage: React.FC = () => {
    return (
        <div className="hero-body">
            <div className="container has-text-centered">
                <div className="columns is-vcentered">
                    <div className="column is-5">
                        <figure className="image is-4by3">
                            <img
                                src="https://mastersnote.com/wp-content/uploads/2021/05/Types-of-Assets.jpg"
                                alt="Description"
                            />
                        </figure>
                    </div>

                    <div className="column is-6 is-offset-1">
                        <h1 className="title is-2">
                            Count expenses with <span className="has-text-success">XPNS</span>
                        </h1>
                        <h2 className="subtitle is-4">
                            Stop collecting paper checks. Now they are all in one place.
                        </h2>
                        <br />
                            <p className="has-text-centered">
                                <Link
                                    className="button is-medium is-success is-outlined"
                                    to="/about"
                                >
                                    Learn more
                                </Link>
                            </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
