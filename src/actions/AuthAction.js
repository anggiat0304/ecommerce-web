import axios from 'axios';
import { FETCH_LOGIN_FAILED, FETCH_LOGIN_REQUEST, FETCH_LOGIN_SUCCESS, FETCH_LOGOUT_FAILED, FETCH_LOGOUT_REQUEST, FETCH_LOGOUT_SUCCESS } from "./Types"
import { BACKEND_GATEWAY_URL, LOGIN_URL, LOGOUT_URL } from './Url';

const fetchLoginRequest = () => {
  return {
    type: FETCH_LOGIN_REQUEST
  }
}
const fetchLoginSuccess = (res) => {
  return {
    type: FETCH_LOGIN_SUCCESS,
    payload: res
  }
}
const fetchLoginFailed = (err) => {
  return {
    type: FETCH_LOGIN_FAILED,
    payload: err
  }
}

const fetchLogoutRequest = () => {
  return {
    type: FETCH_LOGOUT_REQUEST
  }
}
const fetchLogoutSuccess = (res) => {
  return {
    type: FETCH_LOGOUT_SUCCESS,
    payload: res,
  }
}
const fetchLogoutFailed = (err) => {
  return {
    type: FETCH_LOGOUT_FAILED,
    payload: err,
  }
}
export const signIn = ({ username, password }) => {
  const bodyRequest = { username: username, password: password }
  console.log(bodyRequest)
  return (dispatch) => {
    dispatch(fetchLoginRequest);
    axios
      .post(LOGIN_URL, bodyRequest)
      .then((response) => {
        dispatch(fetchLoginSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchLoginFailed(error.message));
      });
  };
};

export const logout = () => {
  const authorization = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return (dispatch) => {
    dispatch(fetchLogoutRequest());

    axios.get(LOGOUT_URL, {
      headers: {
        'Authorization': authorization,
        'User': userId
      }
    })
      .then(response => {
        console.log(response)
        if (response.data.Data == "OK") {
          localStorage.clear()
          window.location.reload()
        }
      })
      .catch(error => {
        // Handle error jika diperlukan
        dispatch(fetchLogoutFailed(error))
        console.error('Error saat melakukan logout:', error);
      });
  };
};