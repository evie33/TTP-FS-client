import React from 'react';
import { connect } from 'react-redux';
import { Button, ButtonToolbar } from 'react-bootstrap';

class Profile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h2>Welcome {user.name}</h2>
        <h2>Your balance: {user.balance}</h2>
        <ButtonToolbar>
          <Button variant="outline-info" href="/profile/currentStocks">
            My Stocks
          </Button>
          <Button variant="outline-info" href="/profile/transaction">
            Transaction History
          </Button>
          <Button variant="outline-info" href="/investmore">
            Buy Stocks
          </Button>
        </ButtonToolbar>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.current
  };
};

export default connect(mapState)(Profile);
