//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

import configs from "../../global_config";
import Swal from "sweetalert2";

function IllnessIndex() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [illnesses, setIllnesses] = useState([]);

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "deleteIllness"
    const deleteIllness = async (id) => {

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
                await axios.delete(`${url}/illness/${id}`);
            }
            await fectData();
        });

    }

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
                            <Button as={Link} to="/illness/create" variant="success" className="mb-3">TAMBAH PENYAKIT</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>Kode Penyakit</th>
                                    <th>Nama Penyakit</th>
                                    <th>Kategori Penyakit</th>
                                    <th>Definisi</th>
                                    <th>Solusi</th>
                                    <th>AKSI</th>
                                </tr>
                                </thead>
                                <tbody>
                                { illnesses.map((illness, index) => (
                                    <tr key={ illness.illnessId }>
                                        <td>{ index + 1 }</td>
                                        <td>{ illness.illnessCode }</td>
                                        <td>{ illness.illnessName }</td>
                                        <td>{ illness.illnessCategory }</td>
                                        <td>{ illness.explanation }</td>
                                        <td>{ illness.solution }</td>
                                        <td className="text-center">
                                            <Button as={Link} to={`/illness/edit/${illness.illnessId}`} variant="primary" size="sm" className="me-2">EDIT</Button>
                                            <Button onClick={() => deleteIllness(illness.illnessId)} variant="danger" size="sm">DELETE</Button>
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

export default IllnessIndex;
