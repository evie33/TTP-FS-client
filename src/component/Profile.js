import React from 'react';
import './Profile.css';
import { fetchUser } from '../store';
import { connect } from 'react-redux';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      body: []
    };
  }
  componentDidMount() {
    this.props.user();
  }
  render() {
    const { user } = this.props;
    console.log(user);
    return (
      <div>
        <h2>Profile</h2>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    user: () => dispatch(fetchUser())
  };
};

export default connect(
  null,
  mapDispatch
)(Profile);
