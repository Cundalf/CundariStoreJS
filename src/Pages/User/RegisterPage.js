// Dependencias
import React, { useState } from "react";
import firebase from "../../Config/Firebase";
import Loading from "../../Components/Loading";

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

function RegisterPage() {
    const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', password2: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [msg, setMSG] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setMSG("");
            setError("");
            setLoading(true);
            if (form.password !== form.password2) {
                alert("Las contraseñas no coinciden");
                return;
            }

            const resUser = await firebase.authentication.createUserWithEmailAndPassword(form.email, form.password);

            const document = await firebase.db.collection("usuarios")
                .add({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    userId: resUser.user.uid,
                    admin: 0
                });

            setForm({ firstName: '', lastName: '', email: '', password: '', password2: '' });

            setMSG("Se ha registrado con exito. Ya puede ingresar")
            setLoading(false);
        }
        catch (e) {
            switch (e.code) {
                case "auth/weak-password":
                    setError("Contraseña demasiado debil.");
                    break;
                case "auth/operation-not-allowed":
                    setError("No tiene permitido registrarse.");
                    break;
                case "auth/email-already-in-use":
                    setError("Email ya en uso.");
                    break;
                case "auth/invalid-email":
                    setError("Email invalido.");
                    break;
                default:
                    console.log(e);
                    setError(e.message);
            }

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
                <Row className="justify-content-md-center text-center">
                    <Col xs sm="4">
                        <Form onSubmit={handleSubmit}>
                            <h1>Registro</h1>
                            <h4>Por favor, llene el siguiente formulario</h4>

                            {error !== "" ?
                                (
                                    <Alert variant="danger" onClose={() => setError("")} dismissible className="text-left">
                                        <Alert.Heading>Ups!</Alert.Heading>
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

                            <Form.Group controlId="formBasicNombre" className="mt-4">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" name="firstName" value={form.firstName} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicApellido" className="mt-4">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Apellido" name="lastName" value={form.lastName} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail" className="mt-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword2">
                                <Form.Label>Repita la contraseña</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password2" value={form.password2} onChange={handleChange} required />
                            </Form.Group>

                            <Button variant="dark" type="submit">
                                Registrarse
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default RegisterPage;