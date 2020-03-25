export default page => () => import(/* webpackChunkName: 'pages/[request]' */ `./${page}`);
