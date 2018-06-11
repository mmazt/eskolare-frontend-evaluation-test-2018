/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  SEARCH_TERM,
  SEARCH_DATA,
  SEARCH_DATA_SUCCESS,
  SEARCH_DATA_ERROR,
  CACHE_DATA,
  INSERT_DATA_SUCCESS,
  INSERT_DATA,
  INSERT_DATA_ERROR,
  CLEAR_CACHE,
  FILTER,
  FILTER_SUCCESS,
  FILTER_ERROR,
  SORT,
  SORT_ERROR,
  SORT_SUCCESS,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
  filter: { data: '', type: '' },
  sort: { direction: '', column: '' },
  results: [],
  cacheData: { name: '', lastName: '', phone: '', birthDate: '' },
  term: '',
  columns: [
    {
      key: 'id',
      name: 'ID',
      width: 150,
      sortable: true,
    },
    { key: 'name', name: 'Nome', resizable: true, sortable: true },
    { key: 'lastName', name: 'Sobrenome', resizable: true, sortable: true },
    { key: 'phone', name: 'Telefone', width: 170, sortable: true },
    { key: 'birthDate', name: 'Data de Nasc.', width: 150, sortable: true },
  ],
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state.set('loading', true);
    case LOAD_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
        .set('results', action.data)
        .set('error', false);
    case LOAD_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    case CACHE_DATA:
      return state.set('cacheData', action.data);
    case CLEAR_CACHE:
      return state.set('cacheData', {});
    case INSERT_DATA:
      return state.set('loading', true);
    case INSERT_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
        .set('results', action.data)
        .set('error', false);
    case INSERT_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    case SEARCH_TERM:
      return state.set('term', action.term);
    case SEARCH_DATA:
      return state.set('loading', true);
    case SEARCH_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('results', action.data)
        .set('error', false);
    case SEARCH_DATA_ERROR:
      return state.set('loading', false).set('error', action.error);
    case FILTER:
      return state.set('filter', {
        data: action.data,
        type: action.filterType,
      });

    case FILTER_SUCCESS:
      return state
        .set('loading', false)
        .set('results', action.data)
        .set('error', false);
    case FILTER_ERROR:
      return state.set('loading', false).set('error', action.error);
    case SORT:
      return state.set('sort', {
        column: action.column,
        direction: action.direction,
      });
    case SORT_SUCCESS:
      return state
        .set('loading', false)
        .set('results', action.data)
        .set('error', false);
    case SORT_ERROR:
      return state.set('loading', false).set('error', action.error);

    default:
      return state;
  }
}

export default homeReducer;
