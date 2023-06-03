//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dan params dari react router dom
import { useHistory, useParams } from "react-router-dom";

function EditSymptom() {

    //state
    // const [illnessCode, setIllnessCode] = useState('');
    const [symptomName, setSymptomName] = useState('');
    const [belief, setBelief] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //get ID from parameter URL
    const { symptomId } = useParams();

    //hook useEffect
    useEffect(() => {

        //panggil function "getSymptomById"
        getSymptomById();

    }, []);

    //function "getSymptomById"
    const getSymptomById = async() => {

        //get data from server
        const response = await axios.get(`http://localhost:9023/getSymptom/${symptomId}`);
        console.log(response)
        //get response data
        const data = await response.data.data

        //assign data to state
        // setIllnessCode(data.illnessCode);
        setSymptomName(data.symptomName);
        setBelief(data.belief);

    };

    //function "updateSymptom"
    const updateSymptom = async (e) => {
        e.preventDefault();

        //send data to server
        await axios.put(`http://localhost:9023/symptom/${symptomId}`, {
            symptomId: symptomId,
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

                            <Form onSubmit={ updateSymptom }>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nama Gejala</Form.Label>
                                    <Form.Control type="text" value={symptomName} onChange={(e) => setSymptomName(e.target.value)} placeholder="Masukkan Nama Gelaja" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nilai Belief</Form.Label>
                                    <Form.Control type="text" value={belief} onChange={(e) => setBelief(e.target.value)} placeholder="Masukkan Nilai Belief" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    UPDATE
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditSymptom;
