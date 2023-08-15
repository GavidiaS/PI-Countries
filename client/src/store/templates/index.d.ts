export interface User {
  id: string,
  name: string,
  surname: string,
  email: string,
  password: string,
  CountryId: string,
}

export interface Country {
  id: string,
  name: string,
  flag: string,
  continent: string,
  capital: string,
  subregion: string,
  area: number,
  population: number
}

export interface Activity {
  id: number,
  name: string,
  difficulty: number,
  duration: string,
  season: string,
  UserId: string,
}

export interface ActivityPost {
  name: string,
  difficulty: number,
  duration: string,
  season: string,
  userId: string,
  countries: string[]
}

export interface CountryActivity {
  CoutryId: string,
  ActivityId: number
}

export interface CountryActivityList extends Country {
  CountryActivity: CountryActivity
}

export interface ActivityList extends Activity {
  Countries: CountryActivityList[]
}

export interface CountryUser extends Country {
  Activities: Activity[]
}

export interface UserLogin extends User {
  Country: CountryUser
}

export interface CountryDetail extends Country {
  Activities: Activity[],
  Users: User[]
}

export interface ActivityDetail extends Activity {
  User: User,
  Countries: Country[]
}

export interface UserState {
  access: boolean,
  user: UserLogin | null,
  message: string,
  loading: boolean,
  error: string | null
}

export interface CountriesState {
  page: number,
  country: CountryDetail | null,
  countries: Country[],
  countriesOrigin: Country[],
  message: string,
  loading: boolean,
  error: string | null
}

export interface ActivitiesState {
  page: number,
  activity: ActivityDetail | null,
  activities: ActivityList[],
  message: string
  loading: boolean,
  error: string | null
}

export interface DataFulfilledLogin {
  access?: boolean,
  user?: UserLogin,
  message?: string
}

export interface DataFulfilledRegister {
  successfully?: string,
  message?: string
}

export type MessageObject = {
  message: string
}

export type DataFulfilledActivity = ActivityList[] | MessageObject

export type DataFulfilledCountries = Country[] | MessageObject

export interface PayloadCountryActivity {
  activity: number,
  activities: ActivityList[]
}