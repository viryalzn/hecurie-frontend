//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

import configs from "../../global_config";

function SymptomIndex() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [symptoms, setSymptoms] = useState([]);

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "deleteSymptom"
    const deleteSymptom = async (id) => {

        let deleteMessage = window.confirm("Data akan dihapus secara permanen.");
        if (deleteMessage) {
            //sending
            await axios.delete(`${url}/symptom/${id}`);
        }

        //panggil function "fetchData"
        fectData();
    }

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get(`${url}/getSymptom`);
        //get response data
        const data = await response.data.data;

        //assign response data to state "symptoms"
        setSymptoms(data);
    }

    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/symptom/create" variant="success" className="mb-3">TAMBAH GEJALA</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>Kode Gejala</th>
                                    <th>Gejala</th>
                                    <th>Belief</th>
                                    <th>Plausability</th>
                                    <th>AKSI</th>
                                </tr>
                                </thead>
                                <tbody>
                                { symptoms.map((symptom, index) => (
                                    <tr key={ symptom.symptomId }>
                                        <td>{ index + 1 }</td>
                                        <td>{ symptom.symptomCode }</td>
                                        <td>{ symptom.symptomName }</td>
                                        <td>{ symptom.belief }</td>
                                        <td>{ symptom.plausability }</td>
                                        <td className="text-center">
                                            <Button as={Link} to={`/symptom/edit/${symptom.symptomId}`} variant="primary" size="sm" className="me-2">EDIT</Button>
                                            <Button onClick={() => deleteSymptom(symptom.symptomId)} variant="danger" size="sm">DELETE</Button>
                                        </td>
                                    </tr>
                                )) }
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SymptomIndex;
