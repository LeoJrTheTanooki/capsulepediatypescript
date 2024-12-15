import { Flowbite, Drawer } from "flowbite-react";
import {
  INamedAPIResource,
  INamedAPIResourceList,
  IPokemon,
  IQueryProps,
} from "../Interfaces/Interfaces";
import { useEffect, useState } from "react";
import {
  Capitalizer,
  dataFetch,
  getLocalStorage,
  setData,
} from "../Dataservices/DataServices";

const PokemonTile: React.FC<any> = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="cursor-pointer text-white flex m-1"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <svg
        width="11.640224"
        viewBox="0 0 3.0798089 10.037307"
        version="1.1"
        id="svg1"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(-0.03191513)">
          <path
            fillOpacity="1"
            d="M 0.03191513,4.978759 3.1117244,10.037306 V 0 Z"
            id="path5"
            className={isHovering ? "fill-[#315a10]" : "fill-black"}
          />
        </g>
      </svg>
      <div
        className={
          " flex w-full content-center " +
          (isHovering ? "bg-[#315a10]" : "bg-black")
        }
      >
        {children}
      </div>
      <svg
        width="26"
        viewBox="0 0 6.7445229 10.146332"
        version="1.1"
        id="svg1"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full"
      >
        <defs id="defs1" />
        <g id="layer1" transform="translate(7.0867523e-4,0.09033897)">
          <path
            fillOpacity="1"
            stroke="none"
            d="M -7.0867528e-4,10.055992 6.743815,-0.0531965 -7.0867528e-4,-0.09033897 Z"
            id="path5"
            className={isHovering ? "fill-[#315a10]" : "fill-black"}
          />
        </g>
      </svg>
    </div>
  );
};

/*

  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  queryLink?: string;
  setQueryLink?: React.Dispatch<React.SetStateAction<string>>;

*/

const NavbarComponent = (props: IQueryProps) => {
  const [allPokemon, setAllPokemon] = useState<INamedAPIResourceList>();
  const [filteredPokemon, setFilteredPokemon] = useState<INamedAPIResource[]>();
  const [inputFocus, setInputFocus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [favoritesJsx, setFavoritesJsx] = useState<any[]>();

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
    // section keeps executing and i need to fix that
    if (allPokemon && props.query) {
      setFilteredPokemon(
        allPokemon.results
          .filter((e, idx) => {
            const dexNum = idx + 1;
            if (isNaN(Number(props.query))) {
              return e.name
                .toLowerCase()
                .replace(new RegExp("-", "gi"), " ")
                .includes(props.query.toLowerCase());
            } else {
              return dexNum === Number(props.query);
            }
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
    } else if (allPokemon) {
      setFilteredPokemon(
        allPokemon.results.map((e) => {
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

  useEffect(() => {
    if (isOpen && props) {
      const asyncFunc = async () => {
        const favoritesList = await Promise.all(
          getLocalStorage().map(async (e: any, idx: number) => {
            const favoriteData: IPokemon = await dataFetch(
              "https://pokeapi.co/api/v2/pokemon/" + e
            );

            return (
              <div
                key={idx}
                onClick={() => {
                  if (props.setQueryLink) {
                    props.setQueryLink(
                      "https://pokeapi.co/api/v2/pokemon/" + e
                    );
                    setIsOpen(false);
                  }
                }}
              >
                <PokemonTile>
                  <img
                    src={
                      favoriteData.sprites.versions["generation-vii"].icons
                        .front_default
                    }
                    alt=""
                    className="h-fit w-[40px]"
                  />
                  <span className=" w-6 mr-3">
                    {e > 99 ? e : e > 9 ? "0" + e : "00" + e}
                  </span>
                  {Capitalizer(favoriteData.name)}
                </PokemonTile>
              </div>
            );
          })
        );
        setFavoritesJsx(favoritesList);
      };
      asyncFunc();
    }
  }, [isOpen, props]);

  return (
    <Flowbite>

      <div
        className={
          "fixed z-50 overflow-y-auto p-4 transition-transform left-0 top-0 h-screen w-80 text-white " +
          (isOpen ? "transform-none" : "-translate-x-full")
        }
        style={{
          backgroundSize: "16px 16px",
          backgroundColor: "#292929",
          backgroundImage:
            "linear-gradient(to right, #181818 2px, transparent 2px), linear-gradient(to bottom, #181818 2px, transparent 2px",
        }}
      >
        <div
          className=" cursor-pointer text-right"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          X
        </div>
        {favoritesJsx}
      </div>
      <div
        className={
          "fixed inset-0 z-40 bg-gray-900/50 dark:bg-gray-900/80 " +
          (isOpen ? "block" : "hidden")
        }
        onClick={() => {
          setIsOpen(false)
        }}
      ></div>
      <nav className="bg-gradient-to-b from- from-neutral-500 to-black to-40% border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button className="flex items-center space-x-3 rtl:space-x-reverse w-full md:w-auto">
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white w-full md:w-auto">
              Capsulepedia
            </span>
          </button>

          <div className="items-center justify-between flex flex-wrap w-full md:w-auto">
            {/* Desktop Input */}
            <div className="relative mx-5 my-4 md:my-0 md:w-[235px] w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-full md:w-auto">
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
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") console.log(e);
                // }}
                onBlur={() => {
                  setInputFocus(false);
                }}
              />
            <div
              className={`bg-black text-white absolute flex flex-col z-40 max-h-40 overflow-y-auto w-full ${
                inputFocus
                  ? //  && props.query.length > 0
                    ""
                  : " hidden hover:block"
              }`}
            >
              {filteredPokemon ? (
                filteredPokemon?.map((e, idx) => {
                  // const dexNum = idx + 1;
                  return (
                    <div
                      key={idx}
                      className="border cursor-pointer hover:bg-[#315a10] flex"
                      onClick={() => {
                        setInputFocus(false);
                        if (props.setQueryLink) props.setQueryLink(e.url);
                      }}
                    >
                      {/* <span className=" w-10">
                        {dexNum > 99
                          ? dexNum
                          : dexNum > 9
                          ? "0" + dexNum
                          : "00" + dexNum}
                      </span> */}
                      {e.name}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            </div>


            <ul className="flex p-0 font-medium rounded-lg rtl:space-x-reverse mt-0 text-center w-full justify-around md:w-auto md:justify-normal md:mx-0 mx-5 gap-5">
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
                  className="py-2 px-3 text-neutral-400 hover:text-white border-neutral-400 border-4 rounded-lg hover:border-white text-center inline-block"
                  data-drawer-target="drawer-example"
                  data-drawer-show="drawer-example"
                  aria-controls="drawer-example"
                  id="getFavoritesBtn"
                  onClick={() => setIsOpen(true)}
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
