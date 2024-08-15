"use client";

import ArrowSvg from "@/components/ArrowSvg";
import Button from "@/components/Button";
import useWallets from "@/hooks/useWallets";
import { useState } from "react";
import COLORS from "../constants/colors";
import Image from "next/image";
import MultipleArrowSvg from "@/components/MultipleArrowSvg";

const SORT = {
  ASC: "asc",
  DEC: "desc",
};

const HomePage = () => {
  const [wallets, getWallets, page, setPage, setSortOrder, loading] =
    useWallets();

  const [sort, setSort] = useState<string | null>();

  const handleSort = () => {
    if (sort === "asc") {
      setSort(SORT.DEC);
      setSortOrder(SORT.DEC);
    } else if (sort === "desc") {
      setSort(undefined);
      setSortOrder(undefined);
    } else {
      setSort(SORT.ASC);
      setSortOrder(SORT.ASC);
    }
  };

  const handlePage = (value: number) => {
    setPage(value);
    getWallets(value);
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        {loading ? (
          <div className="w-full h-[300px] flex justify-center items-center">
            Loading ....
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr>
                  <th>Wallet Address</th>
                  <th
                    onClick={handleSort}
                    className="cursor-pointer flex gap-4 items-center"
                  >
                    <p>Net Profit</p>
                    <div>
                      {sort ? <ArrowSvg sort={sort} /> : <MultipleArrowSvg />}
                    </div>
                  </th>
                  <th>Winrate</th>
                </tr>
              </thead>
              <tbody>
                {wallets &&
                  wallets.length > 0 &&
                  wallets.map((wallet: any) => (
                    <tr key={wallet.walletAddress}>
                      <td className="flex items-center gap-4">
                        <div className="bg-[#0c0c0f] p-1 rounded-md">
                          <Image
                            src={"/dextrading-logo.svg"}
                            width={24}
                            height={24}
                            alt="logo"
                          />
                        </div>
                        <a href={`/wallet/${wallet.walletAddress}`}>
                          {wallet.walletAddress}
                        </a>
                      </td>
                      <td>{wallet.netProfit}</td>
                      <td
                        className="text-sm"
                        style={{
                          color:
                            wallet.winRate <= 10
                              ? COLORS.RED
                              : wallet.winRate < 30
                              ? COLORS.ORANGE
                              : wallet.winRate < 50
                              ? COLORS.YELLOW
                              : wallet.winRate <= 100
                              ? COLORS.GREEN
                              : "white",
                        }}
                      >
                        {wallet.winRate.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="w-full flex justify-center">
              <Button
                disabled={page === 1}
                className="mx-2"
                label="Prev"
                onClick={() => handlePage(page - 1)}
              />
              <Button
                className="mx-2"
                label="Next"
                onClick={() => handlePage(page + 1)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
