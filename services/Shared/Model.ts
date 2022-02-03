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

//PK should be the users ID -- cognito sub value
//SK should be in format C_cycleId
//GSI2PK should be in format U_userId
export interface Cycle {
  PK: string
  SK: string
  GSI2PK: string
  GSI2SK: 'CYCLES'
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

//PK should be the users ID -- cognito sub value
//SK should be the entry date, written using ISO 8601(yyyymmdd) strings such as 20190823
//GSI1PK should be in format C_cycleId
//GSI1SK should be the entry date, written using ISO 8601(yyyymmdd) strings such as 20190823
export interface DailyEntry {
  PK: string
  SK: string
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
