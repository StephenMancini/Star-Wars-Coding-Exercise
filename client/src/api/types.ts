export interface CharacterSummary {
  id: number
  name: string
}

export interface CharacterAttributes {
  height: string
  mass: string
  hairColor: string
  skinColor: string
  eyeColor: string
  birthYear: string
  gender: string
}

export interface Species {
  name: string
  classification: string
  designation: string
  averageHeight: string
  averageLifespan: string
  language: string
}

export interface Homeworld {
  name: string
  population: string
  terrain: string
  climate: string
  surfaceWater: string
  diameter: string
  rotationPeriod: string
  orbitalPeriod: string
  gravity: string
}

export interface Film {
  title: string
  episodeId: number
}

export interface Starship {
  name: string
  model: string
  manufacturer: string
  crew: string
  passengers: string
  starshipClass: string
}

export interface Vehicle {
  name: string
  model: string
  manufacturer: string
  crew: string
  passengers: string
  vehicleClass: string
}

export interface CharacterDetail {
  id: number
  name: string
  attributes: CharacterAttributes
  species: Species | null
  homeworld: Homeworld | null
  films: Film[]
  starships: Starship[]
  vehicles: Vehicle[]
}
