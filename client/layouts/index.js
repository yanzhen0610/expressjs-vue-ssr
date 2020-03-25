export default layout => () => import(/* webpackChunkName: 'layouts/[request]' */ `./${layout}`);
