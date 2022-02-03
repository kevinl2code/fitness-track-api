import { Category, DailyEntry } from './Model'

export class MissingFieldError extends Error {}

export function validateAsDailyEntry(arg: any) {
  if (!(arg as DailyEntry).PK) {
    throw new MissingFieldError('Value for primary key required!')
  }
  if (!(arg as DailyEntry).SK) {
    throw new MissingFieldError('Value for sort key required!')
  }
  if (!(arg as DailyEntry).GSI1PK) {
    throw new MissingFieldError('Value for GSI1PK required!')
  }
  if (!(arg as DailyEntry).GSI1SK) {
    throw new MissingFieldError('Value for GSI1SK required!')
  }
  if (!(arg as DailyEntry).type) {
    throw new MissingFieldError('Value for type required!')
  }
  if (!(arg as DailyEntry).entryDate) {
    throw new MissingFieldError('Value for date required!')
  }
  if (!(arg as DailyEntry).dailyEntryWeight) {
    throw new MissingFieldError('Value for weight required!')
  }
  if (!(arg as DailyEntry).dailyEntryMeals) {
    throw new MissingFieldError('Value for meals required!')
  }
  if (!(arg as DailyEntry).dailyEntryActivityLevel) {
    throw new MissingFieldError('Value for activityLevel required!')
  }
  if (!(arg as DailyEntry).cycleId) {
    throw new MissingFieldError('Value for cycleId required!')
  }
}

// PK: string
// SK: 'DAILYENTRY'
// GSI1PK: string
// GSI1SK: string
// type: 'DAILYENTRY'
// dailyEntryWeight: number
// dailyEntryMeals: EntryMeal[] | []
// dailyEntryActivityLevel: ActivityLevel
// cycleId: string

export function validateAsFitnessTrackCategory(arg: any) {
  if (!(arg as Category).PK) {
    throw new MissingFieldError('Value for PK required!')
  }
  if (!(arg as Category).SK) {
    throw new MissingFieldError('Value for SK required!')
  }
  if (!(arg as Category).type) {
    throw new MissingFieldError('Value for type required!')
  }
  if (!(arg as Category).name) {
    throw new MissingFieldError('Value for name required!')
  }
  if (!(arg as Category).categoryId) {
    throw new MissingFieldError('Value for categoryId required!')
  }
}
