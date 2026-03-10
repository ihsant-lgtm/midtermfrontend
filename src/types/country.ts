
export interface CountryFlags {
  png: string
  svg: string
}


export interface CountryCurrency {
  code: string
  name: string
  symbol: string
}


export interface CountryLanguage {
  iso639_1: string | null
  iso639_2: string
  name: string
  nativeName: string
}


export interface Country {
  name: string
  nativeName: string
  alpha3Code: string
  capital: string
  region: string
  subregion: string
  population: number
  area: number | null
  timezones: string[]
  borders: string[] | null
  flags: CountryFlags
  currencies: CountryCurrency[]
  languages: CountryLanguage[]
}


export interface Trip {
  code: string
  note: string
  attractions: string
}


