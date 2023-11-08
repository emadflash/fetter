import { useContext } from 'react';
import AuthContext from "./Auth";

import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap';

const WhenLoggedIn = () => {
    const { auth } = useContext(AuthContext);

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">connect.org</Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">
                    <Button href='/post' className="mx-1" variant="secondary">Create Post</Button>

                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {auth.username}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href={`/profile/${auth.username}`}>Profile</Dropdown.Item>
                            <Dropdown.Item href="/api/user/logout">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

const WhenLoggedOut = () => {
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">connect.org</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button href="/login">sign in</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

function NavigationBar(props) {
    const { auth } = useContext(AuthContext);
    const isLoggedIn = (!auth.username) ? false : true;
    return isLoggedIn ? WhenLoggedIn() : WhenLoggedOut();
}

export default NavigationBar;