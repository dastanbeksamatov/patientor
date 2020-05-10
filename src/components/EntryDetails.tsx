import React from 'react';
import { Segment, Header, Rating, Icon } from 'semantic-ui-react';
import { Entry } from '../types';

const generateIcon = ( name: string ) => {
  switch (name){
    case "OccupationalHealthcare":
      return <Icon name="stethoscope"/>;
    default:
      return <Icon name="doctor"/>;
  }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }): JSX.Element => {
  switch(entry.type){
    case "HealthCheck":
      return (
        <Segment padded="very">
          <Header size="medium">{ entry.date } { generateIcon('doctor') }</Header>
          { entry.description }
          {<Rating icon="heart" disabled rating={4 - entry.healthCheckRating} maxRating={4} />}
        </Segment>
      );
    case "OccupationalHealthcare":
      return (
        <Segment padded="very">
          <Header size="medium">{ entry.date } { generateIcon("OccupationalHealthcare") } </Header>
          { entry.description }
          <p>Employer: { entry.employerName }</p>
      </Segment>
      );
    case "Hospital":
    return (
      <Segment padded="very">
        <Header size="medium">{ entry.date } </Header>
        { entry.description }
        <p>{ entry.discharge.criteria }</p>
    </Segment>
    );
    default:
      return <div>Not found</div>;
  }
};

export default EntryDetails;