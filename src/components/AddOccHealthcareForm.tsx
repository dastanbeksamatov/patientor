import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Field, Form } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Occupation } from '../types';

type OccupationalHealthcareEntryValues = Omit<Occupation, "id">;

interface Props {
  onSubmit: (values: OccupationalHealthcareEntryValues) => void;
}

const AddOccHealthcareForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: "OccupationalHealthcare",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      employerName: "",
      endDate: "",
      startDate: ""
    }}
    onSubmit={ (values: OccupationalHealthcareEntryValues, { resetForm }) => {
      onSubmit(values);
      resetForm({});
    }}
    validate={values => {
      const requiredError = "Field is required";
      const errors: { [field: string]: string } = {};
      if (!values.description) {
        errors.description = requiredError;
      }
      if (!values.date) {
        errors.date = requiredError;
      }
      if (!values.specialist) {
        errors.specialist = requiredError;
      }
      if (!values.startDate) {
        errors.startDate = requiredError;
      }
      if (!values.endDate) {
        errors.endDate = requiredError;
      }
      return errors;
    }}
  >
    {({ isValid, dirty, setFieldValue, setFieldTouched }) => {

      return (
        <Form className="form ui">
          <Field
              label="Description"
              placeholder="description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="employerName"
              placeholder="Employer Name"
              name="employerName"
              component={TextField}
            />
            <Field
              label="startDate"
              placeholder="YYYY-MM-DD"
              name="startDate"
              component={TextField}
            />
            <Field
              label="endDate"
              placeholder="YYYY-MM-DD"
              name="endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};

export default AddOccHealthcareForm;