import { createSelector } from 'reselect';

/**
 * Direct selector to the login state domain
 */
const selectLoginDomain = (state) => state.get('login');

const selectGlobalState = (state) => state.get('global');
/**
 * Other specific selectors
 */

/**
 * Default selector used by Login
 */

const makeSelectLogin = () =>
  createSelector(selectLoginDomain, (substate) => substate.toJS());

const makeSelectLoginData = () =>
  createSelector(selectGlobalState, (substate) =>
    substate.get('loginData').toJS()
  );

export default makeSelectLogin;
export { selectLoginDomain, makeSelectLoginData };
