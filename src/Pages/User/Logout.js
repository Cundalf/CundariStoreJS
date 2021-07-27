// Dependencias
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import CundariContext from "../../Context/CundariContext"

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Logout() {
    const context = useContext(CundariContext);

    useEffect(() => {
        context.logoutUser();
    }, [context]);
    
    return (

        <div>
            <Row className="justify-content-md-center text-center">
                <Col xs sm="4">
                    <h3>¡Nos vemos pronto!</h3>
                    <p>Ha cerrado sesión correctamente.</p>
                    <Link to={"/"}>Volver</Link>
                </Col>
            </Row>
        </div>

    );
}

export default Logout;