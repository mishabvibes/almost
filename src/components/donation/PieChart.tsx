"use client"
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data: ChartData<"pie"> = {
    labels: ["Yatheem", "Hafiz", "Building", "General"],
    datasets: [
      {
        data: [300, 50, 100, 40],
        backgroundColor: [
          "rgba(52, 211, 153, 0.8)", // Emerald
          "rgba(16, 185, 129, 0.8)", // Green
          "rgba(5, 150, 105, 0.8)",  // Dark Green
          "rgba(4, 120, 87, 0.8)",   // Forest Green
        ],
        hoverBackgroundColor: [
          "rgba(52, 211, 153, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(5, 150, 105, 1)",
          "rgba(4, 120, 87, 1)",
        ],
        borderWidth: 2,
        borderColor: "white",
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          color: "rgba(0, 0, 0, 0.8)",
          font: {
            size: 14,
            weight: "bold",
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
          weight: "bold",
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        cornerRadius: 8,
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-lg shadow-xl max-w-2xl mx-auto p-6">
      <div className="space-y-1 mb-6">
        <h2 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-200">
          Distribution Overview
        </h2>
        <p className="text-sm text-emerald-600 dark:text-emerald-400">
          Fund allocation across different categories
        </p>
      </div>
      <div className="aspect-square w-full max-w-md mx-auto">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;