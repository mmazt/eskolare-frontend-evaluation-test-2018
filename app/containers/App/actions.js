import { LOAD_LOGIN, LOGOUT } from './constants';

export function loadLogin(loginData, userData, loginType) {
  return {
    type: LOAD_LOGIN,
    loginData,
    userData,
    loginType,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
