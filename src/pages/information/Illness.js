//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

import configs from "../../global_config";

function InformationIllness() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [illnesses, setIllnesses] = useState([]);

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get(`${url}/getIllness`);
        //get response data
        const data = await response.data.data;

        //assign response data to state "illnesses"
        setIllnesses(data);
    }

    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>Kode Penyakit</th>
                                    <th>Nama Penyakit</th>
                                    <th>Definisi</th>
                                    <th>Solusi</th>
                                </tr>
                                </thead>
                                <tbody>
                                { illnesses.map((illness, index) => (
                                    <tr key={ illness.illnessId }>
                                        <td>{ index + 1 }</td>
                                        <td>{ illness.illnessCode }</td>
                                        <td>{ illness.illnessName }</td>
                                        <td>{ illness.explanation }</td>
                                        <td>{ illness.solution }</td>
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

export default InformationIllness;
