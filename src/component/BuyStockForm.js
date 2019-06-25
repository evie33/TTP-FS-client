import React from 'react';
import { connect } from 'react-redux';
import { LineChart } from 'react-chartkick';
import 'chart.js';
import { fetchStocks, updateUserTransaction } from '../store/stockReducer';
import { updateUserBalance } from '../store/userReducer';
import {
  Form,
  FormControl,
  Button,
  Card,
  Row,
  Col,
  Container
} from 'react-bootstrap';

class BuyStocks extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
      total: 0
    };
  }

  subtract = evt => {
    if (this.state.quantity > 1) {
      this.setState({ quantity: this.state.quantity - 1 });
    } else {
      this.setState({ quantity: 1 });
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

  totalPrice = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  remainBalance = (balance, quantity, price) => {
    let total = (quantity * price).toFixed(2);
    return (balance - total).toFixed(2);
  };
  render() {
    const { handlePurchase, handleSubmit, stock, user } = this.props;
    let { quantity, total } = this.state;

    return (
      <Card.Body>
        <Card.Title>Stocks</Card.Title>
        <Form onSubmit={e => handleSubmit(e)}>
          <FormControl
            required
            type="text"
            placeholder="Enter ticker symbol"
            name="tickerSymbol"
          />
          <Button type="submit">Submit</Button>
        </Form>
        <br />
        <br />
        {user.balance && stock.symbol ? (
          <div>
            <h4>Company Name :</h4>
            <h4>{stock.companyName}</h4>
            <br />
            <Form onSubmit={e => handlePurchase(e)}>
              <Row>
                <Col>
                  <Form.Control
                    plaintext
                    readOnly
                    name="tickerSymbol"
                    value={stock.symbol}
                  />
                </Col>
                <Col xs={6}>
                  <p>Current Price:</p>
                </Col>
                <Col>
                  <Form.Control
                    plaintext
                    readOnly
                    name="price"
                    value={stock.latestPrice}
                  />
                </Col>
              </Row>
              <LineChart
                colors={[this.ChangeColor(stock.latestPrice, stock.open)]}
                data={{ open: stock.open, current: stock.latestPrice }}
              />
              <Container>
                <Row>
                  <Col>
                    <Button
                      variant="outline-dark"
                      onClick={e => this.subtract(e)}
                    >
                      {' '}
                      -{' '}
                    </Button>
                  </Col>
                  <Col xs={4}>
                    <p> quantity :</p>
                  </Col>
                  <Col>
                    <Form.Control
                      plaintext
                      readOnly
                      name="quantity"
                      value={quantity}
                    />
                  </Col>
                  <Col>
                    <Button
                      variant="outline-success"
                      onClick={e => this.add(e)}
                    >
                      {' '}
                      +{' '}
                    </Button>
                  </Col>
                </Row>
              </Container>
              <p> Total : </p>
              <Form.Control
                plaintext
                readOnly
                name="total"
                value={this.totalPrice(quantity, stock.latestPrice)}
              />
              ID: <Form.Control plaintext readOnly name="id" value={user.id} />
              <Row>
                <Col>
                  <p>Your Remaining Balance : </p>
                  <Form.Control
                    plaintext
                    readOnly
                    name="balance"
                    value={this.remainBalance(
                      user.balance,
                      quantity,
                      stock.latestPrice
                    )}
                  />
                </Col>
              </Row>
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
      </Card.Body>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.current,
    stock: state.stock.stock
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const { history } = ownProps;
  console.log('------', history);
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const tickerSymbol = evt.target.tickerSymbol.value;
      dispatch(fetchStocks(tickerSymbol));
    },

    handlePurchase(evt) {
      evt.preventDefault();
      let quantity = evt.target.quantity.value;
      let totalBuy = evt.target.total.value;
      let tickerSymbol = evt.target.tickerSymbol.value;
      let balance = evt.target.balance.value;
      let userId = evt.target.id.value;
      console.log('------on purchase', balance);
      dispatch(updateUserBalance(balance, userId));
      dispatch(updateUserTransaction(quantity, totalBuy, tickerSymbol, userId));
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(BuyStocks);
