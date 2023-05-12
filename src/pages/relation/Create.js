//import hook useState from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import {Card, Container, Row, Col, Form, Button, Alert, FormControl} from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

import { MDBCheckbox } from "mdb-react-ui-kit";

function CreateRelation() {

    //define state
    const [illnesses, setIllnesses] = useState([]);
    const [symptoms, setSymptoms] = useState([]);

    //state
    const [illnessCode, setIllnessCode] = useState('');

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
        const responseIllness = await axios.get('http://localhost:9023/getIllness');
        //get response data
        const dataIllness = await responseIllness.data.data;

        //fetching
        const responseSymptom = await axios.get('http://localhost:9023/getSymptom');
        //get response data
        const dataSymptom = await responseSymptom.data.data;

        //assign response data to state "relations"
        setIllnesses(dataIllness);
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
        await axios.post('http://localhost:9023/relation', {
            illnessCode: illnessCode,
            symptomCode: arr
        })
            .then(() => {

                //redirect
                history.push('/relation');

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

                            <Form onSubmit={ storeRelation }>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Pilih Penyakit</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={illnessCode} onChange={(e) => setIllnessCode(e.target.value)}>
                                        { illnesses.map(illness => (
                                            <option value={illness.illnessCode}>{illness.illnessName}</option>
                                        ))}
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
