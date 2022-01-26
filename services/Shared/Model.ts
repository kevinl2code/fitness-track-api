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

export type SubCategory = {
  name: SubCategories
  subCategoryId: string
}

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

//SK is string formatted as C#<categoryId>
export interface Categories {
  PK: 'CATEGORIES'
  SK: string
  type: 'CATEGORY'
  name: CategoryNames
  subCategories: {
    name: MeatSubs
    subCategoryId: string
  }[]
  categoryId: string
}

//SK is string formatted as S#<subCategoryId>
export interface SubCategories {
  PK: 'SUBCATEGORIES'
  SK: string
  type: 'SUBCATEGORY'
  name: SubCategoryNames
  subCategoryId: string
}

//PK should be in format F#<foodItemId>
//GSI1PK should be in format C#<categoryId>
//GSI1SK should be in format S#<subCategoryId>#F#<foodItemId>
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
  categoryId: string
  subCategoryId: string
  foodItemId: string
}
