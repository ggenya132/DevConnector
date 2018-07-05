//Register User
import setAuthToken from "../utils/setAuthToken";
import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";
export const registerUser = userData => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => console.log(res.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //SAVE TO LOCAL STORAGE
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      //SET TOKEN TO AUTH HEADER
      setAuthToken(token);
      //DECODE TOKEN TO GE TUSER DATA
      const decodedData = jwt_decode(token);
      //Set current user
      dispatch(setCurrentUser(decodedData));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decodedData => {
  return { type: SET_CURRENT_USER, payload: decodedData };
};
