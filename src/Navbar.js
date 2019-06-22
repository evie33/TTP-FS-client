import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from 'react-bootstrap';

class Navigation extends React.Component {
  render() {
    const { isLoggedIn, name } = this.props;
    console.log(this.props, name);
    return (
      <Navbar>
        <Navbar.Brand href="/login"> TTP-FS</Navbar.Brand>
        {isLoggedIn ? (
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/profile">{name}</a>
            </Navbar.Text>
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

export default connect(mapState)(Navigation);
