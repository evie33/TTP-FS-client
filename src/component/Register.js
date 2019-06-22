import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { authRegister } from '../store';

function Register(props) {
  const { handleSubmit } = props;
  console.log(props);
  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Name </Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter name"
          name="name"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Enter email"
          name="email"
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
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
      <Form.Group controlId="formBasicChecbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

const mapRegister = state => {
  return {
    name: 'Register',
    error: state.user.error
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const name = evt.target.name.value;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      console.log('after hitting submit ', name, email, password);
      dispatch(authRegister(name, email, password, ownProps.history));
    }
  };
};

export default connect(
  mapRegister,
  mapDispatch
)(Register);
