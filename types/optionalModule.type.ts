export interface OptionModuleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OptionModule[];
}

export interface OptionModule {
  id: string;
  module_a: string;
  module_b: string;
  pair_number: number;
}

export interface OptionModuleCreateRequest {
  module_a: string;
  module_b: string;
}
