import axios from 'axios';

//---------------------- ACTION TYPES -----------------------
const GOT_USER = 'GOT_USER';

//---------------------- ACTION CREATORS -----------------------
const gotUser = user => ({ type: GOT_USER, user });

//---------------------- INITIAL STATE -----------------------
const initialState = {
  current: {}
};

//---------------------- THUNK CREATOR -----------------------

export const fetchUser = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/users');
      dispatch(gotUser(data));
      console.log(data);
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

    default:
      return state;
  }
}
