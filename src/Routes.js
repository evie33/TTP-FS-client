import React from 'react';
import { connect } from 'react-redux';
import LogIn from './component/LogIn';
import Register from './component/Register';
import Profile from './component/Profile';
import Stocks from './component/Stocks';
import Transactions from './component/Transactions';
import MyStocks from './component/MyStocks';
import { withRouter, Route, Switch } from 'react-router-dom';
import { fetchUser } from './store/userReducer';

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    console.log(this.props);
    const { isLoggedIn } = this.props;
    console.log('in routes compoonent ----->>>', isLoggedIn);
    return (
      <Switch>
        <Route exact path="/login" component={LogIn} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/investmore" component={Stocks} />
        {isLoggedIn && (
          <Switch>
            {/* --------------- Routes to user ONLY ------------  */}
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/profile/transaction" component={Transactions} />
            <Route exact path="/profile/currentStocks" component={MyStocks} />
          </Switch>
        )}

        <Route component={LogIn} />
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
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
