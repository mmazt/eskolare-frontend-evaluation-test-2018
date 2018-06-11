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

import { LOAD_LOGIN, LOGOUT } from './constants';

// The initial state of the App
const initialState = fromJS({
  status: 'disconnected',
  loginData: { token: '', expiresIn: '' },
  userData: { name: '', picture: '' },
  loginType: '',
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_LOGIN:
      return state
        .set('loginData', action.loginData)
        .set('status', 'connected')
        .set('userData', action.userData)
        .set('loginType', action.loginType);
    case LOGOUT:
      return state
        .set('loginData', {})
        .set('userData', {})
        .set('status', 'disconnected');
    default:
      return state;
  }
}

export default appReducer;
