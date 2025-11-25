export interface QuestionItem {
  id: string;
  module: string;
  question_text: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_answer: "option1" | "option2" | "option3" | "option4";
  order: number;
}

export interface QuestionListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: QuestionItem[];
}


export interface CreateQuestionRequest {
  module: string;
  question_text: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_answer: "option1" | "option2" | "option3" | "option4";
}
