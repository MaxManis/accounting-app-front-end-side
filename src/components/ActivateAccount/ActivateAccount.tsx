import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "../../utils/fetch";
import { ErrorMessage } from "../ErrorMessage";
import { Loader } from "../Loader";

export const ActivateAccount: React.FC = () => {
    const { token } = useParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [protect, setProtect] = useState(false);

    useEffect(() => {
        const activateAccount = async () => {
            setProtect(true);
            setIsLoading(true);
            
            try {
                await client.get(`/users/activation/${token}`);
            } catch (e) {
                if (!protect) {
                    setIsError(true);
                }
            }
            setIsLoading(false);
        }

        if (protect) {
            return;
        }
        
        activateAccount();
    }, []);

    return (
        <div className="box">
            {isLoading ? (
                <>
                    <h3 className="title is-3">Activating your account, please wait...</h3>
                    <Loader />
                </>
            ) : isError ? <ErrorMessage /> : (
                    <div className="notification is-success">
                        HOREEEEY!!! Your account successfully activated! Now you can log in to your XPNS account.
                    </div>
                )
            }
        </div>
    );
}
