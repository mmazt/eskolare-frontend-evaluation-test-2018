import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');

const selectGlobal = (state) => state.get('global');

const makeSelectLocation = () =>
  createSelector(selectRoute, (routeState) =>
    routeState.get('location').toJS()
  );

const makeSelectStatus = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('status'));

const makeSelectUser = () =>
  createSelector(selectGlobal, (globalState) => globalState.get('userData'));

export { makeSelectLocation, makeSelectStatus, makeSelectUser };
