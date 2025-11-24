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
