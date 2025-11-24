export interface QuestionRquestion{
    module: string;
    page?: number;
}

export interface Question {
  id: string;
  module: string;
  question_text: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  order: number;
}

export interface QuestionListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Question[];
}
