import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import COLORS from "@/constants/colors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
  BarController
);

const TradingChart = ({ data }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: data.labels,
        title: {
          display: true,
          text: "Month",
          color: COLORS.GRAY,
        },
      },
      y: {
        // Left y-axis setup for Dollar Volume
        type: "linear",
        display: true,
        position: "left",
        title: {
          display: true,
          text: "Dollar Volume",
          color: COLORS.BLUE,
        },
        ticks: {
          color: COLORS.BLUE,
        },
      },
      y1: {
        // Right y-axis setup for Total Buy & Sell Times
        type: "linear",
        display: true,
        position: "right",
        title: {
          display: true,
          text: "Total Buy & Sell Times",
          color: COLORS.GREEN,
        },
        ticks: {
          color: COLORS.GREEN,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default TradingChart;
