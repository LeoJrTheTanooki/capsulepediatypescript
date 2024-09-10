import { IPokemon } from "../Interfaces/Interfaces";

export const apiFetch = async (api: string) => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};
