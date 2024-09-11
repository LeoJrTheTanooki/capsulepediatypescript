import React, { useEffect, useState } from "react";
import {
  IChainLink,
  IEvolutionChain,
  ILocationAreaEncounter,
  IPokemon,
  ISpecies,
} from "../Interfaces/Interfaces";
import { apiFetch } from "../Dataservices/DataServices";
import DexFetchComponent from "./DexFetchComponent";

const UnovaDexComponent = () => {
  const [query, setQuery] = useState<string>("eevee");
  const [pokemonData, setPokemonData] = useState<IPokemon>();
  const [speciesData, setSpeciesData] = useState<ISpecies>();
  const [encounterData, setEncounterData] =
    useState<ILocationAreaEncounter[]>();

  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonID, setPokemonID] = useState<string>("");
  const [pokemonType, setPokemonType] = useState<any>();
  const [pokemonEvolutions, setPokemonEvolutions] = useState<IEvolutionChain>();
  const [evolutionJsx, setEvolutionJsx] = useState<any>()
  const [pokemonArea, setPokemonArea] = useState<any>();
  const [pokemonAbilities, setPokemonAbilities] = useState<any>();
  const [pokemonMoves, setPokemonMoves] = useState<any>();
  const [pokemonDexEntry, setPokemonDexEntry] = useState<any>();
  const [pokemonArt, setPokemonArt] = useState<any>();

  const dataFetch = async (api: string) => {
    const data = await apiFetch(api);
    return data;
  };

  const setData = async (
    setParam: React.Dispatch<any>,
    api: string,
    query: string = "",
    endpoint: string = "",
    logToConsole: boolean = false
  ) => {
    try {
      const dataToSet = await dataFetch(api + query + endpoint);
      setParam(dataToSet);
      if (logToConsole) console.log(dataToSet);
    } catch (error) {
      console.error("An error has occured", error);
    }
  };

  useEffect(() => {
    setData(setPokemonData, "https://pokeapi.co/api/v2/pokemon/", query);
    setData(
      setEncounterData,
      "https://pokeapi.co/api/v2/pokemon/",
      query,
      "/encounters"
    );
  }, []);

  useEffect(() => {
    if (pokemonData && encounterData) {
      setPokemonName(pokemonData.name);
      setPokemonID(pokemonData.id);
      setPokemonArt(
        pokemonData.sprites.other["official-artwork"].front_default
      );

      const locationNames = encounterData.map((e: ILocationAreaEncounter) => {
        return e.location_area.name;
      });
      setPokemonArea(locationNames.join(", "));

      const abilities = pokemonData.abilities.map((e) => {
        return e.ability.name;
      });
      setPokemonAbilities(abilities.join(", "));

      const moves = pokemonData.moves.map((e) => {
        return e.move.name;
      });
      setPokemonMoves(moves.join(", "));

      const types = pokemonData.types.map((e) => {
        return e.type.name;
      });
      setPokemonType(types);

      setData(setSpeciesData, pokemonData.species.url, "", "");
    }
  }, [pokemonData, encounterData]);

  useEffect(() => {
    if (speciesData) {
      setData(setPokemonEvolutions, speciesData.evolution_chain.url, "", "");
      const dexEntries = speciesData.flavor_text_entries
        .filter((e) => {
          return (
            e.language.name === "en" &&
            (e.version.name === "black" ||
              e.version.name === "white" ||
              e.version.name === "black-2" ||
              e.version.name === "white-2")
          );
        })
        .map((e, idx) => {
          return (
            <div className=" pb-2" key={idx}>
              <p className="font-bold">{e.version.name}</p>
              <p>{e.flavor_text}</p>
              <hr></hr>
            </div>
          );
        });
      setPokemonDexEntry(dexEntries);
    }
  }, [speciesData]);

  const evolutionChainCheck: any = (e: IChainLink) => {
    if (e.evolves_to.length > 0) {
      return {
        name: e.species.name,
        evolves_to: e.evolves_to.map((f) => {
          return evolutionChainCheck(f);
        }),
      };
    } else {
      return {
        name: e.species.name,
        evolves_to: [],
      };
    }
  };

  useEffect(() => {
    if (pokemonEvolutions) {
      // Implement secondChain returns to evolutionChainCheck
      const secondChain = () => {
        if (pokemonEvolutions.chain.evolves_to.length > 0) {
          return pokemonEvolutions.chain.evolves_to.flatMap((e) => {
            if (e.evolves_to.length > 0) {
              return e.evolves_to.flatMap((f) => {
                return (
                  pokemonEvolutions.chain.species.name +
                  " -> " +
                  e.species.name +
                  " -> " +
                  f.species.name
                );
              });
            } else {
              return (
                pokemonEvolutions.chain.species.name + " -> " + e.species.name
              );
            }
          });
        } else {
          return [pokemonEvolutions.chain.species.name];
        }
      };

      console.log(secondChain())

      setEvolutionJsx(secondChain().map((e) => {
        return (
          <>
          {e}
          <br />
          </>
        )
      }));
    }
  }, [pokemonEvolutions]);

  return (
    <div className="flex justify-center">
      {/* 
      New Rule: Do not format variables before setting them to component
      Let the component do the formatting
      */}
      <DexFetchComponent
        pokemonName={pokemonName}
        pokemonID={pokemonID}
        pokemonType={pokemonType}
        /* 
        Desired output: Adding species name for every element in array and
        breaking lines for each different evolution

        Wurmple -> Silcoon -> Beautifly
        Wurmple -> Cascoon -> Dustox

        Ralts -> Kirlia -> Gardevoir
        Kirlia -> Gallade

        Eevee -> Jolteon
        Eevee -> Vaporeon
        Eevee -> Flareon
        Eevee -> Umbreon
        Eevee -> Espeon
        Eevee -> Glaceon
        Eevee -> Leafeon
        Eevee -> Sylveon
        */
        pokemonEvolutions={evolutionJsx}
        pokemonArea={pokemonArea}
        pokemonAbilities={pokemonAbilities}
        pokemonMoves={pokemonMoves}
        pokemonDexEntry={pokemonDexEntry}
        pokemonArt={pokemonArt}
      />
    </div>
  );
};

export default UnovaDexComponent;
