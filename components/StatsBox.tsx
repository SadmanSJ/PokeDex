"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useTheme } from "next-themes";
import { formatName } from "@/functions/formatNames";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
}

function StatsBox({ stats }: Props) {
  const { theme, systemTheme } = useTheme();

  const textColor =
    theme === "system"
      ? systemTheme === "dark"
        ? "white"
        : "black"
      : theme === "dark"
      ? "white"
      : "black";

  const data: ChartData<"bar"> = {
    labels: stats.map((stat) =>
      formatName(stat.stat.name.replace("special", "sp."))
    ),
    datasets: [
      {
        label: "Base Stat",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: stats.map((stat) => stat.base_stat),
        barThickness: 30, // Increase bar thickness
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // This makes the bar chart horizontal
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: false,
          text: "Base Stat",
          font: {
            size: 20, // Increase x-axis title font size
          },
        },
        ticks: {
          font: {
            size: 15, // Increase x-axis ticks font size
          },
          color: textColor,
        },
      },
      y: {
        title: {
          display: false,
          text: "Stats",
          font: {
            size: 20, // Increase y-axis title font size
          },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: 15, // Increase y-axis ticks font size
          },
          color: textColor,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        labels: {
          font: {
            size: 18, // Increase legend font size
          },
        },
      },
      title: {
        display: true,
        text: "Base Stats",
        font: {
          size: 24, // Increase chart title font size
        },
        color: textColor,
      },
    },
  };

  return (
    <div className="w-full h-96 flex dark:bg-slate-600 p-3 rounded-xl">
      <Bar options={options} data={data} />
    </div>
  );
}

export default StatsBox;
