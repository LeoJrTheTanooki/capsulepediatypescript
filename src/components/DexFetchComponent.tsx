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
  const [pokemonType, setPokemonType] = useState<Array<any>>([]);
  const [pokemonEvolutions, setPokemonEvolutions] = useState<IEvolutionChain>();
  const [evolutionJsx, setEvolutionJsx] = useState<React.ReactNode>();
  const [pokemonArea, setPokemonArea] = useState<string>("");
  const [pokemonAbilities, setPokemonAbilities] = useState<string>("");
  const [pokemonMoves, setPokemonMoves] = useState<string>("");
  const [pokemonDexEntry, setPokemonDexEntry] = useState<Array<React.ReactNode>>([]);
  const [pokemonArt, setPokemonArt] = useState<string>("");
  const [pokemonGenus, setPokemonGenus] = useState<string>("");

  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    console.log(progress)
  }, [progress])
  

  function Capitalizer(param: string) {
    param = param
      .replace(new RegExp("-", "gi"), " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return param;
  }

  // useEffect(() => {
  //   setData(progress, setProgress, setPokemonData, "https://pokeapi.co/api/v2/pokemon/", props.query);
  //   setData(progress, setProgress, 
  //     setEncounterData,
  //     "https://pokeapi.co/api/v2/pokemon/",
  //     props.query,
  //     "/encounters"
  //   );
  // }, [props.query]);

  useEffect(() => {
    if (props.queryLink) {
      setProgress(0)
      setData(progress, setProgress, setPokemonData, props.queryLink);
      setData(progress, setProgress, setEncounterData, props.queryLink, "/encounters");
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const colorLoad = (
            <ul>
              <li className="bg-bug-bg"></li>
              <li className="border-bug-border"></li>
              <li className="bg-dark-bg"></li>
              <li className="border-dark-border"></li>
              <li className="bg-dragon-bg"></li>
              <li className="border-dragon-border"></li>
              <li className="bg-electric-bg"></li>
              <li className="border-electric-border"></li>
              <li className="bg-fairy-bg"></li>
              <li className="border-fairy-border"></li>
              <li className="bg-fighting-bg"></li>
              <li className="border-fighting-border"></li>
              <li className="bg-fire-bg"></li>
              <li className="border-fire-border"></li>
              <li className="bg-flying-bg"></li>
              <li className="border-flying-border"></li>
              <li className="bg-ghost-bg"></li>
              <li className="border-ghost-border"></li>
              <li className="bg-grass-bg"></li>
              <li className="border-grass-border"></li>
              <li className="bg-ground-bg"></li>
              <li className="border-ground-border"></li>
              <li className="bg-ice-bg"></li>
              <li className="border-ice-border"></li>
              <li className="bg-normal-bg"></li>
              <li className="border-normal-border"></li>
              <li className="bg-poison-bg"></li>
              <li className="border-poison-border"></li>
              <li className="bg-psychic-bg"></li>
              <li className="border-psychic-border"></li>
              <li className="bg-rock-bg"></li>
              <li className="border-rock-border"></li>
              <li className="bg-steel-bg"></li>
              <li className="border-steel-border"></li>
              <li className="bg-water-bg"></li>
              <li className="border-water-border"></li>
            </ul>
          );
          const typeBg = `bg-${e.type.name}-bg`;
          const typeBorder = ` border-${e.type.name}-border`;
          return (
            <div
              className={
                typeBg +
                typeBorder +
                " text-white border-2 font-bold w-20 text-center"
              }
            >
              {e.type.name.toUpperCase()}
            </div>
          );
        });
        setPokemonType(types);

        setData(progress, setProgress, setSpeciesData, pokemonData.species.url, "", "");
      } catch (error) {}
    }
  }, [pokemonData, encounterData]);

  useEffect(() => {
    if (speciesData) {
      setPokemonGenus(
        speciesData.genera.find((e) => {
          return e.language.name === "en";
        })!.genus
      );

      // Nest a for loop within the map to check if future entries are equal to the current one.
      // EX: for (let j = idx + 1; j > flavor_text_entries.length(); j++)
      // If so add to the current version name by e.version.name += `, ${flavor_text_entries[j].version.name}`
      // Afterwards, splice the array by flavor_text_entries[j] to erase the one entry
      // Hope the for loop doesn't exceed and error out
      // If so, turn .length() into a let variable and subtract from it by 1

      setData(progress, setProgress, setPokemonEvolutions, speciesData.evolution_chain.url, "", "");
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
      const evolutionMap = () => {
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
        evolutionMap().map((e, idx) => {
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
        pokemonGenus={pokemonGenus}
      />
    </div>
  );
};

export default DexFetchComponent;
