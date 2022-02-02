export interface EntryMeal {
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

// export interface DailyEntry {
//   dailyEntryId: string
//   sub: string
//   date: string
//   weight: number
//   meals: Meal[] | []
//   activityLevel: ActivityLevel
// }

//Sort key should be the word cycle followed by three numbers starting at 000
//For example, "cycle000"
// export interface FitnessTrackUserCycle {
//   userId: string
//   sortKey: string
//   cycleType: CycleType
//   cycleStartingWeight: number
//   cycleGoalWeight: number
//   cycleStartDate: string
//   cycleDuration: number
// }

//PK should be the users ID -- cognito sub value
//GSI2PK should be in format C_cycleId
export interface Cycle {
  PK: string
  SK: 'CYCLE'
  GSI2PK: string
  GSI2SK: 'METADATA'
  type: 'CYCLE'
  cycleType: CycleType
  startingWeight: number
  endingWeight: number | null
  goalWeight: number
  startDate: string
  endingDate: string | null
  duration: number
  isActive: boolean
  cycleId: string
}

//Sortkey should be the entry date, written using ISO 8601 strings such as 20190823
// export interface FitnessTrackUserDailyEntry {
//   userId: string
//   sortKey: string
//   dailyEntryWeight: number
//   dailyEntryMeals: Meal[] | []
//   dailyEntryActivityLevel: ActivityLevel
// }

//PK should be the users ID -- cognito sub value
//GSI1PK should be in format C_cycleId
//GSI1SK should be the entry date, written using ISO 8601(yyyymmdd) strings such as 20190823
export interface DailyEntry {
  PK: string
  SK: 'DAILYENTRY'
  GSI1PK: string
  GSI1SK: string
  type: 'DAILYENTRY'
  dailyEntryWeight: number
  dailyEntryMeals: EntryMeal[] | []
  dailyEntryActivityLevel: ActivityLevel
  entryDate: string
  cycleId: string
}

export type CategoryNames =
  | 'MEAT'
  | 'FRUIT'
  | 'VEGETABLES'
  | 'STARCHES'
  | 'DAIRY'
  | 'BEVERAGES'
  | 'ALCOHOL'
  | 'RESTAURANTS'
  | 'SNACKS'

export type SubCategoryNames =
  | MeatSubs
  | FruitSubs
  | VegetablesSubs
  | StarchesSubs
  | DairySubs
  | BeveragesSubs
  | AlcoholSubs
  | RestaurantsSubs
  | SnacksSubs

export type MeatSubs = 'BEEF' | 'LAMB' | 'PORK' | 'CHICKEN' | 'FISH'
export type FruitSubs = 'COMMON' | 'MELON' | 'CITRUS' | 'TROPICAL'
export type VegetablesSubs = 'COMMON' | 'UNCOMMON' | 'STARCHY'
export type StarchesSubs = 'BREAD' | 'RICE' | 'PASTA' | 'POTATOS'
export type DairySubs = 'MILK' | 'CHEESE' | 'YOGURT' | 'ETC'
export type BeveragesSubs = 'SODA' | 'JUICE' | 'SPORT' | 'ENERGY'
export type AlcoholSubs = 'BEER' | 'WINE' | 'SPIRITS'
export type RestaurantsSubs = 'INANDOUT' | 'JERSEYMIKES' | 'PANDAEXPRESS'
export type SnacksSubs = 'CHIPS' | 'NUTS' | 'JERKEY' | 'CANDY'

export type FoodItemUnits = 'GRAMS' | 'OUNCES' | 'EACH'

//SK is string formatted as C_categoryId
export interface Category {
  PK: 'CATEGORIES'
  SK: string
  type: 'CATEGORY'
  name: CategoryNames
  categoryId: string
}

//SK is string formatted as S_subCategoryId
//GSI2PK should be in format C_categoryId
export interface SubCategory {
  PK: 'SUBCATEGORIES'
  SK: string
  GSI2PK: string
  GSI2SK: 'METADATA'
  type: 'SUBCATEGORY'
  name: SubCategoryNames
  categoryId: string
  subCategoryId: string
}

//PK should be in format F_foodItemId
//GSI1PK should be in format C_categoryId
//GSI1SK should be in format S_subCategoryId
export interface FitnessTrackFoodItem {
  PK: string
  SK: 'METADATA'
  GSI1PK: string
  GSI1SK: string
  type: 'FOOD'
  foodItemName: string
  foodItemUnit: FoodItemUnits
  servingSize: number
  calories: number
  protein: number
  fat: number
  carbohydrates: number
  categoryId: string
  subCategoryId: string
  foodItemId: string
}
