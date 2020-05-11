import React from "react";
import { Container, Icon, Button, Grid } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useStateValue } from "../state";
import { addNewEntry } from "../state/reducer";
import { Patient, FormValuesEntry, Entry, newEntry } from '../types';
import EntryDetails from '../components/EntryDetails';
import AddEntryForm from "../components/AddEntryForm";
import AddHospitalEntryForm from "../components/AddHospitalEntryForm";
import AddOccHealthcareForm from "../components/AddOccHealthcareForm";
import { apiBaseUrl } from "../constants";

const generateIcon = (name: string): JSX.Element=> {
  switch(name){
    case 'male':
      return <Icon name="man"/>;
    case "female":
      return <Icon name="woman"/>;
    default:
      return <Icon name="other gender"/>;
  }
};

const PatientPage: React.FC = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = React.useState<string | undefined>();
  const [ type, setType ] = React.useState<string | undefined>("Hospital");
  const params = useParams<{ id: string }>();
  const id = params.id;
  const patient = Object.values(patients).find((patient: Patient) => patient.id === id);
  console.log(patient? patient.gender : undefined);
  if(!patient){
    return null;
  }
  const submitEntry = async (values: FormValuesEntry) => {
    let mEntry: newEntry;
    if(values.type === "Hospital"){
      mEntry = {
        type: "Hospital",
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria
        }
      };
    }
    else if( values.type === "OccupationalHealthcare"){
      mEntry = {
        type: "OccupationalHealthcare",
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        employerName: values.employerName,
        sickLeave: {
          startDate: values.startDate,
          endDate: values.endDate
        }
      };
    }
    else{
      mEntry = values;
    }
    console.log(mEntry);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        mEntry
      );
      console.log("adding...");
      dispatch(addNewEntry(newEntry, id));
    } catch (e) {
      console.log("error here");
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
  const chooseForm = () => {
    switch (type){
      case "Hospital":
        return <AddHospitalEntryForm onSubmit={ submitEntry}/>;
      case "OccupationalHealthcare":
        return <AddOccHealthcareForm onSubmit={ submitEntry }/>;
      default:
        return <AddEntryForm onSubmit={ submitEntry }/>;
    }
  };
  return (
    <div>
      <Container textAlign="center">
        <h3>{ patient ? patient.name: undefined } { generateIcon(patient.gender) }</h3>
        <h3>ssn: { patient ? patient.ssn: "none" }</h3>
        <h3>occupation: { patient ? patient.occupation: undefined }</h3>
      </Container>
      <h3>Entries</h3>
      { 
        patient.entries.map((entry, i) => {
          return <EntryDetails key={ i } entry={ entry }/>;
        })
      }
      <h3>Add new { type } entry</h3>
      <Grid>
        <Grid.Column floated="left" width={5}>
          <Button type="button" onClick={() => setType("Hospital")} color="green">
                Hospital
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button type="button" onClick={() => setType("HealthCheck")} color="green">
                HealthCheck
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={5}>
          <Button type="button" onClick={() => setType("OccupationalHealthcare")} color="green">
                OccupationalHealthcare
          </Button>
        </Grid.Column>
      </Grid>
      {chooseForm()}
    </div>
  );
};

export default PatientPage;