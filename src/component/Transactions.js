import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

class Transactions extends React.Component {
  render() {
    const { transactions } = this.props;
    return (
      <div>
        <h2>Transaction</h2>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Date</th>
              <th>Ticker Symbol</th>
              <th>Purchase Total</th>
              <th>Quantity</th>
              <th>Sell Total</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, idx) => (
              <tr key={idx}>
                <td>{transaction.createdAt}</td>
                <td>{transaction.tickerSymbol}</td>
                <td>{transaction.totalBuy}</td>
                <td>{transaction.quantity}</td>
                <td>{transaction.totalSell}</td>
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
    transactions: state.transaction.transactions
  };
};

export default connect(mapState)(Transactions);
