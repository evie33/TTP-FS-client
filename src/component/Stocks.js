import React from 'react';
import { connect } from 'react-redux';
import Chartkick, { LineChart } from 'react-chartkick';
import 'chart.js';
import { fetchStocks, updateUserTransaction } from '../store/stockReducer';
import { updateUserBalance } from '../store/userReducer';
import { Form, FormControl, Button } from 'react-bootstrap';

Chartkick.options = {
  colors: ['green', 'grey', 'red']
};

class Stocks extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 0,
      total: 0,
      balance: 0
    };
  }

  subtract = evt => {
    if (this.state.quantity > 0) {
      this.setState({ quantity: this.state.quantity - 1 });
    } else {
      this.setState({ quantity: 0 });
    }
  };

  add = evt => {
    this.setState({ quantity: this.state.quantity + 1 });
  };

  ChangeColor = (latestPrice, open) => {
    if (latestPrice > open) {
      return 'green';
    } else if (latestPrice === open) {
      return 'grey';
    } else {
      return 'red';
    }
  };

  render() {
    const { handlePurchase, handleSubmit, stock, user } = this.props;
    let { quantity, total, balance } = this.state;
    console.log('----stock', stock, stock.symbol, stock.open);
    let color = this.ChangeColor(stock.latestPrice, stock.open);

    // const data = {{"open": 198, "current": 199.00}}
    return (
      <div>
        <h2>Stocks</h2>
        <Form onSubmit={e => handleSubmit(e)}>
          <FormControl
            required
            type="text"
            placeholder="Enter ticker symbol"
            name="tickerSymbol"
          />
          <Button type="submit">Submit</Button>
        </Form>
        {user.balance && stock.symbol ? (
          <div>
            <h2>Company Name : {stock.companyName}</h2>
            <Form onSubmit={e => handlePurchase(e)}>
              <Form.Control
                plaintext
                readOnly
                name="tickerSymbol"
                value={stock.symbol}
              />
              <h3>Current Price:</h3>
              <Form.Control
                plaintext
                readOnly
                name="price"
                value={stock.latestPrice}
              />
              <LineChart
                colors={[color]}
                data={{ open: stock.open, current: stock.latestPrice }}
              />
              {/* {stock.latestPrice < stock.open ? (
                <LineChart
                  colors={['red']}
                  data={{ open: stock.open, current: stock.latestPrice }}
                />
              ) : (
                <LineChart
                  colors={['green']}
                  data={{ open: stock.open, current: stock.latestPrice }}
                />
              )}
              {stock.latestPrice === stock.open && (
                <LineChart
                  colors={['grey']}
                  data={{ open: stock.open, current: stock.latestPrice }}
                />
              )} */}
              <Button variant="outline-dark" onClick={e => this.subtract(e)}>
                {' '}
                -{' '}
              </Button>
              <h1> quantity :</h1>
              <Form.Control
                plaintext
                readOnly
                name="quantity"
                value={quantity}
              />
              <Button variant="outline-success" onClick={e => this.add(e)}>
                {' '}
                +{' '}
              </Button>
              <h1> Total : {(total = quantity * stock.latestPrice)}</h1>
              <Form.Control plaintext readOnly name="total" value={total} />
              <Form.Control plaintext readOnly name="id" value={user.id} />,
              <h1>
                {' '}
                Your Remaining Balance : {(balance = user.balance - total)}
              </h1>
              <Form.Control plaintext readOnly name="balance" value={balance} />
              {total > user.balance ? (
                <h1>Not enough money</h1>
              ) : (
                <Button variant="primary" type="submit">
                  Comfirm Purchase
                </Button>
              )}
            </Form>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.current,
    stock: state.stock.current
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const tickerSymbol = evt.target.tickerSymbol.value;
      dispatch(fetchStocks(tickerSymbol));
    },

    handlePurchase(evt) {
      evt.preventDefault();
      let buyAmount = evt.target.quantity.value;
      let total = evt.target.total.value;
      let buyPrice = evt.target.price.value;
      let tickerSymbol = evt.target.tickerSymbol.value;
      let balance = evt.target.balance.value;
      let userId = evt.target.id.value;
      console.log('------on purchase', balance, total);
      dispatch(updateUserBalance(balance, userId));
      dispatch(
        updateUserTransaction(buyAmount, buyPrice, tickerSymbol, userId)
      );
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(Stocks);
