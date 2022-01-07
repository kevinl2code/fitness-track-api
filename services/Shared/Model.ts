export interface Meal {
  calories: number
  protein: number
}

export type ActivityLevel =
  | 'SEDENTARY'
  | 'LIGHTLY_ACTIVE'
  | 'MODERATELY_ACTIVE'
  | 'VERY_ACTIVE'
  | 'EXTRA_ACTIVE'

export interface DailyEntry {
  dailyEntryId: string
  date: Date
  weight: number
  meals: Meal[] | []
  activityLevel: ActivityLevel
}
