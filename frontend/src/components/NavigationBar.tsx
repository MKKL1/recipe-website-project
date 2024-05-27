import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import {useNotificationContext} from "../contexts/NotificationContext.tsx";
import {Variant} from "../models/Variant.ts";

export default function NavigationBar(){
    const {isAuth, resetToken, user} = useAuthContext();
    const {pushNotification} = useNotificationContext();

    return (
        <Navbar collapseOnSelect className="bg-body-tertiary" expand="lg" data-bs-theme="dark" style={{padding: '10px 20px'}}>
            <Navbar.Brand as={Link} to='/'>Recipes Website</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll"/>
            <Navbar.Collapse id="navbarScroll">
                <Nav className="ms-auto my-2 my-lg-0"  style={{ maxHeight: '100vh' }} navbarScroll>
                    {
                        isAuth && user.roles.includes("admin") &&
                        <Nav.Link as={Link} to='/add'>Add</Nav.Link>
                    }
                    <Nav.Link as={Link} to='/recipes'>Recipes</Nav.Link>
                    <Nav.Link as={Link} to='/categories'>Categories</Nav.Link>
                    { isAuth ?
                        <>
                            <Nav.Link as={Link} to='/profile'>Hello, {user.username}</Nav.Link>
                            <Nav.Link onClick={() => {
                                resetToken();
                                pushNotification("Logged out", Variant.info);
                            }}>Logout</Nav.Link>
                        </> :
                        <>
                            <Nav.Link as={Link} to='/login'>Login</Nav.Link>
                            <Nav.Link as={Link} to='/register'>Register</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}