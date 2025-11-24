export interface DurationItem {
  id: string;
  duration: number;
}

export interface DurationListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DurationItem[];
}
