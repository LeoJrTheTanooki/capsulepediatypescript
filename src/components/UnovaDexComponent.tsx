import { useEffect } from "react";
import { IPokeProps } from "../Interfaces/Interfaces";

const UnovaDexComponent = (props: IPokeProps) => {
  // useEffect(() => {
  //   if (
  //     props.pokemonArt &&
  //     props.pokemonDexEntry &&
  //     props.pokemonName &&
  //     props.pokemonID &&
  //     props.pokemonType.length > 0 &&
  //     props.pokemonEvolutions &&
  //     props.pokemonArea &&
  //     props.pokemonAbilities &&
  //     props.pokemonMoves &&
  //     props.pokemonGenus
  //   ) {
  //     console.log(props);
  //   }
  // }, [props]);

  return (
    <div className="w-full flex flex-wrap gap-5">
      <div className="mt-4 static w-full">
        <div className="w-1/2 z-20 absolute right-0">
          <div className="bg-black w-1/4 h-8"></div>
          <div className="border-2 border-black">
            <div className="bg-[#dedede] p-5 flex justify-between">
              <p className="text-2xl">&#8226;{props.pokemonID}</p>
              <p className="text-2xl justify-self-center">
                {props.pokemonName}
              </p>
              <p></p>
            </div>
            <div className="p-5 bg-white">
              <p className="text-2xl text-center">{props.pokemonGenus}</p>
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
                {props.pokemonType && props.pokemonType.length > 0 ? (
                  props.pokemonType
                ) : (
                  <>
                    <div className="w-20 h-7 border-2 bg-neutral-400 border-neutral-600 animate-pulse"></div>{" "}
                  </>
                )}
              </div>
            </div>
            <div className="bg-white flex justify-between text-2xl">HT</div>
            <div className="bg-white flex justify-between text-2xl">WT</div>
          </div>
        </div>


        <div className=" outline flex flex-col">
          <div className="bg-[#949494] h-16 w-1/4"></div>
          <div className="bg-[#949494] p-5 z-10">
            <button id="favoriteBtn" className="block ml-auto">
              <img id="starBtn" src="/assets/Unfavorited.png" alt="" />
            </button>
            <img src={props.pokemonArt} alt="N/A" className="text-center" />
          </div>
          <div className="w-full flex justify-end">
            <div className="bg-[#949494] h-16 w-5/6"></div>
          </div>
        </div>


      </div>
      <div className="p-5 flex flex-col flex-wrap bg-[#393939] text-white w-full">
        {props.pokemonDexEntry}
      </div>
      <div className="p-5 overflow-y-auto bg-white">
        Evolution Line:
        <br />
        <span>{props.pokemonEvolutions}</span>
      </div>
      <div className="overflow-y-auto max-h-32 p-5 bg-white">
        <p>
          Areas: <span>{props.pokemonArea}</span>
        </p>
      </div>
      <div className="p-5 bg-white">
        <p>
          Abilities: <span>{props.pokemonAbilities}</span>
        </p>
      </div>
      <div className="overflow-y-auto max-h-96 p-5 bg-white">
        <p>
          Moves: <span>{props.pokemonMoves}</span>
        </p>
      </div>
    </div>
  );
};

export default UnovaDexComponent;
