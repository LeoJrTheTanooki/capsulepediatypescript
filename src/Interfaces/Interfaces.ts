export interface IPokemon {
  // Within the JSON
  abilities: [
    {
      ability: {
        name: string;
      };
    }
  ];
  id: string;
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  name: string;
  moves: [
    {
      move: {
        name: string;
      };
    }
  ];
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };

  // Links outside the JSON
  species: {
    url: string;
  };
  location_area_encounters: string;
}

export interface ISpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: any;
  pokedex_numbers: any[];
  egg_groups: any[];
  color: any;
  shape: any;
  evolves_from_species: any;
  evolution_chain: {
    url: string;
  };
  habitat: any;
  generation: any;
  names: any[];
  pal_park_encounters: any[];
  flavor_text_entries: IFlavorText[];
  form_descriptions: any[];
  genera: any[];
  varieties: any[];
}

export interface IFlavorText {
  flavor_text: string;
  language: INamedAPIResource;
  version: INamedAPIResource;
}

export interface ILanguage {
  id: number;
  name: string;
  official: boolean;
  iso639: string;
  iso3166: string;
  names: IName[];
}

export interface IName {
  name: string;
  language: ILanguage;
}

export interface IEvolutionChain {
  id: number;
  baby_trigger_item: any;
  chain: IChainLink;
}

export interface IChainLink {
  is_baby: boolean;
  species: INamedAPIResource;
  evolution_details: any[];
  evolves_to: IChainLink[];
}

export interface ILocationAreaEncounter {
  location_area: INamedAPIResource;
  version_details: IVersionEncounterDetail[];
}

export interface IVersionEncounterDetail {
  version: any;
  max_chance: number;
  encounter_details: any[];
}

export interface IPokeProps {
  pokemonArt: string;
  pokemonDexEntry: React.ReactNode;
  pokemonName: string;
  pokemonID: string;
  pokemonType: Array<string>;
  pokemonEvolutions: React.ReactNode;
  pokemonArea: string;
  pokemonAbilities: string;
  pokemonMoves: string;
}

export interface IQueryProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  queryLink?: string;
  setQueryLink?: React.Dispatch<React.SetStateAction<string>>;
}

export interface INamedAPIResource {
  name: string;
  url: string;
}

export interface INamedAPIResourceList {
  count: number;
  next: string;
  previous: string;
  results: INamedAPIResource[];
}
