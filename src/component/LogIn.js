import React from 'react';
import { Form, Button, Badge, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { auth } from '../store';

function LogIn(props) {
  const { handleSubmit, error } = props;
  return (
    <Card border="dark" style={{ width: '95%' }}>
      <Card.Header>
        <h1>Sign In </h1>
      </Card.Header>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter email"
            name="email"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        {error && (
          <div>
            <Badge variant="danger">Error: {error.response.data}</Badge>
          </div>
        )}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

const mapLogin = state => {
  return {
    name: 'login',
    error: state.user.current.error
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, ownProps.history));
    }
  };
};

export default connect(
  mapLogin,
  mapDispatch
)(LogIn);
