import { PokemonSprites } from "@/interface";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  sprites: PokemonSprites;
}
function Sprites({ sprites }: Props) {
  // const [profile, setProfile] = useState("front_default");
  return (
    <div className="shrink-0 aspect-square pt-4 bg-gradient-to-t from-slate-50 dark:from-slate-800/30 via-transparent to-transparent rounded-full">
      <div className="w-full p-4 md:p-0">
        <Image
          src={sprites.other["official-artwork"].front_default}
          alt={"sprite"}
          width={700}
          height={700}
          draggable={false}
          priority
        />
      </div>
      {/* <div className="flex justify-between">
        <button onClick={() => setProfile("front_default")}>Regular</button>
        <button onClick={() => setProfile("front_shiny")}>Shiny</button>
      </div> */}
    </div>
  );
}

export default Sprites;
