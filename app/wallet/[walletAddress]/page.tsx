import WalletChart from "@/components/WalletChart";
import React from "react";

const WalletPage = ({ params }: any) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="bg-[#121416] p-4 my-4 rounded-xl">
        <h1>Wallet Activity for: {params.walletAddress}</h1>
      </div>

      <WalletChart walletAddress={params.walletAddress} />
    </div>
  );
};

export default WalletPage;
