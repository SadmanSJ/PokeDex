import { formatName } from "@/functions/formatNames";
import React from "react";
import _ from "lodash";
import TypeBox from "./TypeBox";

interface Props {
  moves: any[];
}

export default async function MoveBox({ moves }: Props) {
  const res = await Promise.all(moves.map((m) => fetch(m.move.url)));
  const data = await Promise.all(res.map((m) => m.json()));

  console.log(data);
  return (
    <div className="w-full">
      <div className="labelText py-3">Move List</div>
      <table className="table w-full transition-all">
        <thead>
          <tr className="border-2 border-slate-300 dark:border-slate-600 primaryText">
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
          ]).map((move, i) => (
            <tr
              key={i}
              className="border-b border-slate-300 dark:border-slate-600"
            >
              <td className="text-left py-2 sm:py-4 md:py-6">
                <div className="primaryTextFocused">
                  {formatName(move.move.name)}
                </div>
                <div className="secondaryText">
                  {`This move can be learned by ${formatName(
                    move.version_group_details[0].move_learn_method.name
                  )} at ${
                    move.version_group_details[0].level_learned_at
                      ? "Lv " + move.version_group_details[0].level_learned_at
                      : "any Lv."
                  }`}
                </div>
              </td>
              <td>
                <TypeBox type={data[i].type} size={"xs"} />
              </td>

              {}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
