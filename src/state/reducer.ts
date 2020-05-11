import { State } from "./state";
import { Patient, DiagnoseEntry, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: DiagnoseEntry[];
    }
  | {
      type: "ADD_NEW_ENTRY";
      patientId: string;
      payload: Entry;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis}),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_NEW_ENTRY":
      const patient = Object.values(state.patients).find(p => p.id === action.patientId);
      if(patient){
        console.log("adding to ", patient);
        patient.entries.push(action.payload);
        console.log(patient.entries);
        return {
          ...state,
          patients: {
            ...Object.values(state.patients).reduce((memo, p) => ({
              ...memo, [p.id]: p.id !== patient.id ? p : patient
            }), {})
          }
        };
      }
      else{
        console.log("undefined");
        return state;
      }
    default:
      return state;
  }
};

export const setPatientList = (data: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: data
  };
};

export const addPatient = (data: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: data
  };
};

export const setDiagnosisList = (data: DiagnoseEntry[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: data
  };
};

export const addNewEntry = (data: Entry, id: string): Action => {
  return {
    type: 'ADD_NEW_ENTRY',
    patientId: id,
    payload: data
  };
};