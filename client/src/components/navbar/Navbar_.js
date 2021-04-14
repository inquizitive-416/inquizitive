import React                                from 'react';
import { LOGOUT }                           from '../../cache/mutations';
import { useMutation, useApolloClient }     from '@apollo/client';
import { WButton, WNavItem }                from 'wt-frontend';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap'

const LoggedIn = (props) => {
    const client = useApolloClient();
	const [Logout] = useMutation(LOGOUT);

    const handleLogout = async (e) => {
        Logout();
        const { data } = await props.fetchUser();
        if (data) {
            let reset = await client.resetStore();
            if (reset) props.setActiveList({});
        }
    };

    return (
        <WNavItem hoverAnimation="lighten">
            <WButton className="navbar-options" onClick={handleLogout} wType="texted" hoverAnimation="text-primary">
                Logout
            </WButton>
        </WNavItem >
    );
};

// const LoggedOut = (props) => {
//     return (
//         <>
//             <WNavItem hoverAnimation="lighten">
//                 <WButton className="navbar-options" onClick={props.setShowLogin} wType="texted" hoverAnimation="text-primary">
//                     Login
//                 </WButton>
//             </WNavItem>
//             <WNavItem hoverAnimation="lighten">
//                 <WButton className="navbar-options" onClick={props.setShowCreate} wType="texted" hoverAnimation="text-primary"> 
//                     Sign Up 
//                 </WButton>
//             </WNavItem>
//         </>
//     );
// };

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

const Navbar_ = (props) => {
    return (
        <>
            {
                props.auth === false ? <LoggedOut setShowLogin={props.setShowLogin} setShowCreate={props.setShowCreate} />
                : <LoggedIn fetchUser={props.fetchUser} setActiveList={props.setActiveList} logout={props.logout} />
            }
        </>

    );
};

export default Navbar_;