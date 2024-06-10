import { formatName } from "@/functions/formatNames";
import React from "react";
import _ from "lodash";
import TypeBox from "./TypeBox";
import { Move, PokemonMove } from "@/interface";

interface Props {
  moves: PokemonMove[];
  title: string;
}

export default async function MoveBox({ moves, title }: Props) {
  const data = await Promise.all(
    moves.map((m) => fetch(m.move.url).then<Move>((res) => res.json()))
  );

  return (
    <div className="w-full">
      <div className="labelText py-3">{title}</div>
      <div className="flex justify-between space-x-2">
        <div className="w-full border-2 border-slate-300 dark:border-slate-600 primaryText flex justify-between pl-2 pr-4 md:pr-6 lg:pr-8">
          <div>Move Name</div>
          <div>Type</div>
        </div>
        <div className="w-full hidden sm:inline-flex border-2 border-slate-300 dark:border-slate-600 primaryText justify-between pl-2 pr-4 md:pr-6 lg:pr-8">
          <div>Move Name</div>
          <div>Type</div>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2">
        {_.sortBy(moves, [
          // "move.name",
          "version_group_details.0.move_learn_method.name",
          "version_group_details.0.level_learned_at",
          "move.name",
        ]).map((move, i) => {
          const currentMove = data.find((f) => f.name === move.move.name);
          if (!currentMove) return <tr key={i}></tr>;

          return (
            <div
              key={i}
              className="border-b border-slate-300 dark:border-slate-600 transition-all"
            >
              <div className="w-full text-left py-2 sm:py-4 md:py-6">
                <details className="w-full">
                  <summary className="primaryTextFocused list-none pl-2 cursor-pointer flex items-center justify-between">
                    {formatName(move.move.name)}
                    <div>
                      <TypeBox type={currentMove.type} size={"xs"} />
                    </div>
                  </summary>
                  <div className="secondaryText dark:bg-slate-600 rounded-lg p-2">
                    <div className="px-2 italic font-semibold pb-2">
                      {currentMove.effect_entries[0]?.effect}
                    </div>
                    <div className="grid grid-cols-2 gap-2 place-items-center w-full py-2 border border-slate-400 rounded-md my-2 font-mono">
                      <div>{DamageType[currentMove.damage_class.name]}</div>
                      <div>Accuracy : {currentMove.accuracy || "---"}</div>
                      <div>Power : {currentMove.power || "---"}</div>
                      <div>PP : {currentMove.pp}</div>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="labelText py-3">{title}</div>

      <table className="table w-full transition-all">
        <thead>
          <tr className="border-2 border-slate-300 dark:border-slate-600 primaryText flex justify-between pl-2 pr-4 md:pr-6 lg:pr-8">
            <th>Move Name</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {_.sortBy(moves, [
            // "move.name",
            "version_group_details.0.move_learn_method.name",
            "version_group_details.0.level_learned_at",
            "move.name",
          ]).map((move, i) => {
            const currentMove = data.find((f) => f.name === move.move.name);
            if (!currentMove) return <tr key={i}></tr>;
            return (
              <tr
                key={i}
                className="border-b border-slate-300 dark:border-slate-600 transition-all`"
              >
                <td
                  className="w-full text-left py-2 sm:py-4 md:py-6"
                  colSpan={2}
                >
                  <details className="w-full">
                    <summary className="primaryTextFocused list-none pl-2 cursor-pointer flex items-center justify-between">
                      {formatName(move.move.name)}
                      <div>
                        <TypeBox type={data[i].type} size={"xs"} />
                      </div>
                    </summary>
                    <div className="secondaryText dark:bg-slate-600 rounded-lg p-2">
                      <div className="px-2 italic font-semibold pb-2">
                        {currentMove.effect_entries[0]?.effect}
                      </div>
                      <div className="grid grid-cols-2 gap-2 place-items-center w-full py-2 border border-slate-400 rounded-md my-2 font-mono">
                        <div>{DamageType[currentMove.damage_class.name]}</div>
                        <div>Accuracy : {currentMove.accuracy || "---"}</div>
                        <div>Power : {currentMove.power || "---"}</div>
                        <div>PP : {currentMove.pp}</div>
                      </div>
                      <div>
                        {`This move can be learned by ${formatName(
                          move.version_group_details[0].move_learn_method
                            .name === "egg"
                            ? "Breeding"
                            : move.version_group_details[0].move_learn_method
                                .name
                        )}${
                          move.version_group_details[0].move_learn_method
                            .name === "egg"
                            ? ""
                            : move.version_group_details[0].level_learned_at
                            ? " at Lv" +
                              move.version_group_details[0].level_learned_at
                            : " at any Lv"
                        }.`}
                      </div>
                    </div>
                  </details>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const DamageType: any = {
  physical: (
    <div className="p-2 text-yellow-300 bg-red-500 text-xs rounded-lg shadow-md">
      Physical
    </div>
  ),
  special: (
    <div className="p-2 text-sky-300 bg-indigo-500 text-xs rounded-lg shadow-md">
      Special
    </div>
  ),
  status: (
    <div className="p-2 text-yellow-300 bg-gray-500 text-xs rounded-lg shadow-md">
      Status
    </div>
  ),
};
