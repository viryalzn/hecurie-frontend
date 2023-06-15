//import component Bootstrap React
import { Card, Container, Row, Col , Button } from 'react-bootstrap'
import {Link} from "react-router-dom";

function Home() {
    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                            <h3>SISTEM PAKAR UNTUK DIAGNOSIS AWAL GANGGUAN SUASANA HATI</h3>
                            <p style={{textAlign: "justify"}}> <br/> Gangguan suasana hati adalah kondisi kesehatan
                                mental yang ditandai dengan fluktuasi ekstrem dalam perasaan dan emosi seseorang.
                                Ini meliputi perasaan sedih yang berkepanjangan (depresi), perasaan sangat senang atau
                                euforia (mania), atau perubahan cepat antara kedua keadaan tersebut (gangguan bipolar).
                                Gangguan suasana hati dapat memengaruhi suasana hati, energi, perilaku, pola tidur, dan
                                konsentrasi seseorang, dan jika tidak diobati, dapat berdampak negatif pada kehidupan
                                sehari-hari dan hubungan interpersonal. <br/> </p>
                            <Button as={Link} to="/diagnosis" variant="primary" size="sm">
                                Diagnosis Gangguan Suasana Hati
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;
