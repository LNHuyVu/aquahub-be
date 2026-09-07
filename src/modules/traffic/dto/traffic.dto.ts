export class RecordTrafficDto {
  path: string;
  referrer?: string;
  userId?: string;
}

export class TrafficQueryDto {
  period?: 'today' | '7days' | '30days' | 'all';
}
