import GenerationSelectorWithSearch from "@/components/UI/GenerationSelectorWithSearch";
import PokemonList from "@/components/UI/PokemonList";
import { Generation } from "@/interface";
import { pokeApi } from "@/secret/api";

import { Suspense } from "react";

interface PageProps {
  searchParams: { viewGen: string; query: string };
}

const fetchGeneration = async (selectedValue: any) => {
  const [resource, id] = selectedValue.split("-");
  const url = `${pokeApi}${resource}/${id}/`;
  const generation = await fetch(url).then<Generation>((res) => res.json());
  return generation;
};

export default async function Home({ searchParams }: PageProps) {
  const viewGen = searchParams.viewGen || "generation-1";
  const query = searchParams.query || "";

  const generation = await fetchGeneration(viewGen);

  const generationList = await fetch(pokeApi + "generation").then((res) =>
    res.json()
  );

  return (
    <div className="w-full py-4 flex  flex-col-reverse sm:flex-col transition-all">
      <Suspense fallback={<div>Loading...</div>}>
        <GenerationSelectorWithSearch
          generationList={generationList}
          currentGen={viewGen}
          query={query}
        />
      </Suspense>
      <PokemonList
        species={generation.pokemon_species.filter((f) =>
          f.name.includes(searchParams.query || "")
        )}
        region={generation.main_region}
      />
    </div>
  );
}
