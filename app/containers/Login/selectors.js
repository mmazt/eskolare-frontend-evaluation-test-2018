import { createSelector } from 'reselect';

const selectLoginDomain = (state) => state.get('login');

const makeSelectLogin = () =>
  createSelector(selectLoginDomain, (substate) => substate.toJS());

export default makeSelectLogin;
export { selectLoginDomain };
