// Описание структуры флагов страны из API Rest Countries
export interface CountryFlags {
  png: string
  svg: string
}

// Описание валюты страны
export interface CountryCurrency {
  code: string
  name: string
  symbol: string
}

// Описание языка, на котором говорят в стране
export interface CountryLanguage {
  iso639_1: string | null
  iso639_2: string
  name: string
  nativeName: string
}

// Базовый интерфейс страны, используемый во всём приложении
export interface Country {
  name: string
  nativeName: string
  alpha3Code: string
  capital: string
  region: string
  population: number
  area: number | null
  flags: CountryFlags
  currencies: CountryCurrency[]
  languages: CountryLanguage[]
}

