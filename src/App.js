import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//import component Bootstrap React
import { Navbar, Container, Nav } from 'react-bootstrap'

//import react router dom
import {Switch, Route, Link, BrowserRouter, useHistory} from "react-router-dom";

import logo from './image/logo.png'

//import component Home
import Home from './pages/Home'

import Dashboard from "./pages/Dashboard";

//import component Post Index
import IllnessIndex from './pages/illness/Index'

//import component Post Create
import IllnessCreate from './pages/illness/Create'

//import component Post Edit
import IllnessEdit from './pages/illness/Edit'

//import component Post Index
import SymptomIndex from './pages/symptom/Index'

//import component Post Create
import SymptomCreate from './pages/symptom/Create'

//import component Post Edit
import SymptomEdit from './pages/symptom/Edit'

//import component Post Index
import RelationIndex from './pages/relation/Index'

//import component Post Create
import RelationCreate from './pages/relation/Create'

//import component Post Edit
import RelationEdit from './pages/relation/Edit'

//import component Post Index
import CreateDiagnosis from './pages/diagnosis/Create'

//import component Post Create
import DiagnosisResult from './pages/diagnosis/Result'

//import component Post Diagnosis
import Diagnosis from './pages/diagnosis/Diagnosis'

//import component Post Edit
import DiagnosisEdit from './pages/diagnosis/Edit'

import DiagnosisIndex from "./pages/diagnosis/Index";

import Login from './pages/user/Login'

import About from "./pages/information/About";

import InformationIllness from "./pages/information/Illness";

const App = ( { isAdmin } ) => {

    const history = useHistory();

    const storeSymptom = async (e) => {
        e.preventDefault();

        ReactDOM.render(
            <React.StrictMode>
                <BrowserRouter>
                    <App isAdmin={false} />
                </BrowserRouter>
            </React.StrictMode>,
            document.getElementById('root')
        );
        history.push('/')
    };

    console.log(isAdmin)
    return (
        <div>
            <Navbar collapseOnSelect expand="lg"
                    style={{ backgroundColor: '#FFCEFE', position:"fixed", top: 0, width: '100%', zIndex: 9999 }}
                    variant="light">
                <Container>
                    <img src={logo} width="50" height="50" alt="..."/>
                    <Navbar.Brand to="/">H`ECURIE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {
                                isAdmin? (
                                    <>
                                        <Nav.Link as={Link} to="/dashboard" className="nav-link">Dashboard</Nav.Link>
                                        <Nav.Link as={Link} to="/illness" className="nav-link">Penyakit dan Solusi</Nav.Link>
                                        <Nav.Link as={Link} to="/symptom" className="nav-link">Gejala</Nav.Link>
                                        <Nav.Link as={Link} to="/relation" className="nav-link">Relasi</Nav.Link>
                                        <Nav.Link as={Link} to="/diagnosis/index" className="nav-link">Riwayat Hasil Diagnosis</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/" className="nav-link">Beranda</Nav.Link>
                                        <Nav.Link as={Link} to="/diagnosis" className="nav-link">Diagnosis Gangguan Suasana Hati</Nav.Link>
                                        <Nav.Link as={Link} to="/about/illness" className="nav-link">Informasi Gangguan Suasana Hati</Nav.Link>
                                        <Nav.Link as={Link} to="/about" className="nav-link">Tentang Aplikasi</Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                        <Nav className="nav navbar-nav navbar-right">
                            {
                                isAdmin? (
                                    <>
                                        <Nav.Link onClick={storeSymptom} class="button">LOGOUT</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/login" class="button">LOGIN</Nav.Link>
                                    </>
                                )
                            }
                            {/*<button className="btn btn-outline-secondary navbar-btn" to="/login">Login</button>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/about" component={About} />
                <Route exact path="/about/illness" component={InformationIllness} />
                <Route exact path="/illness" component={IllnessIndex} />
                <Route exact path="/illness/create" component={IllnessCreate} />
                <Route exact path="/illness/edit/:illnessId" component={IllnessEdit} />
                <Route exact path="/symptom" component={SymptomIndex} />
                <Route exact path="/symptom/create" component={SymptomCreate} />
                <Route exact path="/symptom/edit/:symptomId" component={SymptomEdit} />
                <Route exact path="/relation" component={RelationIndex} />
                <Route exact path="/relation/create" component={RelationCreate} />
                <Route exact path="/relation/edit/:relationId" component={RelationEdit} />
                <Route exact path="/diagnosis" component={CreateDiagnosis} />
                <Route exact path="/diagnosis/index" component={DiagnosisIndex} />
                <Route exact path="/diagnosis/result/:patientId" component={DiagnosisResult} />
                <Route exact path="/diagnosis/diagnosis/:patientId" component={DiagnosisResult} />
                <Route exact path="/diagnosis/edit/:patientId" component={DiagnosisEdit} />
                <Route exact path="/login" component={Login} />
            </Switch>

        </div>
    );
}

export default App;
