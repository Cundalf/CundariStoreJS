// Dependencias
import React, { useState, useEffect } from "react";
import Product from "../Components/Product";
import { getAllProducts } from "../Services/ItemsServices";
import Loading from "../Components/Loading";

// Bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Products() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(
        () => {
            async function request() {
                const data = await getAllProducts('name');
                setProducts(data);
                setLoading(false);
            }
            request();
        },
        []
    );

    if (loading) {
        return (
            <Loading></Loading>
        );
    } else {
        return (
            <div>
                <div className="text-center">
                    <h2>Productos</h2>
                </div>
                <hr />
                
                <Row>
                    {products.map(product => 
                        <Col key={product.id} sm={4}>
                            <Product id={product.id} data={product.data()} />
                        </Col>
                    )}
                </Row>
            </div>
        );
    }
}

export default Products;