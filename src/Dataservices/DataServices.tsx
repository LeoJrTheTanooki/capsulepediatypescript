export const apiFetch = async (api: string) => {
  const response = await fetch(api);
  const data = await response.json();
  return data;
};

export const dataFetch = async (api: string) => {
  const data = await apiFetch(api);
  return data;
};

export const setData = async (
    progress: number = 0,
    setProgress: React.Dispatch<React.SetStateAction<number>> | null = null,
    setParam: React.Dispatch<any>,
    api: string,
    query: string = "",
    endpoint: string = "",
    logToConsole: boolean = false,
    currentLine: number = 0
  ) => {
    try {
      const dataToSet = await dataFetch(api + query + endpoint);
      setParam(dataToSet);
      if(setProgress) setProgress(progress += 1)
      if (logToConsole) console.log(dataToSet, currentLine > 0 ? `Logged at ${currentLine}` : '');
    } catch (error) {
      console.error("An error has occured", error);
    }
  }
