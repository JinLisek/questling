import axios from "axios";

import { returnErrors } from "./messages";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./types";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(resp => {
      dispatch({ type: USER_LOADED, payload: resp.data });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const login = (username, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const requestBody = JSON.stringify({ username, password });

  axios
    .post("/api/auth/login", requestBody, config)
    .then(resp => {
      dispatch({ type: LOGIN_SUCCESS, payload: resp.data });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: LOGIN_FAIL });
    });
};

export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/auth/logout", null, tokenConfig(getState))
    .then(resp => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
    });
};

export const register = ({ username, password, email }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const requestBody = JSON.stringify({ username, password, email });

  axios
    .post("/api/auth/register", requestBody, config)
    .then(resp => {
      dispatch({ type: REGISTER_SUCCESS, payload: resp.data });
    })
    .catch(error => {
      dispatch(returnErrors(error.response.data, error.response.status));
      dispatch({ type: REGISTER_FAIL });
    });
};

export const tokenConfig = getState => {
  const token = getState().authentication.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
