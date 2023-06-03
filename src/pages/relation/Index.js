//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

import configs from "../../global_config";

function RelationIndex() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [relations, setRelations] = useState([]);

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "deleteRelation"
    const deleteRelation = async (id) => {

        let deleteMessage = window.confirm("Data akan dihapus secara permanen.");
        if (deleteMessage) {
            //sending
            await axios.delete(`${url}/relation/${id}`);
        }

        //panggil function "fetchData"
        fectData();
    }

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get(`${url}/getRelation`);
        //get response data
        const data = await response.data.data;

        //assign response data to state "relations"
        setRelations(data);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/relation/create" variant="success" className="mb-3">TAMBAH RELASI</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>Nama Penyakit</th>
                                    <th>Nama Gejala</th>
                                    <th>AKSI</th>
                                </tr>
                                </thead>
                                <tbody>
                                { relations.map((relation, index) => (
                                    <tr key={ relation.relationId }>
                                        <td>{ index + 1 }</td>
                                        <td>{ relation.illness.illnessName }</td>
                                        <td>{ relation.symptoms.map(symptom => (
                                            <tr>{ "- " + symptom.symptomName }</tr>
                                        ))}</td>
                                        <td className="text-center">
                                            <Button as={Link} to={`/relation/edit/${relation.relationId}`} variant="primary" size="sm" className="me-2">EDIT</Button>
                                            <Button onClick={() => deleteRelation(relation.relationId)} variant="danger" size="sm">DELETE</Button>
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

export default RelationIndex;
