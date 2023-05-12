//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import {Link, useParams} from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

function RelationIndex() {

    //define state
    const [diagnosis, setDiagnosis] = useState('');

    console.log(diagnosis)

    //get ID from parameter URL
    const { patientId } = useParams();

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "deleteRelation"
    const deleteRelation = async (id) => {

        //sending
        await axios.delete(`http://localhost:9023/diagnosis/${id}`);

        //panggil function "fetchData"
        fectData();
    }

    //function "fetchData"
    const fectData = async () => {
        console.log(patientId)
        //fetching
        const response = await axios.get(`http://localhost:9023/getDiagnosis/${patientId}`);
        //get response data
        const data = await response.data.data;

        //assign response data to state "relations"
        setDiagnosis(data);
    }
    console.log(diagnosis)

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <div>Nama           : { diagnosis.patientName }</div>
                            <div>Umur           : { diagnosis.patientAge }</div>
                            <div>Jenis Kelamin  : { diagnosis.patientGender }</div>
                            <div>Hasil Diagnosis: </div>
                            <div>{ diagnosis.diagnosis.illnessName.map(illnessName => (
                                        <li> { illnessName }</li>
                            ))}</div>
                            <div>Tingkat Kepercayaan: { diagnosis.diagnosis.confidence }</div>
                            {/*<Button as={Link} to="/relation/create" variant="success" className="mb-3">TAMBAH RELASI</Button>*/}
                            {/*<Table striped bordered hover className="mb-1">*/}
                            {/*    <thead>*/}
                            {/*    <tr>*/}
                            {/*        /!*<th>NO.</th>*!/*/}
                            {/*        <th>Nama Pasien</th>*/}
                            {/*        <th>Umur Pasien</th>*/}
                            {/*        <th>Jenis Kelamin Pasien</th>*/}
                            {/*        <th>Hasil Diagnosis</th>*/}
                            {/*        <th>Tingkat Kepercayaan</th>*/}
                            {/*    </tr>*/}
                            {/*    </thead>*/}
                            {/*    <tbody>*/}
                            {/*    <tr key={ patientId }>*/}
                            {/*        /!*<td>{ index + 1 }</td>*!/*/}
                            {/*        <td>{ diagnosis.patientName }</td>*/}
                            {/*        <td>{ diagnosis.patientAge }</td>*/}
                            {/*        <td>{ diagnosis.patientGender }</td>*/}
                            {/*        <td>{ diagnosis.diagnosis.illnessName.map(illnessName => (*/}
                            {/*            <tr> { "- " + illnessName }</tr>*/}
                            {/*        ))}</td>*/}
                            {/*        <td>{ diagnosis.diagnosis.confidence }</td>*/}
                            {/*        /!*<td>{ relation.symptoms.map(symptom => (*!/*/}
                            {/*        /!*    <tr>{ "- " + symptom.symptomName }</tr>*!/*/}
                            {/*        /!*))}</td>*!/*/}
                            {/*        /!*<td className="text-center">*!/*/}
                            {/*        /!*    <Button as={Link} to={`/relation/edit/${relation.relationId}`} variant="primary" size="sm" className="me-2">EDIT</Button>*!/*/}
                            {/*        /!*    <Button onClick={() => deleteRelation(relation.relationId)} variant="danger" size="sm">DELETE</Button>*!/*/}
                            {/*        /!*</td>*!/*/}
                            {/*    </tr>*/}
                            {/*    </tbody>*/}
                            {/*</Table>*/}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RelationIndex;
