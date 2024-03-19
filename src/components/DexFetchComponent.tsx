import React from "react";
import { IpokeProps } from "../Interfaces/Interfaces";

const DexFetchComponent = (props: IpokeProps) => {

    

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center content-center gap-4 place my-5 w-5/6">
      <div className="container bg-white w-5/6 mb-5 h-full">
        <div className="bg-neutral-300 p-5">
          <button id="favoriteBtn" className="block ml-auto">
            <img id="starBtn" src="/assets/Unfavorited.png" alt="" />
          </button>
          <img
            src={props.pokemonArt}
            alt="N/A"
            className="text-center mx-auto"
          />
        </div>
        <div>
          <p className="font-bold p-5">{props.pokemonDexEntry}</p>
        </div>
      </div>
      <div className="container w-5/6 self-stretch bg-neutral-300">
        <div className="bg-white p-5">
          <p className="text-2xl">{props.pokemonName}</p>
          <p>
            #<span>{props.pokemonID}</span>
          </p>
        </div>
        <div className="bg-neutral-300 p-5">
          <p>
            Type(s): <span>{props.pokemonType}</span>
          </p>
        </div>
        <div className="bg-white p-5">
          <p>
            Evolutions: <span>{props.pokemonEvolutions}</span>
          </p>
        </div>
        <div className="bg-neutral-300 overflow-y-auto max-h-32 p-5">
          <p>
            Area: <span>{props.pokemonArea}</span>
          </p>
        </div>
        <div className="bg-white p-5">
          <p>
            Abilities: <span>{props.pokemonAbilities}</span>
          </p>
        </div>
        <div className="bg-neutral-300 overflow-y-auto max-h-96 p-5">
          <p>
            Moves: <span>{props.pokemonMoves}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DexFetchComponent;
