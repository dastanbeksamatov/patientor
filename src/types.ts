export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthRating {
  "Healthy"=0,
  "LowRisk"=1,
  "HighRisk"=2,
  "CriticalRisk"=2,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthRating;
}

interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcare extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcare;
export type newEntry = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcare, "id">;

export interface Occupation extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  endDate: string;
  startDate: string;
}

export interface Hospital extends BaseEntry {
  type: "Hospital";
  dischargeDate: string;
  dischargeCriteria: string;
}

export type FormValuesEntry = Omit<HealthCheckEntry, "id"> | Omit<Occupation, "id"> | Omit<Hospital, "id">;


export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}