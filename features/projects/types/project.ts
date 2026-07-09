export type Project = {
  id: string;

  project_code: string;

  project_name: string;

  status: string;

  current_contract_value: number;

  start_date: string | null;

  finish_date: string | null;
};