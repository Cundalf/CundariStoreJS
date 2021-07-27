// Dependencias
import React, { useState, useContext } from 'react';
import firebase from "../Config/Firebase";
import CundariContext from "../Context/CundariContext";

// Bootstrap
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function ProductDetail(props) {
    const context = useContext(CundariContext);
    const [canBuy, setCanBuy] = useState(true);
    const [selCantBuy, setCantBuy] = useState(1);
    const [cantBuy] = useState([1, 2, 3]);
    const [msg, setMSG] = useState("");

    const handleBuy = async (event) => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let newDate = yyyy + '-' + mm + '-' + dd;
        
        const document = await firebase.db.collection("compras")
            .add({
                product: props.data,
                userId: context.userID,
                userData: context.userInfo,
                cant: selCantBuy,
                date: newDate
            });

        console.log(document);
        setMSG("Gracias por su compra");
        setCanBuy(false);
    };

    const handleChangeSelect = (event) => {
        setCantBuy(event.target.value);
    };

    return (
        <div>
            <Row>
                <Col sm={6}>
                    <img src={props.data.photo_url} alt="mouse" style={{width: '100%' }} />
                </Col>
                <Col sm={6}>
                    <h3 id="title" className="mb-4">{props.data.name}</h3>
                    <p className="mb-4">{props.data.description}</p>
                    <Row className="text-center">
                        <Col>
                            <h1>${props.data.price.toString()}</h1>
                        </Col>
                    </Row>
                    <p className="center">En Stock: {props.data.stock.toString()}</p>

                    <Form.Label>Seleccione cantidad a comprar</Form.Label>
                    <Row>
                        <Col sm={6}>
                            <Form.Control as="select" id="cantidad" onChange={handleChangeSelect} value={selCantBuy}>
                                {cantBuy.map(cant => <option value={cant} key={cant}>{cant}</option>)}
                            </Form.Control>
                        </Col>
                        <Col className="text-right" sm={6}>
                            <Button variant="dark" type="button" id="btnComprar" onClick={handleBuy} disabled={!canBuy || !context.userLogin}>Comprar</Button>
                        </Col>
                    </Row>
                    
                    {
                        !context.userLogin && <Row className="text-center text-info mt-4"><Col><h5>Debe ingresar para poder comprar</h5></Col></Row>
                    }
                    
                    <p className="mensaje">{msg}</p>

                </Col>
            </Row>

            <hr />
        </div>
    )
}

export default ProductDetail;