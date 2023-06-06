//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import {Link, useParams} from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';
import configs from "../../global_config";

function RelationIndex() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [diagnosis, setDiagnosis] = useState('');
    const [result, setResult] = useState('')

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
        await axios.delete(`${url}/diagnosis/${id}`);

        //panggil function "fetchData"
        fectData();
    }

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get(`${url}/getDiagnosis/${patientId}`);
        //get response data
        const data = await response.data.data;
        const dataResult = await response.data.data.diagnosis;
        console.log(dataResult)

        //assign response data to state "relations"
        setDiagnosis(data);
        setResult(dataResult);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <h4>Data Pasien</h4>
                            <div><b>Nama :</b> { diagnosis.patientName }</div>
                            <div><b>Umur :</b> { diagnosis.patientAge }</div>
                            <div><b>Jenis Kelamin :</b> { diagnosis.patientGender }</div>
                            <br/>
                            <h4>Hasil Diagnosis</h4>
                            <div><b>Tingkat Kepercayaan :</b> { result.confidence }% </div>
                            <div>{ result.illness.map(illness => (
                                        <div>
                                            <div><b>Jenis Gangguan :</b> { illness.illnessName } <br/></div>
                                            <div><b>Penjelasan :</b> <br/> { illness.explanation }</div>
                                            <div><b>Solusi :</b> <br/> { illness.solution }</div>
                                        </div>
                            ))}</div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default RelationIndex;
