import { PokemonSprites } from "@/interface";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  source: string;
  spriteProfile?: string;
}
function Sprites({ source, spriteProfile }: Props) {
  // const [profile, setProfile] = useState("front_default");
  const type = spriteProfile?.split("_")[1];
  return (
    <div className="flex flex-col items-center justify-center shrink-0 aspect-square pt-4 bg-gradient-to-t from-slate-50 dark:from-slate-800/30 via-transparent to-transparent rounded-full">
      <div className="w-full p-4 md:p-0">
        <Image
          src={source}
          alt={"sprite"}
          width={700}
          height={700}
          draggable={false}
          priority
        />
      </div>
      {spriteProfile && (
        <div className="capitalize font-mono text-xs text-slate-400 dark:text-slate-400 mb-2">
          {type}
        </div>
      )}
      {/* <div className="flex justify-between">
        <button onClick={() => setProfile("front_default")}>Regular</button>
        <button onClick={() => setProfile("front_shiny")}>Shiny</button>
      </div> */}
    </div>
  );
}

export default Sprites;
