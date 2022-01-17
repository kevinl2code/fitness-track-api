import { DailyEntry } from './Model'

export class MissingFieldError extends Error {}

export function validateAsDailyEntry(arg: any) {
  if (!(arg as DailyEntry).dailyEntryId) {
    throw new MissingFieldError('Value for dailyEntryId required!')
  }
  if (!(arg as DailyEntry).date) {
    throw new MissingFieldError('Value for date required!')
  }
  if (!(arg as DailyEntry).weight) {
    throw new MissingFieldError('Value for weight required!')
  }
  if (!(arg as DailyEntry).meals) {
    throw new MissingFieldError('Value for meals required!')
  }
  if (!(arg as DailyEntry).activityLevel) {
    throw new MissingFieldError('Value for activityLevel required!')
  }
}
