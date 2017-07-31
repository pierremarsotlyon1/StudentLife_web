/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/jobs',

  getChildRoutes(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, [
        require('./add/index').default,
      ]);
    })
  },

  getIndexRoute(partialNextState, callback) {
    require.ensure([], function (require) {
      callback(null, {
        component: require('../../components/jobs/JobList').default,
      });
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../containers/jobs/Job').default);
    })
  }
};

export default rootRoute;