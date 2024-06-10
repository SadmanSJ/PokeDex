import { formatName } from "@/functions/formatNames";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  name: any;
}
async function PokemonSprite({ name }: Props) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();

  //   console.log(pokemon.sprites);

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="flex flex-col items-center"
    >
      <div className="w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 2xl:w-44 aspect-square pt-4">
        <Image
          className="dark:brightness-90"
          src={pokemon.sprites.other.home.front_default}
          alt={pokemon.name}
          width={300}
          height={300}
          draggable={false}
        />
      </div>
      <div className="primaryTextFocused text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
        {formatName(pokemon.name)}
      </div>
    </Link>
  );
}

export default PokemonSprite;
