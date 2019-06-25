import React from 'react';
import { Form, Button, Badge, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authRegister } from '../store';

function Register(props) {
  const { handleSubmit, error } = props;
  return (
    <Card border="dark" style={{ width: '95%' }}>
      <Card.Header>
        <h1>Register </h1>
      </Card.Header>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Name </Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter name"
            name="name"
          />
          <Form.Text className="text-muted" />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter email"
            name="email"
          />
          <Form.Text className="text-muted" />
        </Form.Group>
        {error && (
          <div>
            <Badge variant="danger">Error: {error.response.data}</Badge>
          </div>
        )}

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  );
}

const mapRegister = state => {
  return {
    name: 'Register',
    error: state.user.current.error
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const name = evt.target.name.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authRegister(name, email, password, ownProps.history));
    }
  };
};

export default connect(
  mapRegister,
  mapDispatch
)(Register);
