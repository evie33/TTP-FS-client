import axios from 'axios';

//---------------------- ACTION TYPES -----------------------
const GOT_USER = 'GOT_USER';
const UPDATED_USER = 'UPDATED_USER';
const LOGOUT_USER = 'LOGOUT_USER';
//---------------------- ACTION CREATORS -----------------------
const gotUser = user => ({ type: GOT_USER, user });
const updatedUserBalance = user => ({ type: UPDATED_USER, user });
const logoutUser = () => ({ type: LOGOUT_USER });

//---------------------- INITIAL STATE -----------------------
const initialState = {
  current: {}
};

//---------------------- THUNK CREATOR -----------------------

export const auth = (email, password, history) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/login`, { email, password });
  } catch (authError) {
    return dispatch(gotUser({ error: authError }));
  }
  try {
    dispatch(gotUser(res.data));
    history.push('/profile');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const authRegister = (
  name,
  email,
  password,
  history
) => async dispatch => {
  let res;
  try {
    res = await axios.post(`/auth/register`, { name, email, password });
  } catch (authError) {
    return dispatch(gotUser({ error: authError }));
  }
  try {
    dispatch(gotUser(res.data));
    history.push('/profile');
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const fetchUser = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/auth/user');
      console.log('>>>>>>>>>>get user after update ', data);
      dispatch(gotUser(data || initialState));
    } catch (err) {
      console.error(err);
    }
  };
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout');
    dispatch(logoutUser());
  } catch (err) {
    console.error(err);
  }
};

export const updateUserBalance = (balance, userId) => {
  return async dispatch => {
    try {
      const { data } = await axios.put('/auth/user', { balance, userId });
      dispatch(updatedUserBalance(data));
    } catch (err) {
      console.error(err);
    }
  };
};

//---------------------- REDUCER -----------------------
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return {
        ...state,
        current: action.user
      };
    case UPDATED_USER:
      return {
        ...state,
        current: action.user
      };
    case LOGOUT_USER:
      return {
        ...state,
        current: {}
      };
    default:
      return state;
  }
}
