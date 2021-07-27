// Dependencias
import React, { useState, useEffect, useContext } from "react";
import firebase from "../../Config/Firebase";
import Loading from "../../Components/Loading";
import CundariContext from "../../Context/CundariContext";

// Bootstrap
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";

function Purchases() {
    const context = useContext(CundariContext);
    const [loading, setLoading] = useState(true);
    const [purchases, setPurchases] = useState([]);
    const [error, setError] = useState("");
    const [msg, setMSG] = useState("");

    useEffect(
        () => {
            async function request() {
                try {
                    let items = await firebase.db.collection("compras").where("userId", "==", context.userID).get();
                    setPurchases(items.docs);
                } catch (e) {
                    console.log("error", e);
                    return null;
                }
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
                    <h2>Mis compras</h2>
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

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchases.map(item =>
                            <tr>
                                <td>{item.data().date}</td>
                                <td>{item.data().product.name}</td>
                                <td>{item.data().cant}</td>
                                <td>{item.data().cant * item.data().product.price}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default Purchases;