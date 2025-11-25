export interface Module {
  id: string;
  module_name: string;
  is_optional: boolean;
  questions_count: number;
  top_score: number;
  attended: number
}

export interface ModuleListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Module[];
}


export interface ModuleCreateResponse {
  id: string;
  module_name: string;
  detail?: string;
}

export interface ModuleCreateRequest {
  module_name: string;
}

// details

export interface MonthlyAccuracyItem {
  month: string;
  accuracy: number;
}

export interface ModuleQuizStatsResponse {
  module_name: string;
  quiz_attempted: number;
  average_score: number;
  top_score: number;
  monthly_accuracy: MonthlyAccuracyItem[];
}