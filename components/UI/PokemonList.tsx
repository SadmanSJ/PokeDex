import React from "react";
import HomeCard from "./HomeCard";
import _ from "lodash";
import { formatName } from "@/functions/formatNames";
interface Props {
  species: any[];
  region: any;
}

export default async function PokemonList({ species, region }: Props) {
  const pokemon = await Promise.all(
    species.map((m: any) =>
      fetch("https://pokeapi.co/api/v2/pokemon/" + m.name, {
        next: { revalidate: 5000 },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err))
    )
  );

  if (pokemon.length < 1)
    return (
      <div className="flex p-4 text-center items-center justify-center h-[70vh] secondaryText">
        No Pokemon Found. Try on different Generation
      </div>
    );

  return (
    <div className="w-full py-4 transition-all">
      <div className="text-3xl p-4 primaryTextFocused">
        {formatName(region.name)} Region
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full place-content-center">
        {_.sortBy(pokemon, ["id"]).map((m: any, i: number) => (
          <HomeCard key={i} pokemon={m} />
        ))}
      </div>
    </div>
  );
}
