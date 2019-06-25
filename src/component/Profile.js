import React from 'react';
import { connect } from 'react-redux';

class Profile extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h2>Welcome {user.name}</h2>
        <h2>Your balance: {user.balance}</h2>
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
