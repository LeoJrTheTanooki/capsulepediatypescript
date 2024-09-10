import React, { useEffect, useState } from "react";
import { IPokeProps, IPokemon } from "../Interfaces/Interfaces";
import { apiFetch } from "../Dataservices/DataServices";
import DexFetchComponent from "./DexFetchComponent";

const UnovaDexComponent = () => {
  const pokeDefault: IPokemon = {
    // Within the JSON
    abilities: [
      {
        ability: {
          name: "",
        },
      },
    ],
    id: "",
    types: [
      {
        type: {
          name: "",
        },
      },
    ],
    name: "",
    moves: [
      {
        move: {
          name: "",
        },
      },
    ],
    sprites: {
      other: {
        "official-artwork": {
          front_default: "",
          front_shiny: "",
        },
      },
    },

    // Links outside the JSON
    species: {
      url: "",
    },
    location_area_encounters: "",
  };

  const [pokemonData, setPokemonData] = useState<IPokemon>(pokeDefault);
  const [speciesData, setSpeciesData] = useState<any>();
  const [encounterData, setEncounterData] = useState<any>();

  const dataFetch = async (api: string) => {
    const data = await apiFetch(api);
    return data;
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await dataFetch("https://pokeapi.co/api/v2/pokemon/pikachu");
      setPokemonData(data);
    };
    loadData();
  }, []);

  useEffect(() => {
    if (pokemonData.species.url && pokemonData.location_area_encounters) {
      const loadMoreData = async () => {
        const species = await dataFetch(pokemonData.species.url);
        const location = await dataFetch(pokemonData.location_area_encounters);
        console.log(species.flavor_text_entries);
        console.log(location);
        setSpeciesData(species);
        setEncounterData(location);
      };
      loadMoreData();
    }
  }, [pokemonData]);

  return (
    <div className="flex justify-center">
      <DexFetchComponent
        // Capitalize name
        pokemonName={pokemonData ? pokemonData.name : ""}
        // Validate ID for different forms
        pokemonID={pokemonData ? pokemonData.id : ""}
        // Map out type names
        pokemonType={pokemonData ? pokemonData.types[0].type.name : ""}
        // Look back at vanilla JS version to figure out how this was possible
        pokemonEvolutions={pokemonData ? pokemonData.species.url : ""}
        // Fetch from url
        pokemonArea={pokemonData ? pokemonData.location_area_encounters : ""}
        // Map out abilities
        pokemonAbilities={
          pokemonData ? pokemonData.abilities[0].ability.name : ""
        }
        // Map out moves
        pokemonMoves={pokemonData ? pokemonData.moves[0].move.name : ""}
        // Fetch from url
        pokemonDexEntry={pokemonData ? pokemonData.species.url : ""}
        // Add toggle for different versions
        pokemonArt={
          pokemonData
            ? pokemonData.sprites.other["official-artwork"].front_default
            : ""
        }
      />
    </div>
  );
};

export default UnovaDexComponent;
