import { Activity, Country } from "../store/templates";

export interface CountryCardProps {
  country: Country
}

export interface ActivityCardProps {
  activity: Activity
}

export interface LocalStorageLogin {
  email: string,
  password: string,
}

export type LocalStorageLoginOptional = Partial<LocalStorageLogin>;

export interface LocalStorageRegister extends LocalStorageLogin {
  name: string,
  surname: string,
  countryId: string
}

export type LocalStorageRegisterOptional = Partial<LocalStorageRegister>;

export interface LocalStorageActivity {
  name: string,
  difficulty: number,
  duration: string,
  season: string,
  userId: string,
  countries: string[]
}

export type LocalStorageActivityOptional = {
  name?: string,
  difficulty?: string,
  duration?: string,
  season?: string,
  userId?: string,
  countries?: string
}

export interface SearchProps {
  fnClose: () => void
}

export interface FilterProps {
  fnClose: () => void
}

export interface FilterState {
  activity: string,
  continent: string,
  name: string,
  area: string,
  population: string
}

export interface NavVisible {
  search: boolean,
  filter: boolean
}

export type AlertProps = {
  variant?: "success" | "danger" | "warning";
  children: string
}

export type UseAlert = {
  text: string;
  variant?: "success" | "danger" | "warning";
}