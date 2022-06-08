import {SignIn, Splash, SignUp, ForgotPass} from '../../containers';

export const AuthStack = [
  {
    name: 'Splash',
    component: Splash,
    key: 'Splash',
  },
  {
    name: 'SignIn',
    component: SignIn,
    key: 'SignIn',
  },
  {
    name: 'SignUp',
    component: SignUp,
    key: 'SignUp',
  },
  {
    name: 'ForgotPass',
    component: ForgotPass,
    key: 'ForgotPass',
  },
];
