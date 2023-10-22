import React, { useContext, useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";


import crest from '../../assets/uw-crest.svg'
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";



function BadgerLayout(props) {

    // TODO @ Step 6:
    // You'll probably want to see if there is an existing
    // user in sessionStorage first. If so, that should
    // be your initial loginStatus state.

    const [loginStatus, setLoginStatus] = useState(undefined)
    const loggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn'));
    console.log(loggedIn)

    useEffect(()=>{
        setLoginStatus(loggedIn)
    }, [loggedIn])

    

   


    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        {loggedIn  === true? (
                            <Nav.Link as={Link} to="logout">Logout</Nav.Link>
          
                    ) : (
                    <>
                        <Nav.Link as={Link} to="login">Login</Nav.Link>
                        <Nav.Link as={Link} to="register">Register</Nav.Link>
                     </>
                    )}
                        <NavDropdown title="Chatrooms">
                                <NavDropdown.Item as={Link} to={'/chatrooms/Bascom%20Hill%20Chatters'}> Bascom Hill Chatters</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Memorial%20Union%20Hangout'}> Memorial Union Hangout</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Lake%20Mendota%20Viewpoint'}> Lake Mendota Viewpoint</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/State%20Street%20Strollers'}> State Street Strollers</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Camp%20Randall%20Roar'}> Camp Randall Roar</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Aldo%20Leopold%20Nature%20Talks'}> Aldo Leopold Nature Talks</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Wisconsin%20State%20Capitol%20Debates'}> Wisconsin State Capitol Debates</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Monona%20Terrace%20Meetups'}> Monona Terrace Meetups</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Henry%20Vilas%20Zoo%20Enthusiasts'}> Henry Vilas Zoo Enthusiasts</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to={'/chatrooms/Chazen%20Art%20Appreciation'}> Chazen Art Appreciation</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ margin: "1rem" }}>
                <BadgerLoginStatusContext.Provider value={[loginStatus, setLoginStatus]}>
                    <Outlet />
                </BadgerLoginStatusContext.Provider>
            </div>
        </div>
    );
}

export default BadgerLayout;