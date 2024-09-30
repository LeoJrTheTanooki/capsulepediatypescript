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
      <div className="mt-6 static w-full flex flex-col-reverse lg:flex-col">

        
        <div className="lg:w-[550px] w-full max-w-[550px] z-30 lg:absolute right-[2.5%] mx-auto mt-16 lg:-mt-3">
          <div className="flex h-8">
            <div className="bg-black w-1/4"></div>
            <img src="/dexcorner2.svg" alt="" />
          </div>
          <div className="border-2 border-black shadow-lg shadow-black h-[600px] bg-white">
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
                    <div className="w-20 h-7 border-2 bg-neutral-400 border-neutral-600"></div>{" "}
                  </>
                )}
              </div>
            </div>
            <div className="overflow-y-auto max-h-96">
              <div className="p-5 bg-white">
                Evolution Line:
                <br />
                <span>{props.pokemonEvolutions}</span>
              </div>
              <div className="p-5 bg-white">
                <p>
                  Areas: <span>{props.pokemonArea}</span>
                </p>
              </div>
              <div className="p-5 bg-white">
                <p>
                  Abilities: <span>{props.pokemonAbilities}</span>
                </p>
              </div>
              <div className="max-h-96 p-5 bg-white">
                <p>
                  Moves: <span>{props.pokemonMoves}</span>
                </p>
              </div>
            </div>

            {/* <div className="bg-white flex justify-between text-2xl">HT</div>
            <div className="bg-white flex justify-between text-2xl">WT</div> */}
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex z-20">
            <div className="bg-[#949494] h-16 w-1/4 border-t-2 border-[#103931]"></div>
            <img className="h-16 " src="/dexcorner.svg" alt="" />
          </div>

          <div
            className="bg-[#949494] px-5 h-[475px] outline outline-[#103931] outline-2 z-10 flex justify-center lg:justify-start"
            // style={{
            //   borderWidth: 30,
            //   borderImage:
            //     "repeating-linear-gradient( 90deg, black, black 1%, transparent 1%, transparent 2% 30px) 29",
            // }}
          >
            <div className=" w-[5%]"></div>
            {/* <button id="favoriteBtn" className="block ml-auto">
              <img id="starBtn" src="/assets/Unfavorited.png" alt="" />
            </button> */}
            <img src={props.pokemonArt} alt="N/A" className="text-center" />
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
          {props.pokemonDexEntry}
        </div>
      </div>
    </div>
  );
};

export default UnovaDexComponent;
