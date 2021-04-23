import React                                from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import { LOGOUT }                           from '../welcomescreen/cache/mutation';
import { useMutation, useApolloClient }     from '@apollo/client';

const LoggedOut = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);
    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
        }
    };
    return (
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/explore">In<span style={{color: '#f5ae31'}}>Quiz</span>Itive</Navbar.Brand>
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
        <Button href= '/welcome' onClick={handleLogout}>Logout</Button>
    </Nav>
  </Navbar>
    );
};

const NavbarTop = (props) => {
    return (
        <LoggedOut fetchUser={props.fetchUser}/>
    );
};

export default NavbarTop;