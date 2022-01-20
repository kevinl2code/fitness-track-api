export interface Meal {
  name: string
  calories: number
  protein: number
}

export type CycleType = 'CUT' | 'BULK' | 'MAINTAIN'

export type ActivityLevel =
  | 'SEDENTARY'
  | 'LIGHTLY_ACTIVE'
  | 'MODERATELY_ACTIVE'
  | 'VERY_ACTIVE'
  | 'EXTRA_ACTIVE'

export interface DailyEntry {
  dailyEntryId: string
  sub: string
  date: string
  weight: number
  meals: Meal[] | []
  activityLevel: ActivityLevel
}

//Sort key should be the word cycle followed by three numbers starting at 000
//For example, "cycle000"
export interface FitnessTrackUserCycle {
  userId: string
  sortKey: string
  cycleType: CycleType
  cycleStartingWeight: number
  cycleGoalWeight: number
  cycleStartDate: string
  cycleDuration: number
}

//Sortkey should be the entry date, written using ISO 8601 strings such as 20190823
export interface FitnessTrackUserDailyEntry {
  userId: string
  sortKey: string
  dailyEntryWeight: number
  dailyEntryMeals: Meal[] | []
  dailyEntryActivityLevel: ActivityLevel
}
