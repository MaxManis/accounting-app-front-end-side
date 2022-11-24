import React from "react";
import { Expense } from "../../types/Expense";
import { ExpensesItem } from "../ExpensesItem";

const demoExpense: Expense = {
    id: 0,
    title: 'IPhone',
    userid: 0,
    category: 'Tech',
    amount: 1000,
    note: 'Brand new IPhone 14',
    spentat: '10-10-2010',
    created_at: '10-10-2010',
}

export const AboutProject: React.FC = () => {
    return (
        <div className="card article">
            <div className="control">
                <div className="tags has-addons">
                    <span className="tag is-dark">XPNS</span>
                    <span className="tag is-success">v0.7.8</span>
                </div>
            </div>

            <div className="card-content">
                <div className="media">
                    <div className="media-content has-text-centered">
                        <p className="title article-title">Introducing a features of XPNS</p>
                        <div className="tags has-addons level-item">
                            <span className="tag is-rounded is-info">@XPNS</span>
                            <span className="tag is-rounded">November, 2022</span>
                        </div>
                    </div>
                </div>

                <div className="content article-body">
                    <p>
                    Welcome to XPNS! In this article I will try to explain what is the goal of XPNS and why should you start
                    to use it now!
                    </p>
                    <p>
                    XPNS is a quite simple web application to store the information about your expenses and helps you to manage your budget. You can add each of your expense and in the end of month you will be able to see how much money did you spend.
                    </p>
                    <p>
                    It’s something each of us do every day, after a shopping we put the check into the pocket and then we realize our pocket is full of paper. XPNS could help you with this problem. Just send us an invitation about the expense and we will do the rest. No more paper notes, checks and calculators.
                    </p>
                    <p>
                    You can store information about the expense’s name, amount, date of spent and some notes, additional information like a shop where you buy something or something else whatever you want.
                    </p>

                    <h4 className="has-text-centered">Example:</h4>
                    <ExpensesItem expense={demoExpense} />

                    <p>
                        Use XPNS and save place in your pocket for something useful! :)
                    </p>

                    <h3 className="has-text-centered">About technologies:</h3>
                    <p>
                        Front End part of XPNS web application built on React. Bulma for main styling and SASS for additional styles. React-Router for routing. Redux for state management.
                    </p>
                    <p>
                        Back End part of XPNS build on NodeJS framework Express. Authentication using JWT, BCrypt and Cookies. . And cloud stored coaster of PostgresSQL database and Sequelize ORM.
                    </p>
                    <h3 className="has-text-centered">List of technologies: </h3>
                    <pre>
                        React
                        <br/>
                        React-Router
                        <br/>
                        Redux
                        <br/>
                        SASS
                        <br/>
                        Bulma
                        <br/>
                        Express
                        <br/>
                        NodeJS
                        <br/>
                        Auth using JWT, BCrypt, Cookies, etc.
                        <br/>
                        PostgresSQL (cloud claster)
                        <br />
                        Sequelize ORM
                    </pre>
                </div>
            </div>
        </div>
    );
}
