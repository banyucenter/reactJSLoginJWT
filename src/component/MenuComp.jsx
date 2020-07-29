import React, { useState, useContext } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavbarText,
    Button
} from 'reactstrap';
import { AuthContext } from '../App';
import { NavLink } from 'react-router-dom';




function MenuComp() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const { state, dispatch } = useContext(AuthContext)

    if (!state.isAuthenticated) {
        return (
            <div>
                <Navbar className="navbar-dark bg-dark" expand="md">
                    <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>

                            </NavItem>

                        </Nav>
                        <NavbarText>

                            <NavLink to="/login">LOGIN</NavLink>

                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
    return (
        <div>
            <Navbar className="navbar-dark bg-dark" expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/dashboard" className="nav-link">HOME</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/transaksi" className="nav-link">TRANSAKSI</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/mahasiswa" className="nav-link">MAHASISWA</NavLink>
                        </NavItem>

                    </Nav>
                    <NavbarText>
                        <Button color="success"
                            onClick={() =>
                                dispatch({
                                    type: "LOGOUT"
                                })}>
                            
                            LOGOUT

                        </Button>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    )
}

export default MenuComp
