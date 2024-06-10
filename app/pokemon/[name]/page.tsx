import AbilityBox from "@/components/AbilityBox";
import TypeBox from "@/components/TypeBox";
import Image from "next/image";
import React, { Suspense } from "react";
import Sprites from "./Sprites";
import StatsBox from "@/components/StatsBox";
import MoveBox from "@/components/MoveBox";
import EvolutionBox from "@/components/EvolutionBox";
import { Pokemon, PokemonSpecies } from "@/interface";
import { formatName } from "@/functions/formatNames";
import Link from "next/link";
import PokemonSprite from "@/components/PokemonSprite";

interface Props {
  params: { name: string };
  searchParams: {};
}

async function PokemonDetails({ params }: Props) {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.name}`,
    { next: { revalidate: 5000 } }
  ).then<Pokemon>((res) => res.json());

  const species = await fetch(pokemon.species.url, {
    next: { revalidate: 5000 },
  }).then<PokemonSpecies>((res) => res.json());

  const movesLearnMethods: string[] = [
    ...new Set(
      pokemon.moves.map(
        (obj) => obj.version_group_details[0].move_learn_method.name
      )
    ),
  ].sort((a, b) => b.length - a.length);

  const renameMethod = (method: string) => {
    switch (method) {
      case "egg":
        return "breeding";
      case "machine":
        return "TM";
      default:
        return method;
    }
  };

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
            <div className="flex w-full items-center justify-center ">
              <TypeBox types={pokemon.types} size={"lg"} />
            </div>
          </div>
        </div>

        <div className="w-full p-4 flex flex-col items-center justify-between primaryText">
          {species.evolves_from_species && (
            <div className=" w-full flex items-center justify-between space-x-4">
              <p>Evolve from :</p>
              <Link href={"#evolution-chain"} className="font-bold">
                {formatName(species.evolves_from_species.name)}
              </Link>
            </div>
          )}
          <div className=" w-full flex items-center justify-between space-x-4">
            <p>Height :</p>
            <p className="font-bold">{pokemon.height} m</p>
          </div>
          <div className=" w-full flex items-center justify-between space-x-4">
            <p>Weight :</p>
            <p className="font-bold">{pokemon.weight} kg</p>
          </div>
          <div className=" w-full flex items-center justify-between space-x-4">
            <p>Capture Rate :</p>
            <p className="font-bold">{species.capture_rate}%</p>
          </div>
          <div className=" w-full flex items-center justify-between space-x-4">
            <p>Base Happiness :</p>
            <p className="font-bold">{species.base_happiness}</p>
          </div>
          <div className=" w-full flex items-center justify-between space-x-4">
            <p>Growth Rate :</p>
            <p className="font-bold">{formatName(species.growth_rate.name)}</p>
          </div>
        </div>
        <div className="w-full flex ">
          <AbilityBox abilities={pokemon.abilities} />
        </div>

        <div className="col-span-1 sm:col-span-2">
          <StatsBox stats={pokemon.stats} />
        </div>
        {species.varieties.length > 1 && (
          <div className="col-span-1 sm:col-span-2 w-full flex flex-col items-center justify-center px-2">
            <div className="labelText">Variants</div>
            <div className="w-full flex items-center justify-evenly overflow-auto space-x-6">
              {species.varieties.map((m, i) => (
                <PokemonSprite key={i} name={m.pokemon.name} />
              ))}
            </div>
          </div>
        )}
        <div
          id="evolution-chain"
          className="col-span-1 sm:col-span-2 scroll-m-24"
        >
          <EvolutionBox species={species} />
        </div>
        {movesLearnMethods.map((method, i) => {
          const moves = pokemon.moves.filter(
            (f) => f.version_group_details[0].move_learn_method.name === method
          );
          return (
            <div key={i} className={`col-span-1 sm:col-span-2`}>
              <MoveBox
                moves={moves}
                title={`Moves Learned By ${formatName(renameMethod(method))}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonDetails;
