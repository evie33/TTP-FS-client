import axios from 'axios';

//---------------------- ACTION TYPES -----------------------
const GOT_STOCKS = 'GOT_STOCKS';
const BOUGHT_STOCKS = 'BOUGHT_STOCKS';

//---------------------- ACTION CREATORS -----------------------
const gotStocks = stocks => ({ type: GOT_STOCKS, stocks });
const boughtStocks = stocks => ({ type: BOUGHT_STOCKS, stocks });

//---------------------- INITIAL STATE -----------------------
const initialState = {
  current: {}
};

//---------------------- THUNK CREATOR -----------------------

export const fetchStocks = tickerSymbol => {
  return async dispatch => {
    try {
      console.log(tickerSymbol);
      const { data } = await axios.get(`/api/stocks/${tickerSymbol}`);
      dispatch(gotStocks(data || initialState));
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateUserTransaction = (
  buyAmount,
  buyPrice,
  tickerSymbol,
  userId
) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/stocks/purchase', {
        buyAmount,
        buyPrice,
        tickerSymbol,
        userId
      });
      console.log(data, '------update user Transaction buy');
      dispatch(boughtStocks(data));
    } catch (err) {
      console.error(err);
    }
  };
};
//---------------------- REDUCER -----------------------
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_STOCKS:
      return {
        ...state,
        current: action.stocks
      };

    default:
      return state;
  }
}
