import Image from "next/image";
import React from "react";

export default function LoadingComponent() {
  return (
    <div className="w-full h-[80vh] flex grow items-center justify-center">
      <Image
        className="animate-spin w-52 lg:w-60 opacity-50"
        src={"/Pokeball_flat.png"}
        alt="Pokeball"
        width={300}
        height={300}
        priority
      />
    </div>
  );
}
