import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Formik, Field, Form } from 'formik';
import { DiagnosisSelection, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Hospital } from '../types';

type HospitalEntryValues = Omit<Hospital, "id">;

interface Props {
  onSubmit: (values: HospitalEntryValues) => void;
}

const AddHealthCheckEntryForm: React.FC<Props> = ({ onSubmit }) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
    initialValues={{
      type: "Hospital",
      description: "",
      date: "",
      specialist: "",
      diagnosisCodes: [],
      dischargeDate: "",
      dischargeCriteria: ""
    }}
    onSubmit={ (values: HospitalEntryValues, { resetForm }) => {
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
      if (!values.dischargeCriteria) {
        errors.dischargeCriteria = requiredError;
      }
      if (!values.dischargeDate) {
        errors.dischargeDate = requiredError;
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
              label="dischargeDate"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Discharge Criteria"
              placeholder="dischargeCriteria"
              name="dischargeCriteria"
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

export default AddHealthCheckEntryForm;