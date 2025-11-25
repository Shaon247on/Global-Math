export interface StudentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Student[];
}
export interface StudentListRequest {
  page?: number;
  order_by?: "xp" | "quiz_attempts" | "active_subjects";
  duration?: "daily" | "weekly" | "monthly" | "yearly";
  search?: string;
}

export interface Student {
  id: string;
  email: string;
  profile_pic: string | null;
  full_name: string;
  quiz_attempts: number;
  xp: number;
  active_subjects: number;
}

export interface StudentDetailsResponse {
  profile: StudentInfo;
  monthly_accuracy: MonthlyPerformance[];
  subject_performance: SubjectWisePerformance[];
  quiz_statistics: QuizSummary;
}

// student details interfaces

export interface StudentInfo {
  full_name: string;
  email: string;
  profile_pic: string | null;
  xp: number;
  rank: number;
}

export interface MonthlyPerformance {
  month: string;
  value: number; // performance score / accuracy
}

export interface SubjectWisePerformance {
  subject: string;
  accuracy: number;
}

export interface QuizSummary {
  quiz_attempted: number;
  average_score: number;
  subject_covered: number;
}
