//import hook useState dan useEffect from react
import { useState, useEffect } from 'react';

//import react router dom
import { Link } from "react-router-dom";

//import component Bootstrap React
import { Card, Container, Row, Col, Button, Table } from 'react-bootstrap';

//import axios
import axios from 'axios';

function PostIndex() {

    //define state
    const [posts, setPosts] = useState([]);

    //useEffect hook
    useEffect(() => {

        //panggil method "fetchData"
        fectData();

    }, []);

    //function "fetchData"
    const fectData = async () => {
        //fetching
        const response = await axios.get('http://localhost:9023/getIllness');
        //get response data
        const data = await response.data.data;

        //assign response data to state "posts"
        setPosts(data);
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col md="{12}">
                    <Card className="border-0 rounded shadow-sm">
                        <Card.Body>
                            <Button as={Link} to="/posts/create" variant="success" className="mb-3">TAMBAH POST</Button>
                            <Table striped bordered hover className="mb-1">
                                <thead>
                                <tr>
                                    <th>NO.</th>
                                    <th>Nama Penyakit</th>
                                    <th>Definisi</th>
                                    <th>Solusi</th>
                                    <th>AKSI</th>
                                </tr>
                                </thead>
                                <tbody>
                                { posts.map((post, index) => (
                                    <tr key={ post.illnessId }>
                                        <td>{ index + 1 }</td>
                                        <td>{ post.illnessName }</td>
                                        <td>{ post.explanation }</td>
                                        <td>{ post.solution }</td>
                                        <td className="text-center">
                                            <Button as={Link} to={`/posts/edit/${post.illnessId}`} variant="primary" size="sm" className="me-2">EDIT</Button>
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

export default PostIndex;
