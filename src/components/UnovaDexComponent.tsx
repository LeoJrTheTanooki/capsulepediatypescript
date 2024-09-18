import React, { useEffect, useState } from "react";
import {
  IEvolutionChain,
  ILocationAreaEncounter,
  IQueryProps,
  IPokemon,
  ISpecies,
} from "../Interfaces/Interfaces";
import { setData } from "../Dataservices/DataServices";
import DexFetchComponent from "./DexFetchComponent";

const UnovaDexComponent = (props: IQueryProps) => {
  const [pokemonData, setPokemonData] = useState<IPokemon>();
  const [speciesData, setSpeciesData] = useState<ISpecies>();
  const [encounterData, setEncounterData] =
    useState<ILocationAreaEncounter[]>();

  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonID, setPokemonID] = useState<string>("");
  const [pokemonType, setPokemonType] = useState<any>();
  const [pokemonEvolutions, setPokemonEvolutions] = useState<IEvolutionChain>();
  const [evolutionJsx, setEvolutionJsx] = useState<any>();
  const [pokemonArea, setPokemonArea] = useState<any>();
  const [pokemonAbilities, setPokemonAbilities] = useState<any>();
  const [pokemonMoves, setPokemonMoves] = useState<any>();
  const [pokemonDexEntry, setPokemonDexEntry] = useState<any>();
  const [pokemonArt, setPokemonArt] = useState<any>();

  function Capitalizer(param: string) {
    param = param
      .replace(new RegExp("-", "gi"), " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return param;
  }

  // useEffect(() => {
  //   setData(setPokemonData, "https://pokeapi.co/api/v2/pokemon/", props.query);
  //   setData(
  //     setEncounterData,
  //     "https://pokeapi.co/api/v2/pokemon/",
  //     props.query,
  //     "/encounters"
  //   );
  // }, [props.query]);

  useEffect(() => {
    if (props.queryLink) {
      setData(setPokemonData, props.queryLink);
      setData(
        setEncounterData,

        props.queryLink,
        "/encounters"
      );
    }
  }, [props.queryLink]);

  useEffect(() => {
    if (pokemonData && encounterData) {
      try {

        

        setPokemonName(Capitalizer(pokemonData.name));
        setPokemonID(pokemonData.id);
        setPokemonArt(
          pokemonData.sprites.other["official-artwork"].front_default
        );

        const locationNames = encounterData.map((e: ILocationAreaEncounter) => {
          return e.location_area.name;
        });
        setPokemonArea(locationNames.map((e) => Capitalizer(e)).join(", "));

        const abilities = pokemonData.abilities.map((e) => {
          return e.ability.name;
        });
        setPokemonAbilities(abilities.map((e) => Capitalizer(e)).join(", "));

        const moves = pokemonData.moves.map((e) => {
          return e.move.name;
        });
        setPokemonMoves(moves.map((e) => Capitalizer(e)).join(", "));

        const types = pokemonData.types.map((e) => {
          return Capitalizer(e.type.name);
        });
        setPokemonType(types);

        setData(setSpeciesData, pokemonData.species.url, "", "");



      } catch (error) {}
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
              <p className="font-bold">{Capitalizer(e.version.name)}</p>
              <p>{e.flavor_text}</p>
              <hr></hr>
            </div>
          );
        });
      setPokemonDexEntry(dexEntries);
    }
  }, [speciesData]);

  useEffect(() => {
    if (pokemonEvolutions) {
      const secondChain = () => {
        if (pokemonEvolutions.chain.evolves_to.length > 0) {
          return pokemonEvolutions.chain.evolves_to.flatMap((e) => {
            if (e.evolves_to.length > 0) {
              return e.evolves_to.flatMap((f) => {
                return (
                  Capitalizer(pokemonEvolutions.chain.species.name) +
                  " -> " +
                  Capitalizer(e.species.name) +
                  " -> " +
                  Capitalizer(f.species.name)
                );
              });
            } else {
              return (
                Capitalizer(pokemonEvolutions.chain.species.name) +
                " -> " +
                Capitalizer(e.species.name)
              );
            }
          });
        } else {
          return [Capitalizer(pokemonEvolutions.chain.species.name)];
        }
      };

      setEvolutionJsx(
        secondChain().map((e, idx) => {
          return (
            <div key={idx}>
              {e}
              <br />
            </div>
          );
        })
      );
    }
  }, [pokemonEvolutions]);

  return (
    <div className="flex justify-center">
      <DexFetchComponent
        pokemonName={pokemonName}
        pokemonID={pokemonID}
        pokemonType={pokemonType}
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
