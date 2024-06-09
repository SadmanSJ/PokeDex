export class GetSpriteURL {
  private static SpriteType = {
    home: "other/home/",
    dreamWorld: "other/dream-world/",
    officialArtwork: "other/official-artwork/",
    showdown: "other/showdown/",
  };

  public static pokemon({
    id,
    spriteType,
    shiny,
    female,
    back,
  }: {
    id: number;
    spriteType?: "home" | "dream-world" | "official-artwork" | "showdown";
    back?: boolean;
    female?: boolean;
    shiny?: boolean;
  }) {
    const url =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      `${spriteType ? `other/${spriteType}/` : ""}`;

    return (
      url +
      `${back ? "back/" : ""}` +
      `${shiny ? "shiny/" : ""}` +
      `${female ? "female/" : ""}` +
      id +
      ".png"
    );
  }

  public static item({ name }: { name: string }) {
    const url =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/";

    return url + name;
  }
}
