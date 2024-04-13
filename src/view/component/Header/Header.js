import React, { Component } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux"; // Tambahkan impor untuk connect
import { logout } from "../../../actions/AuthAction";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogoutMenu: false,
    };
  }

  toggleLogoutMenu = () => {
    this.setState((prevState) => ({ showLogoutMenu: !prevState.showLogoutMenu }));
  };

  handleLogout = () => {
    // code logic for logout
    this.props.dispatch(logout());
  };

  render() {
    const { showLogoutMenu } = this.state;
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Admin Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Tambahkan menu lainnya di sini */}
            </Nav>
            <Nav>
              <NavDropdown title="Logo" id="basic-nav-dropdown" show={showLogoutMenu} onToggle={this.toggleLogoutMenu}>
                <NavDropdown.Item onClick={this.handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default connect()(Header); // Hubungkan komponen dengan store menggunakan connect
