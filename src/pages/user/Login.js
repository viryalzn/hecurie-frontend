import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

//import hook useState from react
import { useState } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import {BrowserRouter, useHistory} from "react-router-dom";

import configs from "../../global_config";

import App from "../../App";

function Login() {

    const url = configs.CONFIG.API_BASEURL;

    //state
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    //history
    const history = useHistory();

    //method "storeSymptom"
    const login = async (e) => {
        e.preventDefault();

        //send data to server
        await axios.post(`${url}/user/login`, {
            username: username,
            password: password
        })
            .then(() => {

                ReactDOM.render(
                    <React.StrictMode>
                        <BrowserRouter>
                            <App isAdmin={true} />
                        </BrowserRouter>
                    </React.StrictMode>,
                    document.getElementById('root')
                );
                history.push('/dashboard')
            })
            .catch((error) => {
                if (error.response.data.message === 'username is not allowed to be empty') {
                    Swal.fire('Oops..', 'username wajib diisi', 'error');
                } else if (error.response.data.message === 'password is not allowed to be empty') {
                    Swal.fire('Oops..', 'password wajib diisi', 'error');
                } else if (error.response.data.message === 'Username and password didn\'t match') {
                    Swal.fire('Oops..', 'username dan password tidak sesuai', 'error');
                }
            })

    };

    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Form onSubmit={ login }>

                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" value={username} onChange={(e) =>
                                        setUsername(e.target.value)} placeholder="Masukkan username atau email" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" value={password} onChange={(e) =>
                                        setPassword(e.target.value)} placeholder="Masukkan password" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
