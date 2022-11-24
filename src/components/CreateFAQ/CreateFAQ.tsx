import React from "react";

export const CreateFAQ: React.FC = () => {
    return (
        <div className="box">
            <h1 className="title is-4 has-text-success">Create FAQ:</h1>
            <p className="title is-5">So how to use <strong className="has-text-success">XPNS</strong>? Well, its preatty simple!</p>
            <p>
                All you need to start using <strong className="has-text-success">XPNS</strong> is your activated account and some expenses you did back in the days.
            </p>
            <br />
            <p>
                Open a <span className="has-text-success">"Create category"</span> tab to create your first category of expenses, because expense couldn't be without a category,
                we always grouped anything in our life.
            </p>
            <br />
            <p>
                Then you will be able to create an expenses item in <span className="has-text-success">"Create expense"</span> tab.
                Just write all required data about an expense item like a title, amount, date etc.
                And simply press on <span className="has-text-success">"Create"</span> button.
            </p>
            <br />
            <p>
                You always can create a new category and new expenses for each category.
                All of your expenses will stored in <span className="has-text-success">"Expenses"</span> tab and you could find it there or delete some old items.
            </p>
            <br />
            <p className="has-text-info">
                I hope you woun't meet any problems using <strong className="has-text-success">XPNS</strong>! :)
            </p>
        </div>
    )
}
