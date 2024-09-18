import React, { useEffect, useState } from "react";
import {
  IEvolutionChain,
  ILocationAreaEncounter,
  IQueryProps,
  IPokemon,
  ISpecies,
} from "../Interfaces/Interfaces";
import { setData } from "../Dataservices/DataServices";
import UnovaDexComponent from "./UnovaDexComponent";

const DexFetchComponent = (props: IQueryProps) => {
  const [pokemonData, setPokemonData] = useState<IPokemon>();
  const [speciesData, setSpeciesData] = useState<ISpecies>();
  const [encounterData, setEncounterData] =
    useState<ILocationAreaEncounter[]>();

  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonID, setPokemonID] = useState<string>("");
  const [pokemonType, setPokemonType] = useState<Array<string>>([]);
  const [pokemonEvolutions, setPokemonEvolutions] = useState<IEvolutionChain>();
  const [evolutionJsx, setEvolutionJsx] = useState<React.ReactNode>();
  const [pokemonArea, setPokemonArea] = useState<string>("");
  const [pokemonAbilities, setPokemonAbilities] = useState<string>("");
  const [pokemonMoves, setPokemonMoves] = useState<string>("");
  const [pokemonDexEntry, setPokemonDexEntry] = useState<React.ReactNode>("");
  const [pokemonArt, setPokemonArt] = useState<string>("");

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

      // Nest a for loop within the map to check if future entries are equal to the current one.
      // EX: for (let j = idx + 1; j > flavor_text_entries.length(); j++)
      // If so add to the current version name by e.version.name += `, ${flavor_text_entries[j].version.name}`
      // Afterwards, splice the array by flavor_text_entries[j] to erase the one entry
      // Hope the for loop doesn't exceed and error out
      // If so, turn .length() into a let variable and subtract from it by 1

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

  useEffect(() => {
    console.log(evolutionJsx)
  }, [evolutionJsx])
  

  return (
    <div className="flex justify-center">
      <UnovaDexComponent
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

export default DexFetchComponent;
