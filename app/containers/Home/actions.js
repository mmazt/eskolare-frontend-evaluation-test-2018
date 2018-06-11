/*
 *
 * Home actions
 *
 */

import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  SEARCH_DATA,
  SEARCH_DATA_SUCCESS,
  SEARCH_DATA_ERROR,
  SEARCH_TERM,
  INSERT_DATA,
  INSERT_DATA_SUCCESS,
  INSERT_DATA_ERROR,
  CACHE_DATA,
  CLEAR_CACHE,
} from './constants';

export function loadDataAction() {
  return {
    type: LOAD_DATA,
  };
}

export function loadDataSuccess(data) {
  return {
    type: LOAD_DATA_SUCCESS,
    data,
  };
}

export function loadDataError(error) {
  return {
    type: LOAD_DATA_ERROR,
    error,
  };
}

export function searchTermAction(term) {
  return {
    type: SEARCH_TERM,
    term,
  };
}

export function searchDataAction() {
  return {
    type: SEARCH_DATA,
  };
}

export function searchDataSuccess(data) {
  return {
    type: SEARCH_DATA_SUCCESS,
    data,
  };
}

export function searchDataError(error) {
  return {
    type: SEARCH_DATA_ERROR,
    error,
  };
}

export function insertData() {
  return {
    type: INSERT_DATA,
  };
}

export function insertDataSuccess(data) {
  return {
    type: INSERT_DATA_SUCCESS,
    data,
  };
}

export function insertDataError(error) {
  return {
    type: INSERT_DATA_ERROR,
    error,
  };
}

export function cacheData(data) {
  return {
    type: CACHE_DATA,
    data,
  };
}

export function clearCache() {
  return {
    type: CLEAR_CACHE,
  };
}
