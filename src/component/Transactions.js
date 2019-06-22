import React from 'react';
import { connect } from 'react-redux';

class Transactions extends React.Component {
  render() {
    return (
      <div>
        <h2>Transaction</h2>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.current
  };
};

export default connect(mapState)(Transactions);
