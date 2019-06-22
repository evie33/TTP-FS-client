import React from 'react';
import { connect } from 'react-redux';

class MyStocks extends React.Component {
  render() {
    return (
      <div>
        <h2>My stocks </h2>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user.current
  };
};

export default connect(mapState)(MyStocks);
