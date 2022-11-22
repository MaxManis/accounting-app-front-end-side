import React from "react";

export const CreateFAQ: React.FC = () => {
    return (
        <div className="box">
            <h1 className="title is-4">Create FAQ:</h1>
            <p className="title is-5">So how to use XPNS? Well, its preatty simple!</p>
            <p>
                All you need to start using XPNS is your activated account and some expenses you did back in the days.
            </p>
            <br />
            <p>
                Open a "Create category" tab to create your first category of expenses, because expense couldn't be without a category, 
                we alwways grouped anything in our life.
            </p>
            <br />
            <p>
                Then you will be able to create an expenses item in "Create expense" tab. Just wtite all required data about an expense item like a title, amount, date etc.
                And simply press on "Create" button. 
            </p>
            <br />
            <p>
                You always can create a new category and new expenses for each category.
                All of your expenses will stored in "Expenses" tab and you could find it there or delete some old items.
            </p>
            <br />
            <p>
                I hope you woun't meet any problems using XPNS! :)
            </p>
        </div>
    )
}
