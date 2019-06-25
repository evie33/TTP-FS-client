import React from 'react';
import { connect } from 'react-redux';
import { logout } from './store/userReducer';
import { withRouter } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    const { isLoggedIn, name, handleClick } = this.props;
    return (
      <Navbar>
        <Navbar.Brand href="/login"> TTP-FS</Navbar.Brand>
        {isLoggedIn ? (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:<a href="/profile/investmore">{name}</a>
            </Navbar.Text>
            <Button
              variant="outline-danger"
              type="submit"
              onClick={handleClick}
              href="/login"
            >
              Log Out{' '}
            </Button>
          </Navbar.Collapse>
        ) : (
          <Nav activeKey="/login">
            <Nav.Item>
              <Nav.Link href="/login">Log In</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          </Nav>
        )}
      </Navbar>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.current.id,
    name: state.user.current.name
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(Navigation)
);
