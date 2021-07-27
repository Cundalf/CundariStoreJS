// Dependencias
import React, { useState, useEffect } from "react";
import ProductDetail from "../Components/ProductDetail";
import { getProduct } from "../Services/ItemsServices";
import Loading from "../Components/Loading";

// Bootstrap
import Alert from "react-bootstrap/Alert";

function Product(props) {

    const id = props.match.params.id;
    const [loading, setLoading] = useState(true);
    const [details, setDatails] = useState({});
    const [error, setError] = useState(false);

    useEffect(
        () => {
            async function request() {

                if (typeof id === "undefined") {
                    console.log("No se recibio ID");
                    return;
                }

                const data = await getProduct(id);
                if (typeof data.data() === "undefined") {
                    setError(true);
                }
                else {
                    setDatails(data.data());
                }
                
                setLoading(false);

            }
            request();
        },
        [id]
    );

    if (loading) {
        return (<Loading></Loading>);
    }
    else if (error) {
        return (
            <Alert variant='warning'>
                El producto ingresado no existe o no se encuentra disponible.
            </Alert>
        );
    }
    else {
        return (
            <div>
                <h1>Detalle del producto</h1>
                <hr />
                <ProductDetail data={details} />
            </div>
        );
    }
}

export default Product;