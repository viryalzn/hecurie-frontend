//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

import configs from "../../global_config";
import Swal from "sweetalert2";
import buttonDelete from '../../image/icon-delete.png'

function DiagnosisIndex() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [diagnosisResults, setDiagnosisResults] = useState([]);

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "deleteRelation"
    const deleteDiagnosis = async (id) => {

        Swal.fire({
            title: 'Perhatian',
            text: 'Apakah Anda yakin? Data akan dihapus secara permanen',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal',
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${url}/diagnosis/${id}`);
            }
            await fectData();
        });
    }

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get(`${url}/getDiagnosis`);
        //get response data
        const data = await response.data.data;

        //assign response data to state "relations"
        setDiagnosisResults(data);
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
                                    <th>Nama</th>
                                    <th>Umur</th>
                                    <th>Jenis Kelamin</th>
                                    <th>Derajat Kepercayaan</th>
                                    <th>Tipe Gangguan Suasana Hati</th>
                                    <th>AKSI</th>
                                </tr>
                                </thead>
                                <tbody>
                                { diagnosisResults.map((result, index) => (
                                    <tr key={ result.patientId }>
                                        <td>{ index + 1 }</td>
                                        <td>{ result.patientName }</td>
                                        <td>{ result.patientAge }</td>
                                        <td>{ result.patientGender }</td>
                                        <td>{ result.diagnosis.confidence }</td>
                                        <td>{ result.diagnosis.illness.map(diagnosis => (
                                            <tr>{ diagnosis.illnessName }</tr>
                                        ))}</td>
                                        <td className="text-center">
                                            <Button onClick={() => deleteDiagnosis(result.patientId)} variant="danger" size="sm">
                                                <img src={buttonDelete} alt="Button Delete" />
                                            </Button>
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

export default DiagnosisIndex;
