//import hook useState from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import {Card, Container, Row, Col, Form, Button} from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dari react router dom
import {useHistory, useParams} from "react-router-dom";

import { MDBCheckbox } from "mdb-react-ui-kit";
import configs from "../../global_config";
import Swal from "sweetalert2";

function Diagnosis() {

    const url = configs.CONFIG.API_BASEURL;
    console.log(url)

    //define state
    const [symptoms, setSymptoms] = useState([]);
    let [category, setCategory] = useState([]);

    //get ID from parameter URL
    const { patientId } = useParams();

    //history
    const history = useHistory();

    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    const fectData = async () => {
        let categoryC = 0;
        let categoryD = 0;

        //fetching
        const responseSymptom = await axios.get(`${url}/getSymptom`);
        const responsePatient = await axios.get(`${url}/getDiagnosis/${patientId}`);
        //get response data
        const dataSymptom = await responseSymptom.data.data;
        const patientSymptoms = await responsePatient.data.data.patientDepresifSymptom;

        //assign response data to state "relations"
        setSymptoms(dataSymptom);

        await Promise.all(patientSymptoms.map(async symptom => {
            if (symptom === 'G12' || symptom === 'G13' || symptom === 'G14') {
                categoryC++;
            } else if (symptom === 'G15' || symptom === 'G16' || symptom === 'G17' ||
                symptom === 'G18' || symptom === 'G19' || symptom === 'G20' || symptom === 'G21') {
                categoryD++;
            }
        }));

        if (categoryC < 2 && categoryD < 2) {
            setCategory(['A', 'B', 'G', 'I']);
        } else {
            setCategory(['A', 'E', 'F', 'H']);
        }
    }

    //method "storeRelation"
    const storeDiagnosis = async (e) => {
        let arr = [];
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        for (let i = 0; i < checkboxes.length; i++) {
            arr.push(checkboxes[i].value)
        }

        e.preventDefault();

        //send data to server
        await axios.put(`${url}/diagnosis/${patientId}`, {
            patientId: patientId,
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
                            <Form onSubmit={ storeDiagnosis }>
                                {/*<Form.Group className="mb-3" controlId="formSymptom">*/}
                                {/*    <Form.Label><b>Gejala</b></Form.Label>*/}
                                {/*    { symptoms.map(symptom => (*/}
                                {/*        <MDBCheckbox value={symptom.symptomCode} type="checkbox" label={symptom.symptomName} />*/}
                                {/*    ))}*/}
                                {/*</Form.Group>*/}

                                <Form.Group className="mb-3" controlId="formSymptom">
                                    <Form.Label><b>Gejala</b></Form.Label>
                                    { symptoms.map(symptom => {
                                        for (var c in category) {
                                            if (symptom.category === category[c]) {
                                                return <MDBCheckbox value={symptom.symptomCode} type="checkbox" label={symptom.symptomName} />
                                            }
                                        }
                                    })}
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
