/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { LOAD_LOGIN_SUCCESS, LOAD_LOGIN, LOAD_LOGIN_ERROR } from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  loginData: { token: '', username: '', status: 'connected' },
  loginType: '',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOGIN:
      return state.set('loading', true).set('error', false);
    case LOAD_LOGIN_SUCCESS:
      return state
        .set('loginData', action.loginData)
        .set('loading', false)
        .set('loginType', action.loginType);
    case LOAD_LOGIN_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
