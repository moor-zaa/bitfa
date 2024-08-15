import COLORS from "@/constants/colors";
import { useCallback, useEffect, useState } from "react";

interface DatasetProps {
  type: string;
  label: string;
  data: any[];
  borderColor: string[] | string;
  backgroundColor: string[] | string;
  yAxisID: string;
  cubicInterpolationMode?: string;
  tension?: number;
}

const useWalletSummary = (walletAddress: string) => {
  const [chartData, setChartData] = useState<{
    labels: string[] | null;
    datasets: DatasetProps[] | null;
  }>({
    labels: [],
    datasets: [],
  });

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://onchain.dextrading.com/walletsummary/${walletAddress}?network=eth`,
        {
          // cache: "force-cache",
          next: {
            revalidate: 60,
          },
        }
      );

      const res = await response.json();

      let temp = {
        sellVolume: res.totalSellAmounts.month,
        buyVolume: res.totalBuyAmounts.month,
        totalSellTimes: res.totalSellTimes.month,
        totalBuyTimes: res.totalBuyTimes.month,
      };
      let totalBuySellTimes: any[] = [];
      let netVolumes: any[] = [];
      const months = Object.keys(temp.sellVolume).sort();
      months.forEach((item) => {
        totalBuySellTimes.push(
          temp.totalSellTimes[item] + temp.totalBuyTimes[item]
        );

        netVolumes.push(+temp.buyVolume[item] - +temp.sellVolume[item]);
      });

      const newChartData = {
        labels: months,
        datasets: [
          {
            type: "line",
            label: "Total Buy & Sell Times",
            data: totalBuySellTimes,
            borderColor: COLORS.BLUE,
            backgroundColor: "transparent",
            yAxisID: "y1",
            cubicInterpolationMode: "monotone",
            tension: 0.1,
          },
          {
            type: "bar",
            label: "Net Buy/Sell Volume",
            data: netVolumes,
            backgroundColor: netVolumes.map((v) =>
              v < 0 ? COLORS.RED : COLORS.GREEN
            ),
            borderColor: netVolumes.map((v) =>
              v < 0 ? COLORS.RED : COLORS.GREEN
            ),
            yAxisID: "y",
          },
        ],
      };

      setChartData(newChartData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }, [walletAddress]);

  useEffect(() => {
    fetchData();
  }, [walletAddress, fetchData]);

  return [chartData];
};

export default useWalletSummary;
