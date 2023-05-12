//import hook useState from react
import { useState } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

function CreateSymptom() {

    //state
    const [symptomCode, setSymptomCode] = useState('');
    const [symptomName, setSymptomName] = useState('');
    const [belief, setBelief] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //method "storeSymptom"
    const storeSymptom = async (e) => {
        e.preventDefault();

        //send data to server
        await axios.post('http://localhost:9023/symptom', {
            symptomCode: symptomCode,
            symptomName: symptomName,
            belief: belief
        })
            .then(() => {

                //redirect
                history.push('/symptom');

            })
            .catch((error) => {

                //assign validation on state
                setValidation(error.response.data);
            })

    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>

                            {
                                validation.errors &&
                                <Alert variant="danger">
                                    <ul class="mt-0 mb-0">
                                        { validation.errors.map((error, index) => (
                                            <li key={index}>{ `${error.param} : ${error.msg}` }</li>
                                        )) }
                                    </ul>
                                </Alert>
                            }

                            <Form onSubmit={ storeSymptom }>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Kode Gejala</Form.Label>
                                    <Form.Control type="text" value={symptomCode} onChange={(e) => setSymptomCode(e.target.value)} placeholder="Masukkan Kode Gejala" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nama Gelaja</Form.Label>
                                    <Form.Control type="text" value={symptomName} onChange={(e) => setSymptomName(e.target.value)} placeholder="Masukkan Nama Gejala" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nilai Belief</Form.Label>
                                    <Form.Control type="text" value={belief} onChange={(e) => setBelief(e.target.value)} placeholder="Masukkan Nilai Belief" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    SIMPAN
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateSymptom;
