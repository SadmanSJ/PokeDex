import React, { Fragment } from "react";
import Pokemon from "./Pokemon";

interface Props {
  species: any;
}

export default async function EvolutionBox({ species }: Props) {
  const res = await fetch(species.evolution_chain.url);
  const evolutionChain = await res.json();

  return (
    <div className="flex flex-col items-center w-full labelText">
      Evolution Chain
      <div className="w-full flex justify-center">
        <Evolution chain={evolutionChain.chain} />
      </div>
    </div>
  );
}

const Evolution = ({ chain }: any) => {
  if (!chain) {
    return null;
  }

  const { species, evolves_to, evolution_details } = chain;

  // console.log(evolution_details);

  return (
    <Fragment>
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Pokemon name={species.name} />
          <div className="secondaryText text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            {evolution_details[0]?.min_level
              ? "At Level " + evolution_details[0]?.min_level
              : "Baby"}
          </div>
        </div>
      </div>
      {evolves_to.length > 0 &&
        evolves_to.map((m: any, i: number) => <Evolution key={i} chain={m} />)}
    </Fragment>
  );
};
