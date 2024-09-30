import { Flowbite } from "flowbite-react";
import {
  INamedAPIResource,
  INamedAPIResourceList,
  IQueryProps,
} from "../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import { setData } from "../Dataservices/DataServices";

const NavbarComponent = (props: IQueryProps) => {
  const [allPokemon, setAllPokemon] = useState<INamedAPIResourceList>();
  const [filteredPokemon, setFilteredPokemon] = useState<INamedAPIResource[]>();
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const [progress, setProgress] = useState<number>(0);

  // Add favorite Pokemon to localStorage
  // Create new hamburger menu for navbar
  // Create homepage for list of every pokemon up to Gen 5
  // Create loading animations
  // Create error assets
  // Create new favicon
  // Create different styles based on older gens
  // If allowing future Pokemon, frame missing information as incomplete research

  useEffect(() => {
    setData(
      progress,
      setProgress,
      setAllPokemon,
      "https://pokeapi.co/api/v2/pokemon/?limit=649&offset=0"
    );
  }, [progress]);

  useEffect(() => {
    if (allPokemon && props.query) {
      setFilteredPokemon(
        allPokemon.results
          .filter((e) => {
            return e.name
              .toLowerCase()
              .replace(new RegExp("-", "gi"), " ")
              .includes(props.query.toLowerCase());
          })
          .map((e) => {
            switch (e.name) {
              case "deoxys-normal":
                e.name = "deoxys";
                // 10001, 10002, 10003
                break;
              case "wormadam-plant":
                e.name = "wormadam";
                // 10004, 10005
                break;
              case "shaymin-land":
                e.name = "shaymin";
                // 10006
                break;
              case "giratina-altered":
                e.name = "giratina";
                // 10007
                break;
              case "rotom":
                e.name = "rotom";
                // 10008 - 10012
                break;
              case "basculin-red-striped":
                e.name = "basculin";
                // 10016
                break;
              case "darmanitan-standard":
                e.name = "darmanitan";
                // 10017
                break;
              case "meloetta-aria":
                e.name = "meloetta";
                // 10018
                break;
              case "tornadus-incarnate":
                e.name = "tornadus";
                // 10019
                break;
              case "thundurus-incarnate":
                e.name = "thundurus";
                // 10020
                break;
              case "landorus-incarnate":
                e.name = "landorus";
                // 10021
                break;
              case "kyurem":
                e.name = "kyurem";
                // 10022, 10023
                break;
              case "keldeo-ordinary":
                e.name = "keldeo";
                // 10024
                break;
            }

            e.name = e.name
              .replace(new RegExp("-", "gi"), " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());
            return e;
          })
      );
    }
  }, [allPokemon, props.query]);

  return (
    <Flowbite>
      <nav className="bg-gradient-to-b from- from-neutral-500 to-black to-40% border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Capsulepedia
            </span>
          </button>

          <div className="items-center justify-between flex flex-wrap w-[235px] md:w-auto">
            {/* Desktop Input */}
            <div className="relative mx-5 w-[235px]">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search icon</span>
              </div>

              <input
                type="text"
                className="block w-full p-2 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => {
                  props.setQuery(e.target.value);
                }}
                value={props.query}
                onFocus={() => setInputFocus(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") console.log(e);
                }}
                onBlur={() => {
                  setInputFocus(false);
                }}
              />
            </div>

            <div
              className={`bg-white absolute flex flex-col mx-5 w-[235px] top-14${
                inputFocus && props.query.length > 0
                  ? ""
                  : " hidden hover:block"
              }`}
            >
              {filteredPokemon ? (
                filteredPokemon?.map((e, idx) => {
                  return (
                    <div
                      key={idx}
                      className="border cursor-pointer hover:bg-neutral-300"
                      onClick={() => {
                        setInputFocus(false);
                        if (props.setQueryLink) props.setQueryLink(e.url);
                      }}
                    >
                      {e.name}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>

            <ul className="flex p-0 font-medium rounded-lg rtl:space-x-reverse mt-0 text-center w-full justify-between md:w-auto md:justify-normal">
              <li>
                <button
                  className="py-2 px-3 text-neutral-400 hover:text-white border-neutral-400 border-4 rounded-lg hover:border-white text-center inline-block"
                  onClick={() => {
                    const randomNum = Math.floor(Math.random() * 649) + 1;
                    if (props.setQueryLink)
                      props.setQueryLink(
                        "https://pokeapi.co/api/v2/pokemon/" + randomNum
                      );
                  }}
                >
                  Random
                </button>
              </li>
              <li>
                <button
                  className="py-2 px-3 text-neutral-400 hover:text-white border-neutral-400 border-4 rounded-lg hover:border-white text-center inline-block cursor-not-allowed"
                  data-drawer-target="drawer-example"
                  data-drawer-show="drawer-example"
                  aria-controls="drawer-example"
                  id="getFavoritesBtn"
                >
                  Favorites
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </Flowbite>
  );
};

export default NavbarComponent;
