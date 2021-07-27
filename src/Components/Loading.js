import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function NavbarMenu(props) {
    
    let msg = "Cargando, espere por favor...";
    
    if(props.msg) {
        msg = props.msg;
    }
    
    return (
        <div className="text-center">
            <Spinner animation="border" variant="primary" />
            <br />
            <strong>{msg}</strong>
        </div>
    )
}

export default NavbarMenu;