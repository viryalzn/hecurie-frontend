//import component Bootstrap React
import {Card, Container, Row, Col, Button, CardColumns} from 'react-bootstrap'
import {Link} from "react-router-dom";

import buttonPenyakit from '../image/button-penyakit.png'
import buttonGejala from '../image/button-gejala.png'
import buttonRelasi from '../image/button-relasi.png'
import buttonRiwayat from '../image/button-riwayat.png'

function Dashboard() {

    const ImageButton = ({ imageSrc, onClick }) => {
        const buttonStyle = {
            background: `url(${imageSrc})`,
            backgroundSize: 'cover',
            width: '100px',
            height: '120px',
            border: 'none',
            cursor: 'pointer',
        };
        return <Button as={Link} to={onClick} style={buttonStyle} ></Button>;
    };

    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                            <h3>DASHBOARD ADMIN</h3>
                            <table>
                                <td style={{ width: '150px'}}>
                                    <ImageButton onClick="/illness" imageSrc={buttonPenyakit}/>
                                </td>
                                <td style={{ width: '150px'}}>
                                    <ImageButton onClick="/symptom" imageSrc={buttonGejala}/>
                                </td>
                                <td style={{ width: '150px'}}>
                                    <ImageButton onClick="/relation" imageSrc={buttonRelasi}/>
                                </td>
                                <td style={{ width: '150px'}}>
                                    <ImageButton onClick="/diagnosis/index" imageSrc={buttonRiwayat}/>
                                </td>
                            </table>
                            <CardColumns>

                            </CardColumns>
                            <CardColumns>

                            </CardColumns>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
