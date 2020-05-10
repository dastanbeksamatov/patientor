import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { useStateValue, setDiagnosisList } from "./state";
import { setPatientList } from "./state";
import { Patient, DiagnoseEntry } from "./types";

import PatientListPage from "./PatientListPage";
import PatientPage from './PatientPage';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        const { data: diagnosisListFromApi } = await axios.get<DiagnoseEntry[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setPatientList(patientListFromApi));
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);
  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" component={ PatientPage }/>
          </Switch>
          <Switch>
            <Route exact path="/patients" component={ PatientListPage } />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
