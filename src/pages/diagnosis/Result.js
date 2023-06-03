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
        //fetching
        const response = await axios.get(`http://localhost:9023/getDiagnosis/${patientId}`);
        //get response data
        const data = await response.data.data;

        //assign response data to state "relations"
        setDiagnosis(data);
    }

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
                            {/*<div>{ diagnosis.diagnosis.illness.map(illness => (*/}
                            {/*            <li> { illness.illnessName }</li>*/}
                            {/*))}</div>*/}
                            {/*<div>Tingkat Kepercayaan: { diagnosis.diagnosis.confidence }</div>*/}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RelationIndex;
