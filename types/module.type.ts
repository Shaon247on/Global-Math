export interface Module {
  id: string;
  module_name: string;
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