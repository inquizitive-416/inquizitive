import React                                from 'react';
import { Navbar, Nav } from 'react-bootstrap'

const LoggedOut = (props) => {
    return (
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/home">In<span style={{color: '#f5ae31'}}>Quiz</span>Itive</Navbar.Brand>
    <Nav className="mr-auto">
        <Nav.Link href="/explore">Explore</Nav.Link>
        <Nav.Link href="/create">Create</Nav.Link>
        <Nav.Link href="/tournaments">Tournaments</Nav.Link>
        <Nav.Link href="/shop">Shop</Nav.Link>
    </Nav>
    <Nav>
        <Nav.Link href="/shop">Currency</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
    </Nav>
  </Navbar>
    );
};

const NavbarTop = (props) => {
    return (
        <LoggedOut/>
    );
};

export default NavbarTop;