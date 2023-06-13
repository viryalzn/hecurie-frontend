//import hook useState from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import {Card, Container, Row, Col, Form, Button} from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import { useHistory } from "react-router-dom";

import { MDBCheckbox } from "mdb-react-ui-kit";
import configs from "../../global_config";
import Swal from "sweetalert2";

function Diagnosis() {

    const url = configs.CONFIG.API_BASEURL;
    console.log(url)

    //define state
    const [symptoms, setSymptoms] = useState([]);

    //state
    const [patientName, setPatientName] = useState('');
    const [patientAge, setPatientAge] = useState('');
    const [patientGender, setPatientGender] = useState('');

    //history
    const history = useHistory();

    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    const fectData = async () => {
        //fetching
        const responseSymptom = await axios.get(`${url}/getSymptom`);
        //get response data
        const dataSymptom = await responseSymptom.data.data;

        //assign response data to state "relations"
        setSymptoms(dataSymptom);
    }

    //method "storeRelation"
    const storeRelation = async (e) => {
        let arr = [];
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        for (let i = 0; i < checkboxes.length; i++) {
            arr.push(checkboxes[i].value)
        }

        e.preventDefault();

        //send data to server
        await axios.post(`${url}/diagnosis`, {
            patientName: patientName,
            patientAge: patientAge,
            patientGender: patientGender,
            symptomCode: arr
        })
            .then((data) => {

                const patientId = data.data.data.patientId;
                //redirect
                history.push(`/diagnosis/result/${patientId}`);

            })
            .catch((error) => {

                if (error.response.data.message === 'patientName is not allowed to be empty') {
                    Swal.fire('Oops..', 'nama wajib diisi', 'error');
                } else if (error.response.data.message === 'patientAge must be a number') {
                    Swal.fire('Oops..', 'umur wajib diisi', 'error');
                } else if (error.response.data.message === 'patientGender is not allowed to be empty') {
                    Swal.fire('Oops..', 'jenis kelamin wajib diisi', 'error');
                } else if (error.response.data.message === 'symptomCode must contain at least 1 items') {
                    Swal.fire('Oops..', 'gejala wajib diisi', 'error');
                }
            })

    };

    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Form onSubmit={ storeRelation }>

                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label><b>Nama</b></Form.Label>
                                    <Form.Control type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="Masukkan Nama" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formAge">
                                    <Form.Label><b>Umur</b></Form.Label>
                                    <Form.Control type="number" value={patientAge} onChange={(e) => setPatientAge(e.target.value)} placeholder="Masukkan Umur" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGender">
                                    <Form.Label><b>Jenis Kelamin</b></Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={patientGender} onChange={(e) => setPatientGender(e.target.value)}>
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-Laki">Laki-Laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSymptom">
                                    <Form.Label><b>Gejala</b></Form.Label>
                                    { symptoms.map(symptom => (
                                        <MDBCheckbox value={symptom.symptomCode} type="checkbox" label={symptom.symptomName} />
                                    ))}
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Diagnosis
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Diagnosis;
