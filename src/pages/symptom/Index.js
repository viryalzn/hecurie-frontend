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
import buttonEdit from '../../image/icon-edit.png'
import buttonDelete from '../../image/icon-delete.png'

function SymptomIndex() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [symptoms, setSymptoms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Logic to calculate the total number of pages
    const totalPages = Math.ceil(symptoms.length / 5);

    // Logic to slice the data based on the current page
    const indexOfLastItem = currentPage * 5;
    const indexOfFirstItem = indexOfLastItem - 5;
    const currentItems = symptoms.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page navigation
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "deleteSymptom"
    const deleteSymptom = async (id) => {

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
                await axios.delete(`${url}/symptom/${id}`);
            }
            await fectData();
        });

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
                                    <th>Kategori</th>
                                    <th>Belief</th>
                                    <th>Plausability</th>
                                    <th colSpan={2}>AKSI</th>
                                </tr>
                                </thead>
                                <tbody>
                                { currentItems.map((symptom, index) => (
                                    <tr key={ symptom.symptomId }>
                                        <td>{ indexOfFirstItem + index + 1 }</td>
                                        <td>{ symptom.symptomCode }</td>
                                        <td>{ symptom.symptomName }</td>
                                        <td>{ symptom.category }</td>
                                        <td>{ symptom.belief }</td>
                                        <td>{ symptom.plausability }</td>
                                        <td className="text-center">
                                            <Button as={Link} to={`/symptom/edit/${symptom.symptomId}`} variant="primary" size="sm" className="me-2">
                                                <img src={buttonEdit} alt="Button Edit" />
                                            </Button>
                                        </td>
                                        <td className="text-center">
                                            <Button onClick={() => deleteSymptom(symptom.symptomId)} variant="danger" size="sm">
                                                <img src={buttonDelete} alt="Button Delete" />
                                            </Button>
                                        </td>
                                    </tr>
                                )) }
                                </tbody>
                            </Table>
                            <br/><br/>
                            <div>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToPage(index + 1)}
                                        disabled={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default SymptomIndex;
