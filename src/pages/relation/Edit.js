//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import {Card, Container, Row, Col, Form, Button} from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dan params dari react router dom
import { useHistory, useParams } from "react-router-dom";
import { MDBCheckbox } from "mdb-react-ui-kit";

import configs from "../../global_config";
import Swal from "sweetalert2";

function EditRelation() {

    const url = configs.CONFIG.API_BASEURL;

    //define state
    const [illnesses, setIllnesses] = useState([]);
    const [symptoms, setSymptoms] = useState([]);

    //state
    const [illnessCode, setIllnessCode] = useState('');
    const [symptomCode, setSymptomCode] = useState([]);

    //history
    const history = useHistory();

    //get ID from parameter URL
    const { relationId } = useParams();

    //hook useEffect
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

        //panggil function "getSymptomById"
        getRelationById();

    }, []);

    const fectData = async () => {
        //fetching
        const responseIllness = await axios.get(`${url}/getIllness`);
        //get response data
        const dataIllness = await responseIllness.data.data;

        //fetching
        const responseSymptom = await axios.get(`${url}/getSymptom`);
        //get response data
        const dataSymptom = await responseSymptom.data.data;

        //assign response data to state "relations"
        setIllnesses(dataIllness);
        console.log(dataSymptom)
        setSymptoms(dataSymptom);
    }

    //function "getSymptomById"
    const getRelationById = async() => {

        //get data from server
        const response = await axios.get(`${url}/getRelation/${relationId}`);

        //get response data
        const data = await response.data.data

        let arr = [];
        let checkboxes = data.symptoms;

        for (let i = 0; i < checkboxes.length; i++) {
            arr.push(checkboxes[i].symptomCode)
        }

        console.log("arr:",arr)
        //assign data to state
        setIllnessCode(data.illness.illnessCode);
        setSymptomCode(arr);
    };

    //function "updateSymptom"
    const updateRelation = async (e) => {
        let arr = [];
        let checkboxes = document.querySelectorAll("input[type='checkbox']:checked");
        for (let i = 0; i < checkboxes.length; i++) {
            arr.push(checkboxes[i].value)
        }

        e.preventDefault();

        //send data to server
        await axios.put(`${url}/relation/${relationId}`, {
            relationId: relationId,
            symptomCode: arr
        })
            .then(() => {

                //redirect
                history.push('/relation');

            })
            .catch((error) => {

                if (error.response.data.message === 'illnessCode is not allowed to be empty') {
                    Swal.fire('Oops..', 'penyakit wajib diisi', 'error');
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
                            <Form onSubmit={ updateRelation }>
                                <Form.Group className="mb-3" controlId="formRelationIllnessEdit">
                                    <Form.Label>Pilih Penyakit</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={illnessCode} onChange={(e) => setIllnessCode(e.target.value)}>
                                        { illnesses.map(illness => (
                                            <option disabled={true} value={illness.illnessCode}>{illness.illnessName}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formRelationSymptomEdit">
                                    <Form.Label>Nama Gejala</Form.Label>
                                    {symptoms.map(symptom => (
                                        <MDBCheckbox key={symptom['relationId']} defaultChecked={symptomCode.includes(symptom.symptomCode)}
                                                     value={symptom.symptomCode} type="checkbox" label={symptom.symptomName} />
                                    ))}
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    UPDATE
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default EditRelation;
