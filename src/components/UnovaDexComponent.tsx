import { useEffect, useState } from "react";
import { IPokeProps } from "../Interfaces/Interfaces";
import {
  getLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "../Dataservices/DataServices";

const UnovaDexComponent = (props: IPokeProps) => {
  return (
    <div className="w-full flex flex-wrap gap-5">
      <div className="mt-6 static w-full flex flex-col-reverse lg:flex-col">
        <div className=" z-30 lg:absolute right-[2.5%] flex lg:flex-row flex-col-reverse mx-auto">
          <div className="flex justify-center content-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              version="1.1"
              id="svg1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs id="defs1" />
              <g
                id="layer3"
                transform="translate(26.700188,-5.6435158)"
                stroke="#000000"
                strokeWidth="1"
                strokeDasharray="none"
                strokeOpacity="1"
              >
                <path
                  fill="#ffffff"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeDasharray="none"
                  strokeOpacity="1"
                  id="path2"
                  d="M 41.677232,52.225755 C 42.016928,52.029631 14.037723,52.02963 14.377419,52.225754 14.717116,52.421878 0.72751429,28.191174 0.72751427,28.583422 0.72751425,28.97567 14.717118,4.744968 14.377422,4.941092 c -0.339697,0.1961239 27.639509,0.1961253 27.299812,1.3e-6 -0.339697,-0.196124 13.649905,24.0345797 13.649905,23.6423317 0,-0.392248 -13.989604,23.838454 -13.649907,23.64233 z"
                  transform="translate(-26.727515,5.0600922)"
                />
                <g
                  id="layer1"
                  transform="translate(-27.033421,5.3102829)"
                  className={!props.isLoading ? "cursor-pointer" : "cursor-not-allowed"}
                  onClick={() => {
                    if (!props.isLoading && props.pokemonID) {
                      if (getLocalStorage().includes(props.pokemonID)) {
                        removeFromLocalStorage(props.pokemonID);
                        props.setIsFavorite(false);
                      } else if (!getLocalStorage().includes(props.pokemonID)) {
                        saveToLocalStorage(props.pokemonID);
                        props.setIsFavorite(true);
                      }
                    }
                  }}
                >
                  <circle
                    display="inline"
                    fill="#1a1a1a"
                    fillOpacity="1"
                    stroke="#103931"
                    strokeWidth="0"
                    strokeDasharray="none"
                    id="inside"
                    cx="28.333233"
                    cy="28.333233"
                    r="15.333233"
                  />
                  <path
                    fill={!props.isFavorite ? "#808080" : "#f9f9f9"}
                    stroke="#103931"
                    strokeWidth="0"
                    strokeDasharray="none"
                    id="bottom-lid"
                    d="m 42.283952,29.205152 a 13.950719,13.078799 0 0 1 -6.97536,11.326572 13.950719,13.078799 0 0 1 -13.950719,0 13.950719,13.078799 0 0 1 -6.975359,-11.326572 h 13.950719 z"
                  />
                  <path
                    fill={props.isFavorite ? "#ff0000" : "#808080"}
                    fillOpacity="1"
                    stroke="#103931"
                    strokeWidth="0"
                    strokeDasharray="none"
                    id="top-lid"
                    d="m 42.283952,27.461312 a 13.950719,13.078799 0 0 0 -6.97536,-11.326572 13.950719,13.078799 0 0 0 -13.950719,0 13.950719,13.078799 0 0 0 -6.975359,11.326572 h 13.950719 z"
                  />
                  <circle
                    display="inline"
                    fill="#1a1a1a"
                    fillOpacity="1"
                    stroke="#103931"
                    strokeWidth="0"
                    strokeDasharray="none"
                    id="button-outline"
                    cx="28.333233"
                    cy="28.333233"
                    r="5.2515669"
                  />
                  <circle
                    display="inline"
                    fill={props.isFavorite ? "#f9f9f9" : "#808080"}
                    fillOpacity="1"
                    stroke="#103931"
                    strokeWidth="0"
                    strokeDasharray="none"
                    id="button"
                    cx="28.333233"
                    cy="28.333233"
                    r="3.9964161"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div className="lg:w-[550px] w-full max-w-[550px] mt-16 lg:-mt-3">
            <div className="flex h-8">
              <div className="bg-black w-1/4"></div>
              <img src="/dexcorner2.svg" alt="" />
            </div>
            <div className="border-2 border-black shadow-lg shadow-black h-[600px] bg-white">
              <div className="bg-[#dedede] p-5 flex justify-between">
                <p className="text-2xl">
                  &#8226;{props.isLoading ? "???" : props.pokemonID}
                </p>
                <p className="text-2xl justify-self-center">
                  {props.isLoading ? "Loading..." : props.pokemonName}
                </p>
                <p></p>
              </div>
              <div className="p-5 bg-white">
                <p className="text-2xl text-center">
                  {props.isLoading ? "Loading..." : props.pokemonGenus}
                </p>
              </div>
              <div
                className="p-5"
                style={{
                  backgroundSize: "8px 8px",
                  backgroundColor: "#dedede",
                  backgroundImage:
                    "linear-gradient(to right, white 2px, transparent 1px), linear-gradient(to bottom, white 2px, transparent 1px)",
                }}
              >
                <div className=" flex justify-center gap-4">
                  {props.isLoading ? (
                    <div className="bg-???-bg border-???-border text-white border-2 font-bold w-20 text-center">
                      ???
                    </div>
                  ) : props.pokemonType && props.pokemonType.length > 0 ? (
                    props.pokemonType
                  ) : (
                    <>
                      <div className="w-20 h-7 border-2 bg-neutral-400 border-neutral-600"></div>{" "}
                    </>
                  )}
                </div>
              </div>
              <div className="overflow-y-auto max-h-96">
                <div className="p-5 bg-white">
                  Evolution Line:
                  <br />
                  <span>
                    {props.isLoading ? "Loading..." : props.pokemonEvolutions}
                  </span>
                </div>
                <div className="p-5 bg-white">
                  <p>
                    Areas:{" "}
                    <span>
                      {props.isLoading ? "Loading..." : props.pokemonArea}
                    </span>
                  </p>
                </div>
                <div className="p-5 bg-white">
                  <p>
                    Abilities:{" "}
                    <span>
                      {props.isLoading ? "Loading..." : props.pokemonAbilities}
                    </span>
                  </p>
                </div>
                <div className="max-h-96 p-5 bg-white">
                  <p>
                    Moves:{" "}
                    <span>
                      {props.isLoading ? "Loading..." : props.pokemonMoves}
                    </span>
                  </p>
                </div>
              </div>

              {/* <div className="bg-white flex justify-between text-2xl">HT</div>
              <div className="bg-white flex justify-between text-2xl">WT</div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex z-20">
            <div className="bg-[#949494] h-16 w-1/4 border-t-2 border-[#103931]"></div>
            <img className="h-16 " src="/dexcorner.svg" alt="" />
          </div>

          <div
            className="bg-[#949494] px-5 outline outline-[#103931] outline-2 z-10 flex justify-center lg:justify-start"
            // style={{
            //   borderWidth: 30,
            //   borderImage:
            //     "repeating-linear-gradient( 90deg, black, black 1%, transparent 1%, transparent 2% 30px) 29",
            // }}
          >
            <div className=" xl:w-[5%]"></div>
            {/* <button id="favoriteBtn" className="block ml-auto">
              <img id="starBtn" src="/assets/Unfavorited.png" alt="" />
            </button> */}
            <div className=" h-[475px]">
              <img
                src={props.isLoading ? "/unknown.svg" : props.pokemonArt}
                alt="N/A"
              />
            </div>
          </div>
          <div className="w-full flex justify-end z-20">
            <img className="h-16 rotate-180" src="/dexcorner.svg" alt="" />
            <div className="bg-[#949494] h-16 w-5/6 border-b-2 border-[#103931]"></div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col w-full mt-16">
        <div className="flex h-8">
          <div className="bg-black w-2/12"></div>
          <img src="/dexcorner2.svg" alt="" />
        </div>
        <div className="p-5 flex flex-col flex-wrap bg-[#393939] text-white w-full border-y-2 border-black">
          {props.isLoading ? "Loading..." : props.pokemonDexEntry}
        </div>
      </div>
    </div>
  );
};

export default UnovaDexComponent;
