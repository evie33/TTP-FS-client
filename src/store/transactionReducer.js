import axios from 'axios';

//---------------------- ACTION TYPES -----------------------

const GOT_TRANSACTIONS = 'GOT_TRANSACTIONS';
const UPDATE_TRANSACTIONS = 'UPDATE_TRANSACTIONS';

//---------------------- ACTION CREATORS -----------------------

const gotTransaction = transactions => ({
  type: GOT_TRANSACTIONS,
  transactions
});
const updateTransaction = transactions => ({
  type: UPDATE_TRANSACTIONS,
  transactions
});

//---------------------- INITIAL STATE -----------------------
const initialState = {
  transactions: []
};

//---------------------- THUNK CREATOR -----------------------

export const updateUserTransaction = (
  quantity,
  totalBuy,
  tickerSymbol,
  userId
) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/transactions/update', {
        quantity,
        totalBuy,
        tickerSymbol,
        userId
      });
      dispatch(updateTransaction(data));
    } catch (err) {
      console.error(err);
    }
  };
};

export const getTransaction = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/api/transactions');
      dispatch(gotTransaction(data));
    } catch (err) {
      console.error(err);
    }
  };
};

//---------------------- REDUCER -----------------------
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_TRANSACTIONS:
      return {
        ...state,
        transactions: action.transactions
      };
    case UPDATE_TRANSACTIONS:
      return {
        ...state,
        transactions: [...state.transactions, action.transactions]
      };
    default:
      return state;
  }
}
