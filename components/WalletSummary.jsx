import axios from "axios";
import COLORS from "@/constants/colors";
import WalletSummary from "@/components/WalletSummary";

export const getServerSideProps = async (context) => {
  const { walletAddress } = context.query;

  try {
    const response = await axios.get(
      `https://onchain.dextrading.com/walletsummary/${walletAddress}`,
      {
        params: { network: "eth" },
      }
    );

    let temp = {
      sellVolume: response.data.totalSellAmounts.month,
      buyVolume: response.data.totalBuyAmounts.month,
      totalSellTimes: response.data.totalSellTimes.month,
      totalBuyTimes: response.data.totalBuyTimes.month,
    };

    const months = Object.keys(temp.sellVolume).sort();
    const totalBuySellTimes = months.map(
      (month) => temp.totalSellTimes[month] + temp.totalBuyTimes[month]
    );
    const netVolumes = months.map(
      (month) => temp.buyVolume[month] - temp.sellVolume[month]
    );

    const initialData = {
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

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      props: {
        initialData: {
          labels: [],
          datasets: [],
        },
      },
    };
  }
};

export default WalletSummary;
