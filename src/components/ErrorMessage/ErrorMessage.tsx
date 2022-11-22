import React from "react";

export const ErrorMessage: React.FC = () => (
    <div className="notification is-danger">
        <button className="delete"></button>
        Sorry! Something went wrong :(
    </div>
);
