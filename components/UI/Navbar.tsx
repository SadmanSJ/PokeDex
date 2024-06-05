import Image from "next/image";
import React from "react";
import ThemeChangeButton from "../Buttons/ThemeChangeButton";
import Link from "next/link";

function Navbar() {
  return (
    <div className="w-full h-20 sticky top-0 z-30 bg-slate-400 shadow-lg dark:bg-slate-800">
      <div className="w-full h-full container mx-auto flex items-center justify-between">
        <Link href={"/"} className="h-16 container mx-auto transition-all">
          <Image
            className="h-full"
            style={{ width: "auto" }}
            src={"/Pokedex_logo.png"}
            alt="Logo"
            width={387}
            height={140}
          />
        </Link>
        <div>
          <ThemeChangeButton />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
