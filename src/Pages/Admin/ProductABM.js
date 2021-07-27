// Dependencias
import React, { useState, useEffect } from "react";
import firebase from "../../Config/Firebase";
import Loading from "../../Components/Loading";

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function RegisterPage(props) {
    const id = props.match.params.id;

    const [form, setForm] = useState({ id: '', name: '', photo_url: '', description: '', stock: 0, price: 0 });
    const [error, setError] = useState("");
    const [msg, setMSG] = useState("");
    const [title, setTitle] = useState("Nuevo producto");
    const [canSave, setCanSave] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () => {
            async function request() {
                if (typeof id !== "undefined") {
                    try {
                        setLoading(true);
                        const product = await firebase.db.doc("productos/" + id).get();

                        if (product.exists) {
                            setForm(product.data());
                            setTitle("Producto: #" + product.data().id);
                        } else {
                            setError("No se pudieron cargar los datos");
                            setCanSave(false);
                        }

                        setLoading(false);
                    } catch (e) {
                        setError(e.message);
                        setLoading(false);
                    }
                }
            }
            request();
        },
        []
    )

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");
            setMSG("");
            setLoading(true);

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            let newDate = yyyy + '-' + mm + '-' + dd;

            let document = null;
            if (typeof id === "undefined") {

                const productDB = await firebase.db.collection('productos').where("id", "==", form.id).get();
                if (productDB.docs.length > 0) {
                    setError("Ya existe el ID");
                }
                else {
                    document = await firebase.db.collection("productos").add({ ...form, date_add: newDate, date_upd: newDate });
                    setMSG("Se creo el producto correctamente");
                }

            } else {
                document = await firebase.db.doc("productos/" + id).set({ ...form, date_upd: newDate });
                setMSG("Se actualizo el producto correctamente");
                setCanSave(false);
            }

            if (document !== null) {
                console.log("Product: ", document);
                setForm({ id: '', name: '', photo_url: '', description: '', stock: 0, price: 0 });
            }

            setLoading(false);
        }
        catch (e) {
            setError(e.message);
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setForm({ ...form, [name]: value });
    };

    if (loading) {
        return (
            <Loading></Loading>
        );
    }
    else {
        return (

            <div>
                <Row className="justify-content-md-center">
                    <Col xs sm="6">
                        <Form onSubmit={handleSubmit}>
                            <h3>{title}</h3>
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

                            <Row className="mt-2">
                                <Col xs sm="6">
                                    <Form.Group controlId="formBasicid">
                                        <Form.Label>ID</Form.Label>
                                        <Form.Control type="number" min="0" placeholder="ID" name="id" value={form.id} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs sm="12">
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Producto</Form.Label>
                                        <Form.Control type="text" placeholder="Nombre del producto" name="name" value={form.name} onChange={handleChange} required />
                                    </Form.Group>

                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs sm="12">
                                    <Form.Group controlId="formBasicURL">
                                        <Form.Label>URL de imagen</Form.Label>
                                        <Form.Control type="url" placeholder="URL" name="photo_url" value={form.photo_url} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs sm="12">
                                    <Form.Group controlId="formBasicDescription">
                                        <Form.Label>Descripcion</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder="Description" name="description" value={form.description} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mt-2">
                                <Col xs sm="6">
                                    <Form.Group controlId="formBasicStock">
                                        <Form.Label>Stock</Form.Label>
                                        <Form.Control type="number" min="0" placeholder="Stock" name="stock" value={form.stock} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>

                                <Col xs sm="6">
                                    <Form.Group controlId="formBasicPrice">
                                        <Form.Label>Precio</Form.Label>
                                        <Form.Control type="text" placeholder="Price" name="price" value={form.price} onChange={handleChange} required />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <hr />

                            <Row className="text-right">
                                <Col xs sm="12">
                                    <Button href="/admin" variant="danger" type="button" className="mr-1">
                                        Cancelar
                                    </Button>

                                    <Button variant="success" type="submit" disabled={!canSave}>
                                        Guardar
                                    </Button>
                                </Col>
                            </Row>


                        </Form>
                    </Col>
                </Row>
            </div>

        );

    }
}

export default RegisterPage;