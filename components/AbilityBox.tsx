import { formatName } from "@/functions/formatNames";
import React from "react";

interface Props {
  abilities: any[];
}
async function AbilityBox({ abilities }: Props) {
  const res = await Promise.all(abilities.map((m) => fetch(m.ability.url)));
  const data = await Promise.all(res.map((m) => m.json()));

  return (
    <div className="relative w-full text-xl p-3 bg-slate-100 dark:bg-slate-600 rounded-lg font-kanit">
      <div className="w-full py-2 border-b-2 labelText">Abilities</div>
      {data.map((m, i) => (
        <div
          key={i}
          className={`flex flex-col py-2 ${
            data.length - 1 > i ? "border-b" : ""
          }  dark:border-slate-500`}
        >
          <div className="flex items-center primaryTextFocused">
            <div>{formatName(m.name)}</div>
            <div className="pl-2 text-slate-500 dark:text-slate-200/50">
              {abilities[i].is_hidden ? "(Hidden)" : ""}
            </div>
          </div>
          <div className="w-full pt-2 secondaryText">
            {
              m.flavor_text_entries.find((f: any) => f.language.name === "en")
                .flavor_text
            }
          </div>
        </div>
      ))}
    </div>
  );
}

export default AbilityBox;
