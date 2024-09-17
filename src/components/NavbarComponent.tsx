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

  // Make Query fetch via link rather than name
  // Remove live search
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
      setAllPokemon,
      "https://pokeapi.co/api/v2/pokemon/?limit=100000&offset=0"
    );
  }, []);

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
      <nav className="bg-gradient-to-b from-neutral-500 to-black to-40% border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
              Capsulepedia
            </span>
          </button>
          <div className="flex">
            <button
              type="button"
              data-collapse-toggle="navbar-search"
              aria-controls="navbar-search"
              aria-expanded="false"
              className="md:hidden text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
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
              <span className="sr-only">Search</span>
            </button>
            <button
              data-collapse-toggle="navbar-search"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto"
            id="navbar-search"
          >
            {/* Mobile Input */}
            <div className="relative mt-3 md:hidden">
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
              </div>

              <input
                type="text"
                className="block w-full p-2 ps-10 text-sm border rounded-lg bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
                onChange={(e) => {
                  props.setQuery(e.target.value);
                }}
                value={props.query}
              />
            </div>

            {/* Desktop Input */}
            <div className="relative hidden md:block mx-5">
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

                onBlur={() => {
                  setInputFocus(false)
                }}
              />
            </div>
            <div
              className={`bg-white absolute flex flex-col mx-5 w-[235px] top-14${
                !inputFocus ? " hidden hover:block" : ""
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

            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 border-gray-700 text-center">
              <li className="mb-5 md:mb-0">
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
