/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/',

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../components/home/Home').default,
      });
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../containers/layout/App').default);
    })
  }
};

export default rootRoute;