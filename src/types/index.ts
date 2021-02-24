import { CognitoUserSession } from 'amazon-cognito-identity-js';

export interface ICognitoTokenHeader {
    kid: string;
    alg: string
}

export interface ICognitoTokenPayload {
    sub: string;
    event_id: string;
    token_use: string;
    scope: string;
    auth_time: number;
    iss: string;
    exp: number;
    iat: number;
    jti: string;
    client_id: string;
    username: string;
}

export interface ICognitoDecodedToken {
    header: ICognitoTokenHeader,
    payload: ICognitoTokenPayload;
    signature: string;
}

export interface IOauth2TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export interface IBook {
    title: string;
    author: string
}

export interface ILoginContextData { 
    cognitoUserSession: CognitoUserSession,
    signIn(user: string, password: string): Promise<void>,
    signOut(): Promise<void>
}