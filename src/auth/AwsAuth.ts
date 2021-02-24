import { Auth } from 'aws-amplify';
import { IOauth2TokenResponse } from '../types';

 const MakeAuth = async () => {
     try{
          await Auth.signIn('poc', 'X@blaudiano123');
          return Auth.currentSession();
     }catch(err){
         console.error('ERROR ON GETTING AUTH', err);
     }
 }

export const getOAuth2Token = async (): Promise<IOauth2TokenResponse> => {
    console.log('GETTING COGNITO OAUTH2 TOKEN');

    let url = 'https://api-auth-xyz958.auth.us-east-1.amazoncognito.com/oauth2/token';
    const body = new URLSearchParams({
        grant_type: "client_credentials",
        client_id: "4d2l5rqmff3avfp826kincn0h5",
        client_secret: "9b6379t00c11bh1l331dvml536j2r2b3ui9rmmtnj11jtlarop9"
    });
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    try {
        const response = await fetch(url, { method: 'POST', body, headers });
        const responseJson = await response.json();

        console.log('SUCCESSFULY GOT COGNITO OAUTH2 TOKEN');
        return responseJson;
    } catch (error) {
        console.error('ERROR ON COGNITO OAUTH2 TOKEN', error);
    }
}