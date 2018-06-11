import { createSelector } from 'reselect';

/**
 * Direct selector to the home state domain
 */
const selectHomeDomain = (state) => state.get('home');

/**
 * Other specific selectors
 */

/**
 * Default selector used by Home
 */

const makeSelectHome = () =>
  createSelector(selectHomeDomain, (substate) => substate.toJS());

const makeSelectData = () =>
  createSelector(selectHomeDomain, (substate) => substate.get('data').toJS());

const makeSelectResults = () =>
  createSelector(selectHomeDomain, (substate) =>
    substate.get('results').toJS()
  );

const makeSelectColumns = () =>
  createSelector(selectHomeDomain, (substate) =>
    substate.get('columns').toJS()
  );

const makeSelectTerm = () =>
  createSelector(selectHomeDomain, (substate) => substate.get('term'));

const makeSelectCache = () =>
  createSelector(selectHomeDomain, (substate) => substate.get('cacheData'));

const makeSelectFilter = () =>
  createSelector(selectHomeDomain, (substate) => substate.get('filter'));

const makeSelectSort = () =>
  createSelector(selectHomeDomain, (substate) => substate.get('sort'));

export default makeSelectHome;
export {
  selectHomeDomain,
  makeSelectData,
  makeSelectColumns,
  makeSelectResults,
  makeSelectTerm,
  makeSelectCache,
  makeSelectFilter,
  makeSelectSort,
};
