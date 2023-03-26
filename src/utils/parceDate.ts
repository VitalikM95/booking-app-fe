import { IRangeWithKey } from '../models'

export function parceDate(
  start: Date,
  end: Date,
  key: string
): IRangeWithKey[] {
  return [{ startDate: new Date(start), endDate: new Date(end), key }]
}
