import '../styles/globals.css'
import '../config/AmplifyConfig';

import { LoginProvider } from '../context/Login';
import CustomApolloProvider from '../config/CustomApolloProvider';

function MyApp({ Component, pageProps }) {
  return (
    <LoginProvider>
      <CustomApolloProvider pageProps={pageProps}>
        <Component {...pageProps} />
      </CustomApolloProvider>
    </LoginProvider>
  )
}

export default MyApp
