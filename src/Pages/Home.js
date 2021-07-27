import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Product from "../Components/Product";
import Loading from "../Components/Loading";
import firebase from "../Config/Firebase";
import { getTopProduct } from "../Services/ItemsServices";

function Home() {

    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    console.log("DB:", firebase.db);

    useEffect(
        () => {
            async function request() {
                const data = await getTopProduct();

                setProduct({ ...data.data(), id: data.id });
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
    }
    else {
        /* repito los productos para que haya mas para visualizar mejor el template */
        return (
            <div className="home">
                <div className="header">
                    <h1 class="text-info">Bienvenido a <strong>CundariStore</strong></h1>
                    <p>
                        <strong>¡Nuevos Ingresos!</strong> Visite la pagina de <Link to="/productos">Productos</Link> para ver los nuevos productos al mejor precio.
                    </p>
                </div>

                <hr />

                <div className="top">
                    <h2>Producto Destacado</h2>
                    <Product data={product} id={product.id} full={1} />
                </div>

                <hr />

                <div className="footer text-center">
                    <p>
                        Cundari © 2021 - Patente pendiente, pendiente, pendiente
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;