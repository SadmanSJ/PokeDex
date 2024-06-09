import Image from "next/image";
import React from "react";
import TypeBox from "../TypeBox";
import Link from "next/link";
import { GetSpriteURL } from "@/functions/getSprite";
import { Pokemon } from "@/interface";

interface Props {
  pokemon: Pokemon;
}

async function HomeCard({ pokemon }: Props) {
  // console.log(
  //   GetSpriteURL.pokemon({
  //     id: pokemon.id,
  //     spriteType: "home",
  //   }),
  //   pokemon.sprites.other.home
  // );

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center rounded-lg bg-gray-100 dark:bg-slate-800 border shadow-lg dark:border-gray-800 p-4 m-2 font-kanit">
      <div className="absolute top-2 left-2 flex  items-center">
        <Image
          src={"/Pokeball_logo.png"}
          alt="Pokeball Logo"
          width={40}
          height={40}
        />
        <p className="text-2xl font-bold pl-2">{pokemon.id}</p>
      </div>
      <Link
        href={`/pokemon/${pokemon.name}`}
        className="w-full aspect-square pt-4"
      >
        <Image
          className="dark:brightness-90"
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          width={300}
          height={300}
          draggable={false}
        />
      </Link>
      <h3 className="font-bold text-3xl capitalize p-4">{pokemon.name}</h3>
      <TypeBox types={pokemon.types} />
    </div>
  );
}

export default HomeCard;
