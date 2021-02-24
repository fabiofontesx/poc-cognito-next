import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import jsonwebtoken from 'jsonwebtoken';
import { setContext } from '@apollo/client/link/context';
import { getOAuth2Token } from "../auth/AwsAuth";
import { ICognitoDecodedToken, IOauth2TokenResponse } from "../types";
import { useEffect, useMemo } from "react";
import { useLogin } from "../context/Login";

let apolloClient: ApolloClient<NormalizedCacheObject>;
let oAuth2Token: IOauth2TokenResponse;
let _cognitoUserSession: CognitoUserSession;
let jwtToken: string;

const isTokenExpirated = (token: string) => {
  const decodedToken = jsonwebtoken.decode(token, { complete: true, json: true }) as ICognitoDecodedToken;
  const currentSeconds = Math.floor(new Date().valueOf() / 1000);
  if (currentSeconds > decodedToken.payload.exp || currentSeconds < decodedToken.payload.auth_time) {
    return true;
  }
  return false;
}

const createAuthLinkContext = () => {
  return setContext(async (_, { headers }) => {
    if (!_cognitoUserSession && (!oAuth2Token || isTokenExpirated(oAuth2Token.access_token))) {
      oAuth2Token = await getOAuth2Token();
      jwtToken = oAuth2Token.access_token;
    }

    if (_cognitoUserSession) {
      const cognitoUserSessionToken = _cognitoUserSession.getAccessToken().getJwtToken();
      if (isTokenExpirated(cognitoUserSessionToken)) {
        jwtToken = _cognitoUserSession.getRefreshToken().getToken();
      }
      jwtToken = cognitoUserSessionToken;
    }
    console.log(jwtToken);
    return {
      headers: {
        ...headers,
        authorization: jwtToken ? `Bearer ${jwtToken}` : ''
      }
    }
  });
}

const httpLink = createHttpLink({
  uri: 'http://127.0.0.1:3300/graphql',
});

const createApolloClient = () => {
  const authLink = createAuthLinkContext();
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // set to true for SSR
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();

  
  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export const useApollo = (initialState: any) => {
  const { cognitoUserSession } = useLogin();

  const store = useMemo(() => {
    console.log('session on useMemo', cognitoUserSession);
    _cognitoUserSession = cognitoUserSession;
    return initializeApollo(initialState);
  }, [initialState, cognitoUserSession]);

  return store;
}