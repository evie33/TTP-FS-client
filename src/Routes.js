import React from 'react';
import { connect } from 'react-redux';
import LogIn from './component/LogIn';
import Register from './component/Register';
import Stocks from './component/Stocks';
import Profile from './component/Profile';
import Transactions from './component/Transactions';
import MyStocks from './component/MyStocks';
import { withRouter, Route, Switch } from 'react-router-dom';
import { fetchUser } from './store/userReducer';
import { Card, Nav } from 'react-bootstrap';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={Register} />
        {isLoggedIn && (
          <React.Fragment>
            <Card>
              <Card.Header>
                <Nav variant="pills">
                  <Nav.Item>
                    <Nav.Link href="/profile">My Info</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/profile/investmore">Buy Stocks</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/profile/currentStocks">My Stocks</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/profile/transaction">History</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
            </Card>
            <Switch>
              {/* --------------- Routes to user ONLY ------------  */}
              <Route exact path="/profile" component={Profile} />
              <Route
                exact
                path="/profile/transaction"
                component={Transactions}
              />
              <Route exact path="/profile/investmore" component={Stocks} />
              <Route exact path="/profile/currentStocks" component={MyStocks} />
            </Switch>
          </React.Fragment>
        )}
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.current.id
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(fetchUser());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Routes)
);
