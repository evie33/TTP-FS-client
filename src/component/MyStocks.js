import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

class MyStocks extends React.Component {
  render() {
    const { stocks } = this.props;
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
                <td>{stock.currentPrice}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

const mapState = state => {
  return {
    stocks: state.stock.allStocks
  };
};

export default connect(mapState)(MyStocks);
