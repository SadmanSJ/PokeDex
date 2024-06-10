import React, { Fragment } from "react";
import PokemonSprite from "./PokemonSprite";
import { formatName } from "@/functions/formatNames";

interface Props {
  species: any;
}

interface Details {
  gender: null;
  held_item: DetailsItem | null;
  item: DetailsItem | null;
  known_move: null;
  known_move_type: DetailsItem | null;
  location: DetailsItem | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: null;
  party_type: null;
  relative_physical_stats: null;
  time_of_day: "day" | "night" | null;
  trade_species: null;
  trigger: {
    name: "level-up" | "use-item" | "trade";
    url: string;
  };
  turn_upside_down: boolean;
}

interface DetailsItem {
  name: string;
  url: string;
}

export default async function EvolutionBox({ species }: Props) {
  const res = await fetch(species.evolution_chain.url);
  const evolutionChain = await res.json();

  return (
    <div className="flex flex-col items-center w-full labelText">
      Evolution Chain
      <div className="w-full flex justify-evenly space-x-4 overflow-auto">
        <Evolution chain={evolutionChain.chain} parent={null} />
      </div>
    </div>
  );
}

const Evolution = ({ chain, parent }: any) => {
  if (!chain) {
    return null;
  }

  const { species, evolves_to, evolution_details } = chain;

  const getEvolveMethod = (
    details: Details,
    parent: any,
    index: number,
    length: number
  ) => {
    let parentPokemon = formatName(parent.name);
    switch (details.trigger.name) {
      case "use-item":
        parentPokemon = ` on ${parentPokemon}`;
        const item = `Use ${formatName(details.item?.name || "")}`;
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center pt-2"
          >
            <p className="flex justify-center">{item + parentPokemon}</p>
            {index < length - 1 && <div className="pt-2">Or</div>}
          </div>
        );

      case "trade":
        parentPokemon = `Trade ${parentPokemon}`;
        const heldItem = details.held_item
          ? ` while holding ${formatName(details.held_item?.name || "")}`
          : "";
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center pt-2"
          >
            <p className="flex justify-center">{parentPokemon + heldItem}</p>
            {index < length - 1 && <div className="pt-2">Or</div>}
          </div>
        );

      case "level-up":
        parentPokemon = `Level Up ${parentPokemon}`;

        const minLevel = details.min_level ? ` to Lv${details.min_level}` : "";

        const minAffection = details.min_affection
          ? ` when Affection is over ${details.min_affection}`
          : "";
        const minHappiness = details.min_happiness
          ? ` when Happiness is over ${details.min_happiness}`
          : "";
        const timeOfDay = details.time_of_day
          ? ` during ${formatName(details.time_of_day)} Time`
          : "";

        const location = details.location
          ? ` near ${formatName(details.location.name)}`
          : "";

        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center pt-2"
          >
            <p className="flex justify-center">
              {parentPokemon +
                minLevel +
                minAffection +
                minHappiness +
                timeOfDay +
                location}
            </p>
            {index < length - 1 && <div className="pt-2">Or</div>}
          </div>
        );
      default:
        return <div key={index}></div>;
    }
  };

  return (
    <Fragment>
      <div className="w-full flex items-center justify-center">
        <div className="flex h-full flex-col items-center">
          <PokemonSprite name={species.name} />
          <div className="secondaryText text-center text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
            {evolution_details.map((details: Details, i: number) =>
              getEvolveMethod(details, parent, i, evolution_details.length)
            )}
          </div>
        </div>
      </div>
      {evolves_to.length > 0 &&
        evolves_to.map((m: any, i: number) => (
          <Evolution key={i} chain={m} parent={species} />
        ))}
    </Fragment>
  );
};
