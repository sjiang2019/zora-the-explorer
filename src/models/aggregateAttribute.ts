export interface AggregateAttribute {
  traitType: string;
  valueMetrics: Array<ValueMetric>;
}

export interface ValueMetric {
  count: number;
  percent: number;
  value: string;
}
