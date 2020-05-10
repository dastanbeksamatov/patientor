import React from "react";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { Patient } from '../types';
import EntryDetails from '../components/EntryDetails';

const generateIcon = (name: string): JSX.Element=> {
  switch(name){
    case 'male':
      return <Icon name="man"/>;
    case "female":
      return <Icon name="woman"/>;
    default:
      return <Icon name="gay"/>;
  }
};

const PatientPage: React.FC = () => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const patient = Object.values(patients).find((patient: Patient) => patient.id === id);
  console.log(patient? patient.gender : undefined);
  if(!patient){
    return null;
  }
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
    </div>
  );
};

export default PatientPage;