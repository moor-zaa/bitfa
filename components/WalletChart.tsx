"use client";

import React from "react";
import TradingChart from "./TradingChart";
import useWalletSummary from "@/hooks/useWalletSummary";

const WalletChart = ({ walletAddress }: { walletAddress: string }) => {
  const [chartData] = useWalletSummary(walletAddress);

  return (
    <div className="w-[calc(100vw-300px)]">
      {chartData && chartData.labels && chartData.labels.length > 0 ? (
        <TradingChart data={chartData} />
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default WalletChart;
