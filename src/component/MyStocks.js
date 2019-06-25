import React from 'react';
import { connect } from 'react-redux';
import { getAllStocks } from '../store';
import { Table } from 'react-bootstrap';

class MyStocks extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { stocks } = this.props;
    console.log(stocks.currentPrice);
    return (
      <div>
        <h2>My Stocks</h2>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ticker Symbol</th>
              <th>Purchase Total</th>
              <th>Quantity</th>
              <th>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock, idx) => (
              <tr key={idx}>
                <td>{stock.createdAt}</td>
                <td>{stock.tickerSymbol}</td>
                <td>{stock.totalBuy}</td>
                <td>{stock.quantity}</td>

                <td>{}</td>
              </tr>
            ))}
          </tbody>
          {stocks.currentPrice && stocks.currentPrice.map(each => <p>each</p>)}
        </Table>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.current,
    stocks: state.stock.allStocks
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadInitialData() {
      dispatch(getAllStocks());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MyStocks);
