export interface Application {
  firstname: string;
  lastname: string;
  title: string;
  score: number;
  id: number;
  created_at: Date;
}

export interface applicationDetails {
  candidat_note: string;
  email: string;
  firstname: string;
  job_id: number;
  lastname: string;
  linkedin_url: string;
  matched_keywords: string[];
  phone_number: number;
  resume_url: string;
  score: string;
  summary: string;
  hiring_stage: string;
}
export interface applicantsPerJob {
  id: number;
  firstname: string;
  lastname: string;
  hiring_stage: string;
  score: string;
  created_at: Date;
}
