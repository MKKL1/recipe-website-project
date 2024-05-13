import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";

export default function NavigationBar(){
    const {isAuth, resetToken, user} = useAuthContext();

    return (
        <div>
            <Navbar collapseOnSelect className="bg-body-tertiary" expand="lg" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to='/'>Recipes Website</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0"  style={{ maxHeight: '100vh' }} navbarScroll>
                            <Nav.Link as={Link} to='/add'>Add</Nav.Link>
                            <Nav.Link as={Link} to='/recipes'>Recipes</Nav.Link>
                            { isAuth ?
                                <>
                                    <Nav.Link as={Link} to='/profile'>Hello, {user.username}</Nav.Link>
                                    <Nav.Link onClick={resetToken}>Logout</Nav.Link>
                                </> : 
                                <>
                                    <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                                    <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                                </>
                            }
                            {/*  add logout and logic for displaying it  */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}