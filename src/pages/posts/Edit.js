//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button, Alert } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dan params dari react router dom
import { useHistory, useParams } from "react-router-dom";

function EditPost() {

    //state
    // const [illnessCode, setIllnessCode] = useState('');
    const [illnessName, setIllnessName] = useState('');
    const [explanation, setExplanation] = useState('');
    const [solution, setSolution] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //history
    const history = useHistory();

    //get ID from parameter URL
    const { illnessId } = useParams();

    console.log(illnessId)

    //hook useEffect
    useEffect(() => {

        //panggil function "getPOstById"
        getPostById();

    }, []);

    //function "getPostById"
    const getPostById = async() => {

        //get data from server
        const response = await axios.get(`http://localhost:9023/getIllness/${illnessId}`);
        console.log(response)
        //get response data
        const data = await response.data.data

        //assign data to state
        // setIllnessCode(data.illnessCode);
        setIllnessName(data.illnessName);
        setExplanation(data.explanation);
        setSolution(data.solution);

    };

    //function "updatePost"
    const updatePost = async (e) => {
        e.preventDefault();

        //send data to server
        await axios.put(`http://localhost:9023/illness/${illnessId}`, {
            illnessId: illnessId,
            illnessName: illnessName,
            explanation: explanation,
            solution: solution
        })
            .then(() => {

                //redirect
                history.push('/posts');

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

                            <Form onSubmit={ updatePost }>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Nama Penyakit</Form.Label>
                                    <Form.Control type="text" value={illnessName} onChange={(e) => setIllnessName(e.target.value)} placeholder="Masukkan Nama Penyakit" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Definisi</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Masukkan Definisi" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Solusi</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={solution} onChange={(e) => setSolution(e.target.value)} placeholder="Masukkan Solusi" />
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

export default EditPost;
