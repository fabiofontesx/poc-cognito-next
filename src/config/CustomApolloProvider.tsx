import { ApolloProvider } from "@apollo/client";
import { PropsWithChildren } from "react";
import { useApollo } from "./ApolloConfig";

const CustomApolloProvider = ({ children, pageProps }: PropsWithChildren<{ pageProps: any }>) => {
    const apolloClient = useApollo(pageProps.initialProps);
    return (
        <ApolloProvider client={apolloClient}>
            {children}
        </ApolloProvider>
    )
}

export default CustomApolloProvider;