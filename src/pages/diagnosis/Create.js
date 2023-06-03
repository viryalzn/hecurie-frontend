//import hook useState from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import {Card, Container, Row, Col, Form, Button, Alert, FormControl} from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

import { MDBCheckbox } from "mdb-react-ui-kit";
import configs from "../../global_config";

function CreateRelation() {

    const url = configs.CONFIG.API_BASEURL;
    console.log(url)

    //define state
    const [symptoms, setSymptoms] = useState([]);

    //state
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientGender, setPatientGender] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    const fectData = async () => {
        //fetching
        const responseSymptom = await axios.get(`${url}/getSymptom`);
        //get response data
        const dataSymptom = await responseSymptom.data.data;

        //assign response data to state "relations"
        setSymptoms(dataSymptom);
    }

    //method "storeRelation"
    const storeRelation = async (e) => {
        let arr = [];
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        for (let i = 0; i < checkboxes.length; i++) {
            arr.push(checkboxes[i].value)
        }

        e.preventDefault();

        //send data to server
        await axios.post(`${url}/diagnosis`, {
            patientName: patientName,
            patientAge: patientAge,
            patientGender: patientGender,
            symptomCode: arr
        })
            .then((data) => {

                const patientId = data.data.data.patientId;
                //redirect
                history.push(`/diagnosis/result/${patientId}`);

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
                                validation.message &&
                                <Alert variant="danger">
                                    { validation.message }
                                </Alert>
                            }

                            <Form onSubmit={ storeRelation }>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nama</Form.Label>
                                    <Form.Control type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Masukkan Nama" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Umur</Form.Label>
                                    <Form.Control type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="Masukkan Umur" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Jenis Kelamin</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={patientGender} onChange={(e) => setPatientGender(e.target.value)}>
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-Laki">Laki-Laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Gelaja</Form.Label>
                                    { symptoms.map(symptom => (
                                        <MDBCheckbox value={symptom.symptomCode} type="checkbox" label={symptom.symptomName} />
                                    ))}
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

export default CreateRelation;
