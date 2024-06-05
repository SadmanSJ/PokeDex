import ThemeChangeButton from "@/components/Buttons/ThemeChangeButton";
import HomeCard from "@/components/UI/HomeCard";
import Image from "next/image";

export default async function Home() {
  const res = await fetch(
    "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
  );
  const data = await res.json();
  const allResponse = await Promise.all(
    data.results.map((m: any) => fetch(m.url))
  );

  const allPokemon = await Promise.all(allResponse.map((m: any) => m.json()));

  return (
    <div className="w-full py-4 transition-all">
      <div className="text-3xl p-4">Kento Pokemon</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full place-content-center">
        {allPokemon.map((m: any, i: number) => (
          <HomeCard key={i} pokemon={m} />
        ))}
      </div>
    </div>
  );
}
