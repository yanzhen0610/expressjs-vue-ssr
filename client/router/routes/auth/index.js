import middleware from '../../middleware';
import page from '../../../pages';

export default [
  {
    name: 'login',
    path: '/auth/login',
    component: page('auth/Login'),
    meta: {
      middleware: [
        middleware('guest'),
      ],
    },
  },
];
