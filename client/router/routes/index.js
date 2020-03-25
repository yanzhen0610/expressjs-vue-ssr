import fetch from '../../utils/fetch-require-context-modules';
import page from '../../pages';

export default [
  {
    name: 'home',
    path: '/',
    component: page('Home'),
  },
  {
    name: 'not_found',
    path: '/404',
    component: page('NotFound'),
  },
].concat(
  Object.values(fetch(require.context('./', true, /.*(!?\.js)/)))
    .flat(1)
    .filter(route => !!route)
);
