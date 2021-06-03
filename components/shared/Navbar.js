import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import NavbarToggle from "react-bootstrap/NavbarToggle";

const AppNavbar = () => {
    return (
        <div className="navbar-wrapper">
            <Navbar expand="lg" className="navbar-dark fj-mw9">
                <Navbar.Brand className="mr-3 font-weight-bold" href="#">Owen Stanley</Navbar.Brand>
                <NavbarToggle/>
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Nav.Link href="#" className="mr-3">
                            Portfolios
                        </Nav.Link>
                        <Nav.Link href="#" className="mr-3">
                            Forum
                        </Nav.Link>
                        <Nav.Link href="#" className="mr-3">
                            CV
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#" className="mr-3">
                            Sign Up
                        </Nav.Link>
                        <Nav.Link href="#" className="mr-3 btn btn-success bg-green-2 bright">
                            Sign in
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default AppNavbar;