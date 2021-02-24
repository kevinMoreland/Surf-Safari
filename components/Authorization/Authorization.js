import { withAuthenticator, AmplifySignOut, AmplifySignUp } from '@aws-amplify/ui-react';

const SignOut = () => (
    <AmplifySignOut />
);

const SignUp = () => (
    <AmplifySignUp />
);
module.exports = {
  SignOut: withAuthenticator(SignOut),
  SignUp: withAuthenticator(SignUp)
}