import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';

import { ILoginContextData } from "../types";


const LoginContext = createContext<ILoginContextData>({} as ILoginContextData);

export const LoginProvider = ({ children }: PropsWithChildren<{}>) => {
    const [cognitoUserSession, setCognitoUserSession] = useState<CognitoUserSession | null>(null);

    const signIn = async (user: string, password: string): Promise<void> => {
        try {
            // await Auth.signIn('poc', 'X@blaudiano123');
            console.log("SIGIN");
            await Auth.signIn(user, password);
            const currentSession = await Auth.currentSession();
            console.log({currentSession});
            setCognitoUserSession(currentSession);
        } catch (err) {
            console.error('ERROR ON GETTING AUTH', err);
        }
    }

    const signOut = async () => {
        await Auth.signOut();
        setCognitoUserSession(null);
    }

    return (
        <LoginContext.Provider value={{ cognitoUserSession, signIn, signOut }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => {
    const context = useContext(LoginContext);
    return context;
}
