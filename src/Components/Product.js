import React from 'react';

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function Product(props) {
    let desc = props.data.description;
    let id = props.id;

    /* limito la cantidad de caracteres para evitar romper el template */
    if (desc.length > 90) {
        desc = desc.substring(0, 90) + "...";
    }
    
    let imgHeight = '160px';
    let cardWidth = '100%';
    let cardHeight = '400px';
    let marginClass = 'mb-4';

    if (props.full) {
        if (props.full === 1) {
            imgHeight = '250px';
            cardWidth = '60%';
            cardHeight = '450px';
            marginClass = 'm-auto';
        }
    }

    return (
        <div>
            <Card className={marginClass} style={{ width: cardWidth, height: cardHeight }}>
                <Card.Img variant="top" style={{ height: imgHeight }} src={props.data.photo_url} />
                <Card.Body>
                    <Card.Title>{props.data.name}</Card.Title>
                    <Card.Text>
                        {desc}
                    </Card.Text>

                </Card.Body>
                <Card.Body>
                    <div className="text-center">
                        <Button href={"/producto/" + id} variant="dark">Ver</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>

    )
}

export default Product;