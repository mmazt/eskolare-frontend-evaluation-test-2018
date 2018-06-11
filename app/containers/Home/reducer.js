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
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  data: [],
  results: [],
  cacheData: { name: '', lastName: '', phone: '', birthDate: '' },
  term: '',
  columns: [
    {
      key: 'id',
      name: 'ID',
      width: 150,
    },
    { key: 'name', name: 'Nome' },
    { key: 'lastName', name: 'Sobrenome', resizable: true, sortable: true },
    { key: 'phone', name: 'Telefone', width: 170 },
    { key: 'birthDate', name: 'Data de Nasc.', width: 150 },
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

    default:
      return state;
  }
}

export default homeReducer;
