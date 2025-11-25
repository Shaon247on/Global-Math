export interface DashboardStatsResponse {
  student_stats: StudentStats;
  quiz_stats: QuizStats;
  average_accuracy: AverageAccuracy[];
  subject_performance: SubjectPerformance[];
}

export interface StudentStats {
  total_students: number;
  new_students: number;
  active_students: number;
  inactive_students: number;
}

export interface QuizStats {
  total_subjects: number;
  quiz_participants: number;
}

export interface AverageAccuracy {
  month: string;   // e.g. "20:00"
  value: number;   // accuracy score
}

export interface SubjectPerformance {
  subject: string;
  accuracy: number;
}
