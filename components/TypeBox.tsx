import React from "react";
import { tv } from "tailwind-variants";

interface Props {
  type?: any;
  types?: any[];
  size?: "xs" | "md" | "sm" | "lg";
}

function TypeBox({ types, size, type }: Props) {
  const pokeType = type ? [{ type }] : types || [];
  const typeColor = tv({
    base: `px-2 py-1 flex items-center justify-center capitalize shadow-md text-gray-100 font-semibold`,
    variants: {
      size: {
        xs: "text-sm sm:text-lg md:text-xl lg:text-2xl xl:text-3xl rounded-sm min-w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32 2xl:w-36",
        sm: "text-md rounded-sm",
        md: "text-xl rounded-md min-w-24",
        lg: "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl  rounded-lg w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 2xl:w-40",
      },
    },
    defaultVariants: {
      size: "md",
    },
  });

  return (
    <div className="flex space-x-3 p-2 w-fit mx-auto">
      {pokeType.map((m, i) => (
        <div
          key={i}
          className={typeColor({ size: size })}
          style={{
            backgroundColor: colors[m.type.name],
          }}
        >
          <p className="text-white">{m.type.name}</p>
        </div>
      ))}
    </div>
  );
}

export default TypeBox;

const types = [
  {
    name: "normal",
    bgColor: "",
    fgColor: "",
  },
  {
    name: "fighting",
    url: "https://pokeapi.co/api/v2/type/2/",
  },
  {
    name: "flying",
    url: "https://pokeapi.co/api/v2/type/3/",
  },
  {
    name: "poison",
    url: "https://pokeapi.co/api/v2/type/4/",
  },
  {
    name: "ground",
    url: "https://pokeapi.co/api/v2/type/5/",
  },
  {
    name: "rock",
    url: "https://pokeapi.co/api/v2/type/6/",
  },
  {
    name: "bug",
    url: "https://pokeapi.co/api/v2/type/7/",
  },
  {
    name: "ghost",
    url: "https://pokeapi.co/api/v2/type/8/",
  },
  {
    name: "steel",
    url: "https://pokeapi.co/api/v2/type/9/",
  },
  {
    name: "fire",
    url: "https://pokeapi.co/api/v2/type/10/",
  },
  {
    name: "water",
    url: "https://pokeapi.co/api/v2/type/11/",
  },
  {
    name: "grass",
    url: "https://pokeapi.co/api/v2/type/12/",
  },
  {
    name: "electric",
    url: "https://pokeapi.co/api/v2/type/13/",
  },
  {
    name: "psychic",
    url: "https://pokeapi.co/api/v2/type/14/",
  },
  {
    name: "ice",
    url: "https://pokeapi.co/api/v2/type/15/",
  },
  {
    name: "dragon",
    url: "https://pokeapi.co/api/v2/type/16/",
  },
  {
    name: "dark",
    url: "https://pokeapi.co/api/v2/type/17/",
  },
  {
    name: "fairy",
    url: "https://pokeapi.co/api/v2/type/18/",
  },
  {
    name: "stellar",
    url: "https://pokeapi.co/api/v2/type/19/",
  },
  {
    name: "unknown",
    url: "https://pokeapi.co/api/v2/type/10001/",
  },
];

const colors: any = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};
