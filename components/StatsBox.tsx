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
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
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

  const currentTheme =
    theme === "system"
      ? systemTheme === "dark"
        ? "dark"
        : "light"
      : theme === "dark"
      ? "dark"
      : "light";

  const textColor = currentTheme === "dark" ? "white" : "black";

  const data: ChartData<"bar"> = {
    labels: stats.map((stat) =>
      formatName(stat.stat.name.replace("special", "sp."))
    ),
    datasets: [
      {
        label: "Effort",
        backgroundColor: "rgba(0, 50, 255, 0.4)",
        borderColor: "rgba(10, 120, 250, 1)",
        borderWidth: 1,
        data: stats.map((stat) => stat.effort),
        datalabels: {
          // color: "rgba(75, 192, 192, 1)",
          anchor: "end",
          align: "right",
        },
      },
      {
        label: "Base Stat",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: stats.map((stat) => stat.base_stat),
        barThickness: 30, // Increase bar thickness
        datalabels: {
          // color: "rgba(75, 192, 192, 1)",
          anchor: "end",
          align: "left",
        },
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // This makes the bar chart horizontal
    scales: {
      x: {
        beginAtZero: true,
        // stacked: true,
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
        stacked: true,
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
        display: true,
        labels: {
          color: textColor,
          font: {
            size: 18, // Increase legend font size
          },
        },
      },
      title: {
        display: true,
        text: "Stats",
        font: {
          size: 24, // Increase chart title font size
        },
        color: textColor,
      },
      datalabels: {
        color: textColor,
        font: {
          size: 15,
        },
        formatter: (value) => (value === 0 ? null : value.toString()), // Display the value as a string
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
