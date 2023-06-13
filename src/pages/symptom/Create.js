//import hook useState from react
import { useState } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

import configs from "../../global_config";
import Swal from "sweetalert2";

function CreateSymptom() {

    const url = configs.CONFIG.API_BASEURL;

    //state
    const [symptomCode, setSymptomCode] = useState('');
    const [symptomName, setSymptomName] = useState('');
    const [belief, setBelief] = useState('');
    const [category, setCategory] = useState('');

    //history
    const history = useHistory();

    //method "storeSymptom"
    const storeSymptom = async (e) => {
        e.preventDefault();

        //send data to server
        await axios.post(`${url}/symptom`, {
            symptomCode: symptomCode,
            symptomName: symptomName,
            category: category,
            belief: belief
        })
            .then(() => {

                //redirect
                history.push('/symptom');

            })
            .catch((error) => {

                if (error.response.data.message === 'symptomCode is not allowed to be empty') {
                    Swal.fire('Oops..', 'kode gejala wajib diisi', 'error');
                } else if (error.response.data.message === 'symptomName is not allowed to be empty') {
                    Swal.fire('Oops..', 'nama gejala wajib diisi', 'error');
                } else if (error.response.data.message === 'category is not allowed to be empty') {
                    Swal.fire('Oops..', 'kategori gejala wajib diisi', 'error');
                } else if (error.response.data.message === 'belief must be a number') {
                    Swal.fire('Oops..', 'nilai belief wajib diisi', 'error');
                }
            })

    };

    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Form onSubmit={ storeSymptom }>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Kode Gejala</Form.Label>
                                    <Form.Control type="text" value={symptomCode} onChange={(e) => setSymptomCode(e.target.value)} placeholder="Masukkan Kode Gejala" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nama Gejala</Form.Label>
                                    <Form.Control type="text" value={symptomName} onChange={(e) => setSymptomName(e.target.value)} placeholder="Masukkan Nama Gejala" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Kategori</Form.Label>
                                    <Form.Control type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Masukkan Kategori" />
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
