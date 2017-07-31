/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/jobs/add',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../../components/jobs/AddJob').default);
    })
  }
};

export default rootRoute;