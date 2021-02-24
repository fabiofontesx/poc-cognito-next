import Amplify from 'aws-amplify';
// CONFIGURATION FILE EXAMPLE https://docs.amplify.aws/lib/auth/start/q/platform/js#re-use-existing-authentication-resource
const awsConfig = { 
    Auth: {
        identityPoolId: 'us-east-1:d4c103eb-d6ec-43d0-bfb4-5a7cb7d71c6d',
        userPoolId: 'us-east-1_7NYk2C8JP',
        userPoolWebClientId: '35aua1o5c9ha3fc0hh705ug95g',
        region: 'us-east-1',
    }
}
Amplify.configure(awsConfig);