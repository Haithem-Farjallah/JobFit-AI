export interface Job {
  job_id?: number;
  title: string;
  experience_level: string;
  work_type: string;
  expiration_date: string;
}
export interface JobDetails extends Job {
  description: string;
  skills: string[];
  min_salary: number;
  max_salary: number;
  created_at: Date;
  firstname: string;
  lastname: string;
  image_url: string;
  email: string;
  phone_number: string;
}

export interface RhJobs {
  job_id: number;
  title: string;
  experience_level: string;
  work_type: string;
  expiration_date: string;
  created_at: Date;
  application_count: number;
}
