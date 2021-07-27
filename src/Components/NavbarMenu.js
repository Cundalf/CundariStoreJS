// Dependencias
import React from 'react';
import { Link } from "react-router-dom";
import CundariContext from "../Context/CundariContext"

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

function NavbarMenu(props) {

    return (
        <CundariContext.Consumer>
            {
                context =>
                    <div>
                        <Navbar bg="dark" variant="dark">
                            <Container>
                                <Navbar.Brand href="/">
                                    CundariStore
                                </Navbar.Brand>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/productos">Productos</Nav.Link>
                                    {context.userInfo ? (context.userInfo.admin === 1 ?
                                            (
                                                <Nav.Link href="/admin">Administracion</Nav.Link>
                                            ) : ("")
                                        ) : ("")
                                    }
                                    
                                    {
                                        context.userLogin && <Nav.Link href="/purchases">Mis Compras</Nav.Link>
                                    }
                                </Nav>
                                <Navbar.Toggle />
                                <Navbar.Collapse className="justify-content-end">

                                    {context.userLogin ?
                                        (
                                            <Navbar.Text>
                                                <Link to="/logout">
                                                    {context.userInfo.firstName} &nbsp;
                                                    <i className="bi bi-box-arrow-right"></i>
                                                </Link>
                                            </Navbar.Text>
                                        ) : (
                                            <Navbar.Text>
                                                <Link to="/login">
                                                    Ingresar &nbsp;
                                                    <i className="bi bi-box-arrow-in-right"></i>
                                                </Link>
                                            </Navbar.Text>
                                        )
                                    }

                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    </div>
            }
        </CundariContext.Consumer>
    )
}

export default NavbarMenu;