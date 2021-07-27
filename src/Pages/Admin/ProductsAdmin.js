// Dependencias
import React, { useState, useEffect } from "react";
import { getAllProducts } from "../../Services/ItemsServices";
import firebase from "../../Config/Firebase";
import Loading from "../../Components/Loading";

// Bootstrap
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function ProductsAdmin() {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [msg, setMSG] = useState("");
    
    useEffect(
        () => {
            async function request() {
                const data = await getAllProducts();
                setProducts(data);
                setLoading(false);
            }
            request();
        },
        []
    );

    const handleDelete = async (event) => {
        event.preventDefault();
        const value = event.target.value;
        try {
            setLoading(true);
            await firebase.db.collection('productos').doc(value).delete();
            const data = await getAllProducts();
            setProducts(data);
            setLoading(false);
            
            setMSG("Se elimino el producto correctamente");
        }
        catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Loading></Loading>
        );
    } else {
        return (
            <div>
                <div className="text-center">
                    <h2>ABM de Productos</h2>
                </div>
                <hr />
            
                {error !== "" ?
                    (
                        <Alert variant="danger" onClose={() => setError("")} dismissible className="text-left">
                            {error}
                        </Alert>
                    ) : ("")
                }

                {msg !== "" ?
                    (
                        <Alert variant="success" onClose={() => setMSG("")} dismissible className="text-left">
                            {msg}
                        </Alert>
                    ) : ("")
                }

                <div className="text-right">
                    <Button href="/admin/producto" type="button" variant="success" size="sm"><i className="bi bi-plus"></i>{' '}Nuevo</Button>
                </div>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>
                            <tr key={product.id}>
                                <td>{product.data().id}</td>
                                <td>{product.data().name}</td>
                                <td className="text-right">
                                    <Button href={"/admin/producto/" + product.id} type="button" variant="info" size="sm">
                                        <i className="bi bi-pencil"></i>
                                    </Button>{' '}
                                    <Button onClick={(e) => handleDelete(e)} type="button" variant="danger" size="sm" value={product.id}>
                                        <i className="bi bi-x-lg"></i>
                                    </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default ProductsAdmin;