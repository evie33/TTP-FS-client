import React from 'react';
import './Profile.css';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      body: []
    };
  }
  componentDidMount() {
    fetch('api/xx')
      .then(res => res.json())
      .then(body =>
        this.setState({ body }, () => {
          console.log('body fetch', body);
        })
      );
  }
  render() {
    return (
      <div>
        <h2>Profile</h2>
      </div>
    );
  }
}

export default Profile;
