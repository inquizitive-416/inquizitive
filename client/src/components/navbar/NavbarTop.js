import React                                from 'react';
import { Navbar, Nav } from 'react-bootstrap'
import Button from "react-bootstrap/Button";
import { LOGOUT }                           from '../welcomescreen/cache/mutation';
import { useQuery, useMutation, useApolloClient }     from '@apollo/client';
import { GET_CURRENT_USER } from './queries';
import { getCurrentUser } from "../../data/LocalStorage";

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

    const selfPlatformLink = "/platform/" + props.user._id;

    return (
        <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/explore">In<span style={{color: '#f5ae31'}}>Quiz</span>Itive</Navbar.Brand>
    <Nav className="mr-auto">
        <Nav.Link href="/explore">Explore</Nav.Link>
        <Nav.Link href="/create">Create</Nav.Link>
        <Nav.Link href="/tournaments">Tournaments</Nav.Link>
        <Nav.Link href="/shop">Shop</Nav.Link>
        <Nav.Link href="/begin">Play</Nav.Link>
    </Nav>
    <Nav>
        <Nav.Link href="/shop">Currency</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
        <Nav.Link href={selfPlatformLink}>Profile</Nav.Link>
        <Button href= '/welcome' onClick={handleLogout}>Logout</Button>
    </Nav>
  </Navbar>
    );
};

const NavbarTop = (props) => {

    let currentUser = 'base'

    const { loading, error, data } = useQuery(GET_CURRENT_USER, {
        variables: {_id: getCurrentUser()._id}
    })
    if (loading) { return <div></div>; }
    if(error) { console.log(error);
        return <div>Internal Error</div>; }
	if(data) { currentUser = data.getUserById }

    return (
        <LoggedOut fetchUser={props.fetchUser} user={currentUser}/>
    );
};

export default NavbarTop;