import axios from 'axios';

//---------------------- ACTION TYPES -----------------------
const GOT_BUY_STOCK = 'GOT_BUY_STOCK';
const BOUGHT_STOCK = 'BOUGHT_STOCK';
const GOT_ALL_STOCKS = 'GOT_ALL_STOCKS';
const GOT_CURRENT_PRICE = 'GOT_CURRENT_PRICE';

//---------------------- ACTION CREATORS -----------------------
const gotBuyStock = stock => ({ type: GOT_BUY_STOCK, stock });
const boughtStock = stock => ({ type: BOUGHT_STOCK, stock });
const gotAllStocks = allStocks => ({ type: GOT_ALL_STOCKS, allStocks });
const gotCurrentPrice = currentPrice => ({
  type: GOT_CURRENT_PRICE,
  currentPrice
});

//---------------------- INITIAL STATE -----------------------
const initialState = {
  currentPrice: [],
  stock: {},
  allStocks: []
};

//---------------------- THUNK CREATOR -----------------------

export const fetchStocks = tickerSymbol => {
  return async dispatch => {
    try {
      console.log(tickerSymbol);
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
      dispatch(gotAllStocks(data));
      let priceArr = [];
      data.forEach(async each => {
        let price = await axios.get(`/api/stocks/current/${each.tickerSymbol}`);
        priceArr.push(price);
      });
      dispatch(gotCurrentPrice(priceArr));
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
    case GOT_CURRENT_PRICE:
      return {
        ...state,
        currentPrice: action.currentPrice
      };
    default:
      return state;
  }
}
