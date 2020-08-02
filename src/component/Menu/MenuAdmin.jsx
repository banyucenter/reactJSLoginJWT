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
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../App';

function MenuAdmin() {
    const {dispatch } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
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

export default MenuAdmin
