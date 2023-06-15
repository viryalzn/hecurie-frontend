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
    const [currentPage, setCurrentPage] = useState(1);

    // Logic to calculate the total number of pages
    const totalPages = Math.ceil(illnesses.length / 5);

    // Logic to slice the data based on the current page
    const indexOfLastItem = currentPage * 5;
    const indexOfFirstItem = indexOfLastItem - 5;
    const currentItems = illnesses.slice(indexOfFirstItem, indexOfLastItem);

    // Function to handle page navigation
    const goToPage = (page) => {
        setCurrentPage(page);
    };

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
                                    <th>Nama Penyakit</th>
                                    <th style={{width: "300px"}}>Definisi</th>
                                    <th>Solusi</th>
                                </tr>
                                </thead>
                                <tbody>
                                { currentItems.map((illness, index) => (
                                    <tr key={ illness.illnessId }>
                                        <td>{ indexOfFirstItem + index + 1 }</td>
                                        <td>{ illness.illnessName }</td>
                                        <td>{ illness.explanation }</td>
                                        <td>{ illness.solution.split('\n').map( solution => (
                                            <tr>{ solution }</tr>
                                        )) }</td>
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

export default InformationIllness;
