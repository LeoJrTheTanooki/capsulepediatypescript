import { Ipokemon } from "../Interfaces/Interfaces";

export const PokeApi = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const data: Ipokemon[] = await response.json();
  console.log(data);
  return data[0];
};
