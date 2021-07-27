// Dependencias
import React, { useContext, useState, useEffect } from "react";
import firebase from "../../Config/Firebase";
import Loading from "../../Components/Loading";
import CundariContext from "../../Context/CundariContext";
import { useHistory } from "react-router";

// Bootstrap
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {
    const history = useHistory();
    const context = useContext(CundariContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ email: '', password: '' });
    
    useEffect(() => {
        if (context.userLogin) {
            history.push({
                pathname: "/"
            });
        }
    }, [context]);
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            const resLogin = await firebase.authentication.signInWithEmailAndPassword(form.email, form.password);
            const userInfo = await firebase.db.collection("usuarios")
                .where("userId", "==", resLogin.user.uid)
                .get();
            
            context.loginUser(userInfo.docs[0].id, userInfo.docs[0].data());
            
            history.push({
                pathname: "/"
            });
            
        } catch (e) {
            switch (e.code) {
                case "auth/weak-password":
                    setError("El password debe tener al menos 6 caracteres.");
                    break;
                case "auth/user-disabled":
                    setError("El usuario no se encuentra habilitado para ingresar.");
                    break;
                case "auth/wrong-password":
                    setError("Contraseña incorrecta.");
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
                        
                        {error !== "" ? 
                            (
                                <Alert variant="danger" onClose={() => setError("")}  dismissible className="text-left">
                                    <Alert.Heading>Ups!</Alert.Heading>
                                    {error}
                                </Alert>
                            ) : ("")
                        }
                        
                        <Form onSubmit={handleSubmit}>
                            <h1>Bienvenido</h1>
                            <h5>Ingrese sus credenciales</h5>

                            <Form.Group controlId="formBasicEmail" className="mt-4">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Login
                            </Button>
                            <br />
                            <Button href="/registro" variant="info" type="button" className="mt-2">
                                No tengo cuenta
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Login;