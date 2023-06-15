//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import component Bootstrap React
import { Card, Container, Row, Col , Form, Button } from 'react-bootstrap';

//import axios
import axios from 'axios';

//import hook history dan params dari react router dom
import { useHistory, useParams } from "react-router-dom";

import configs from "../../global_config";
import Swal from "sweetalert2";

function EditIllness() {

    const url = configs.CONFIG.API_BASEURL;

    //state
    const [illnessName, setIllnessName] = useState('');
    const [illnessCategory, setIllnessCategory] = useState('');
    const [explanation, setExplanation] = useState('');
    const [solution, setSolution] = useState('');

    //history
    const history = useHistory();

    //get ID from parameter URL
    const { illnessId } = useParams();

    console.log(illnessId)

    //hook useEffect
    useEffect(() => {

        //panggil function "getIllnessById"
        getIllnessById();

    }, []);

    //function "getIllnessById"
    const getIllnessById = async() => {

        //get data from server
        const response = await axios.get(`${url}/getIllness/${illnessId}`);
        console.log(response)
        //get response data
        const data = await response.data.data

        //assign data to state
        setIllnessName(data.illnessName);
        setExplanation(data.explanation);
        setSolution(data.solution);

    };

    //function "updateIllness"
    const updateIllness = async (e) => {
        e.preventDefault();

        //send data to server
        await axios.put(`${url}/illness/${illnessId}`, {
            illnessId: illnessId,
            illnessName: illnessName,
            illnessCategory: illnessCategory,
            explanation: explanation,
            solution: solution
        })
            .then(() => {

                //redirect
                history.push('/illness');

            })
            .catch((error) => {

                if (error.response.data.message === 'illnessName is not allowed to be empty') {
                    Swal.fire('Oops..', 'nama penyakit wajib diisi', 'error');
                } else if (error.response.data.message === 'illnessCategory is not allowed to be empty') {
                    Swal.fire('Oops..', 'kategori penyakit wajib diisi', 'error');
                } else if (error.response.data.message === 'explanation is not allowed to be empty') {
                    Swal.fire('Oops..', 'definisi penyakit wajib diisi', 'error');
                } else if (error.response.data.message === 'solution is not allowed to be empty') {
                    Swal.fire('Oops..', 'solusi penyakit wajib diisi', 'error');
                }
            })

    };

    return (
        <Container className="mt-3" style={{ paddingTop: '70px'}}>
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Form onSubmit={ updateIllness }>
                                <Form.Group className="mb-3" controlId="formIllnessNameEdit">
                                    <Form.Label>Nama Penyakit</Form.Label>
                                    <Form.Control type="text" value={illnessName} onChange={(e) =>
                                        setIllnessName(e.target.value)} placeholder="Masukkan Nama Penyakit" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formIllnessCategoryEdit">
                                    <Form.Label>Kategori Penyakit</Form.Label>
                                    <Form.Control type="text" value={illnessCategory} onChange={(e) =>
                                        setIllnessCategory(e.target.value)} placeholder="Masukkan Kategori Penyakit" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formExplanationEdit">
                                    <Form.Label>Definisi</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={explanation} onChange={(e) =>
                                        setExplanation(e.target.value)} placeholder="Masukkan Definisi" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formSolutionEdit">
                                    <Form.Label>Solusi</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={solution} onChange={(e) =>
                                        setSolution(e.target.value)} placeholder="Masukkan Solusi" />
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

export default EditIllness;
