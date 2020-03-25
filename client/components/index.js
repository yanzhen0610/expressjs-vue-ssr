export default component => () => import(/* webpackChunkName: 'components/[request]' */ `./${component}`);
