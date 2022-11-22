import React from "react";

export const PageNotFound: React.FC = () => (
    <article className="message is-warning">
        <div className="message-header">
            <p>404</p>
        </div>
        <div className="message-body">
            <h1 className="title is-1">Page not found :(</h1>
        </div>
    </article>
);
