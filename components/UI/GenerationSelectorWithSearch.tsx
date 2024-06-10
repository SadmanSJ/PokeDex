"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatName } from "@/functions/formatNames";

const GenerationSelectorWithSearch = ({
  generationList,
  currentGen,
  query,
}: any) => {
  const [viewGen, setViewGen] = useState(currentGen);
  const [currentQuery, setCurrentQuery] = useState(query);
  const router = useRouter();

  useEffect(() => {
    router.replace(`?viewGen=${viewGen}&query=${currentQuery}`);
  }, [currentQuery, viewGen]);

  const makeSearchQuery = (url: string) => {
    const parts = url.split("/");
    return `${parts[parts.length - 3]}-${parts[parts.length - 2]}`;
  };

  const options = generationList.results.map((m: any) => ({
    value: makeSearchQuery(m.url),
    label: formatName(m.name).toUpperCase(),
  }));

  return (
    <div className="sticky top-20 z-20 flex items-center bg-slate-200 dark:bg-slate-700 w-full py-2 px-4 justify-between space-x-4 sm:space-x-6 md:space-x-10 text-xs">
      <div className="flex p-1 grow items-center w-full bg-slate-300 dark:bg-slate-800 rounded-lg">
        <input
          className="w-full p-1 sm:p-2 bg-transparent focus:outline-none font-mono placeholder:text-gray-500/80 dark:placeholder:text-gray-400/70"
          type="text"
          name="search"
          placeholder="Find Pokemon ..."
          value={currentQuery}
          onChange={(e) => setCurrentQuery(e.target.value.toLowerCase())}
        />
        {currentQuery.length > 0 && (
          <button
            className="px-4 primaryText text-red-500 dark:text-red-600"
            type="button"
            onClick={() => setCurrentQuery("")}
          >
            Clear
          </button>
        )}
      </div>
      <select
        className="p-2 sm:p-3 rounded-lg focus:outline-none bg-slate-300 dark:bg-slate-800"
        title="Select"
        value={viewGen}
        onChange={(event) => setViewGen(event.target.value)}
      >
        {options.map((option: any, i: number) => (
          <option className="w-full" key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenerationSelectorWithSearch;
