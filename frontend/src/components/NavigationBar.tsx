import {Container, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";



export default function NavigationBar(){


    return (
        <div>
            <Navbar className="bg-body-tertiary" expand="xxl">
                <Container>
                    <Navbar.Brand><Link to="/">Recipes Website</Link></Navbar.Brand>
                    <Nav>
                        <Nav.Link><Link to="/recipes">Recipes</Link></Nav.Link>
                        <Nav.Link><Link to="/login">Login</Link></Nav.Link>
                        <Nav.Link><Link to="/register">Register</Link></Nav.Link>
                        {/*  add logout and logic for displaying it  */}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}