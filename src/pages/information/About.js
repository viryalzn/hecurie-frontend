//import component Bootstrap React
import { Card, Container, Row, Col } from 'react-bootstrap'

function About() {
    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body className="p-4">
                            <h4>Tentang Aplikasi</h4>
                            <br/>
                            <h6>Penjelasan Aplikasi</h6>
                            <p>H’écurie merupakan sistem pakar yang membantu pengguna dalam melakukan diagnosis awal gangguan suasana hati berdasarkan gejala-gejala yang terdapat pada Pedoman Penggolongan Diagnosis Gangguan Jiwa (PPDGJ).</p>
                            <br/>
                            <h6>Tata Cara Penggunaan Aplikasi</h6>
                            <p>
                                <li>Menu <b>“Diagnosis Gangguan Suasana Hati”</b> merupakan menu dimana pengguna ingin mendiagnosis gangguan suasana hati berdasarkan gejala-gejala yang dialami.</li>
                                <li>Menu <b>“Informasi Gangguan Suasana Hati”</b> merupaka menu yang memberikan informasi mengenai pengertian gangguan suasana hati, jenis-jenis gangguan suasana hati, dan gejala umum gangguan suasana hati.</li>
                                <li>Menu <b>“Login”</b> hanya untuk admin.</li>
                            </p>
                            <br/>
                            <h6>Batasan Sistem</h6>
                            <p>
                                <li>Sistem pakar ini dibuat hanya untuk mendiagnosis gangguan suasana hati yang berdasarkan Pedoman Penggolongan Diagnosis Gangguan Jiwa (PPDGJ).</li>
                                <li>Gejala-gejala yang terdapat pada sistem merupakan data gejala yang sudah divalidasi oleh pakar dan berdasarkan Pedoman Penggolongan Diagnosis Gangguan Jiwa (PPDGJ)</li>
                                <li>Hasil dari sistem pakar ini berupa persentasi dari jenis gangguan suasana hati yang dialami pasien dan memberikan solusi penangan awal</li>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default About;
