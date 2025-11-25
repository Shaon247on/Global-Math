export interface SynopticModuleResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SynopticModuleResult[];
}

export interface SynopticModuleResult {
  id: string;
  modules: SynopticModuleItem[];
}

export interface SynopticModuleItem {
  id: string;
  module_name: string;
}
