//import component Bootstrap React
import { Navbar, Container, Nav } from 'react-bootstrap'

//import react router dom
import { Switch, Route, Link } from "react-router-dom";

//import component Home
import Home from './pages/Home'

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
import DiagnosisIndex from './pages/diagnosis/Create'

//import component Post Create
import DiagnosisResult from './pages/diagnosis/Result'

//import component Post Edit
import DiagnosisEdit from './pages/diagnosis/Edit'

import Login from './pages/user/Login'

function App() {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <img src="../public/logo-hecurie.png" alt="..."/>
                    <Navbar.Brand to="/">H`ECURIE</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" className="nav-link">HOME</Nav.Link>
                            <Nav.Link as={Link} to="/illness" className="nav-link">PENYAKIT DAN SOLUSI</Nav.Link>
                            <Nav.Link as={Link} to="/symptom" className="nav-link">GEJALA</Nav.Link>
                            <Nav.Link as={Link} to="/relation" className="nav-link">RELASI</Nav.Link>
                            <Nav.Link as={Link} to="/diagnosis" className="nav-link">DIAGNOSIS</Nav.Link>
                        </Nav>
                        <Nav className="nav navbar-nav navbar-right">
                            <Nav.Link as={Link} to="/login" class="button">LOGIN</Nav.Link>
                            {/*<button className="btn btn-outline-secondary navbar-btn" to="/login">Login</button>*/}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/illness" component={IllnessIndex} />
                <Route exact path="/illness/create" component={IllnessCreate} />
                <Route exact path="/illness/edit/:illnessId" component={IllnessEdit} />
                <Route exact path="/symptom" component={SymptomIndex} />
                <Route exact path="/symptom/create" component={SymptomCreate} />
                <Route exact path="/symptom/edit/:symptomId" component={SymptomEdit} />
                <Route exact path="/relation" component={RelationIndex} />
                <Route exact path="/relation/create" component={RelationCreate} />
                <Route exact path="/relation/edit/:relationId" component={RelationEdit} />
                <Route exact path="/diagnosis" component={DiagnosisIndex} />
                <Route exact path="/diagnosis/result/:patientId" component={DiagnosisResult} />
                <Route exact path="/diagnosis/edit/:patientId" component={DiagnosisEdit} />
                <Route exact path="/login" component={Login} />
            </Switch>

        </div>
    );
}

export default App;
