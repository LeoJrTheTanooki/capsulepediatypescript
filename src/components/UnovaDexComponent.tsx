import React, { useEffect, useState } from "react";
import { IpokeProps, Ipokemon } from "../Interfaces/Interfaces";
import { PokeApi } from "../Dataservices/DataServices";
import DexFetchComponent from "./DexFetchComponent";

const UnovaDexComponent = () => {
  const pokeDefault: Ipokemon = {
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

  const [pokemon, setPokemon] = useState<Ipokemon>(pokeDefault);

  useEffect(() => {
    const getData = async () => {
      const pokeData = await PokeApi();
      setPokemon(pokeData);
      // setPokemon();
    };
    getData();
  }, []);

  return (
    <div className="flex justify-center">
      <DexFetchComponent pokemonArt={pokemon.sprites.other["official-artwork"].front_default} pokemonAbilities={pokemon.abilities[0].ability.name} pokemonArea={pokemon.location_area_encounters} pokemonDexEntry={pokemon.species.url} pokemonEvolutions={pokemon.species.url} pokemonID={pokemon.id} pokemonMoves={pokemon.moves[0].move.name} pokemonName={pokemon.name} pokemonType={pokemon.types[0].type.name} />
    </div>
  );
};

export default UnovaDexComponent;
