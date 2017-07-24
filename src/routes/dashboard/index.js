/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/dashboard',

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../components/dashboard/Dashboard').default);
    })
  }
};

export default rootRoute;