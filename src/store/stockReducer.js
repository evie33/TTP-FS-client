import axios from 'axios';

//---------------------- ACTION TYPES -----------------------
const GOT_BUY_STOCK = 'GOT_BUY_STOCK';
const BOUGHT_STOCK = 'BOUGHT_STOCK';
const GOT_ALL_STOCKS = 'GOT_ALL_STOCKS';
const UPDATE_STOCK_CURRENT_PRICE = 'UPDATE_STOCK_CURRENT_PRICE';

//---------------------- ACTION CREATORS -----------------------
const gotBuyStock = stock => ({ type: GOT_BUY_STOCK, stock });
const boughtStock = stock => ({ type: BOUGHT_STOCK, stock });
const gotAllStocks = allStocks => ({ type: GOT_ALL_STOCKS, allStocks });
const updateCurrentPrice = stock => ({
  type: UPDATE_STOCK_CURRENT_PRICE,
  stock
});

//---------------------- INITIAL STATE -----------------------
const initialState = {
  stock: {},
  allStocks: []
};

//---------------------- THUNK CREATOR -----------------------

export const fetchStocks = tickerSymbol => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/stocks/${tickerSymbol}`);
      dispatch(gotBuyStock(data || initialState));
    } catch (err) {
      console.error(err);
    }
  };
};

export const updateUserStock = (quantity, totalBuy, tickerSymbol, userId) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/stocks/purchase', {
        quantity,
        totalBuy,
        tickerSymbol,
        userId
      });
      dispatch(boughtStock(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getAllStocks = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/stocks/all');
      data.forEach(async each => {
        let price = await axios.get(`/api/stocks/current/${each.tickerSymbol}`);
        let updateData = await axios.put(
          `/api/stocks/updateCurrentPrice/${each.tickerSymbol}`,
          price
        );
        dispatch(updateCurrentPrice(updateData));
      });
      dispatch(gotAllStocks(data));
    } catch (err) {
      console.error(err);
    }
  };
};

//---------------------- REDUCER -----------------------
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_BUY_STOCK:
      return {
        ...state,
        stock: action.stock
      };
    case GOT_ALL_STOCKS:
      return {
        ...state,
        allStocks: action.allStocks
      };
    case UPDATE_STOCK_CURRENT_PRICE:
      return {
        ...state,
        stock: action.stock
      };
    default:
      return state;
  }
}
