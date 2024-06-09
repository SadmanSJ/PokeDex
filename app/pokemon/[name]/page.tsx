import AbilityBox from "@/components/AbilityBox";
import TypeBox from "@/components/TypeBox";
import Image from "next/image";
import React, { Suspense } from "react";
import Sprites from "./Sprites";
import StatsBox from "@/components/StatsBox";
import MoveBox from "@/components/MoveBox";
import EvolutionBox from "@/components/EvolutionBox";

interface Props {
  params: { name: string };
  searchParams: {};
}

async function PokemonDetails({ params }: Props) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`);
  const pokemon = await res.json();

  const res2 = await fetch(pokemon.species.url);
  const species = await res2.json();

  return (
    <div className="font-kanit w-full h-full flex  p-4 text-slate-700 dark:text-slate-50">
      <div className="relative w-full grid grid-cols-1 sm:grid-cols-2 gap-6 place-content-center">
        <Sprites sprites={pokemon.sprites} />

        <div className="w-full flex flex-col item-start">
          <div className="flex items-center justify-center pt-3 mt-auto mx-auto">
            <div className="w-8 md:w-9 lg:w-10 xl:w-11 2xl:w-12 aspect-square">
              <Image
                src={"/Pokeball_logo.png"}
                alt="Pokeball Logo"
                width={60}
                height={60}
              />
            </div>
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-medium pl-1">
              #{pokemon.id}
            </p>
          </div>
          <div className="flex flex-col space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 xl:space-y-10 items-start py-2 font-kanit font-black mb-auto mx-auto">
            <h1 className="mx-auto pl-2 text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold capitalize">
              {pokemon.name}
            </h1>
            <div className="hidden sm:flex w-full items-center justify-center ">
              <TypeBox types={pokemon.types} size={"lg"} />
            </div>
          </div>
        </div>
        <div className="w-full flex sm:invisible items-center justify-center ">
          <TypeBox types={pokemon.types} size={"md"} />
        </div>
        <div className="w-full p-4 flex items-center justify-between primaryText">
          <div className="flex items-center space-x-4">
            <p>Height :</p>
            <p className="font-bold">{pokemon.height}</p>
          </div>
          <div className="flex items-center space-x-4">
            <p>Weight :</p>
            <p className="font-bold">{pokemon.weight}</p>
          </div>
        </div>
        <div className="w-full flex ">
          {/* <div className="flex space-x-4 text-xl py-3">
            <p>
              Height{" "}
              <span>
                {pokemon.height}
                {` "`}
              </span>
            </p>
            <p>
              Weight <span>{pokemon.weight} KG</span>
            </p>
          </div> */}
          <AbilityBox abilities={pokemon.abilities} />
          <p>{/* <AbilityBox abilities={pokemon.abilities} /> */}</p>
        </div>
        <StatsBox stats={pokemon.stats} />
        <div className="col-span-1 sm:col-span-2">
          <EvolutionBox species={species} />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <MoveBox moves={pokemon.moves} />
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
