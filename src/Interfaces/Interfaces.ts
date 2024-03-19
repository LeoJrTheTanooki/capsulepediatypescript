export interface Ipokemon {
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

export interface Ispecies {
  evolution_chain: {
    url: string;
  };
}

export interface Ievolution {
  chain: {
    // stage 1
    species: {
      name: string;
    };
    evolves_to: [
      {
        // stage 2
        species: {
          name: string;
        };

        evolves_to: [
          // stage 3
          {
            species: {
              name: string;
            };
          }
        ];
      }
    ];
  };
}

export interface Iarea {
  location_area: { name: string };
}

export interface IpokeProps {
  pokemonArt: string;
  pokemonDexEntry: string;
  pokemonName: string;
  pokemonID: string;
  pokemonType: string;
  pokemonEvolutions: string;
  pokemonArea: string;
  pokemonAbilities: string;
  pokemonMoves: string;
}
