/**
 * Created by pierremarsot on 25/03/2017.
 */
const rootRoute = {
  path: '/annonces',

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
        component: require('../../components/annonce/AnnonceList').default,
      });
    })
  },

  getComponents(nextState, callback) {
    require.ensure([], function (require) {
      callback(null, require('../../containers/annonce/Annonce').default);
    })
  }
};

export default rootRoute;