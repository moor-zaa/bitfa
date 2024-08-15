"use client";

import axios from "axios";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useImmer } from "use-immer";

interface Wallet {
  netProfit: number;
  traderName: string;
  walletAddress: string;
  winRate: number;
}

const useWallets = (): [
  Wallet[],
  (page: number) => void,
  number,
  Dispatch<SetStateAction<number>>,
  Dispatch<SetStateAction<string | undefined>>,
  boolean
] => {
  const [wallets, setWallets] = useImmer([]);
  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  const fetchWallets = useCallback(() => {
    setLoading(true);
    axios
      .get("https://onchain.dextrading.com/valuable_wallets", {
        params: {
          network: "eth",
          page: page,
          limit: 5,
          sortBy: sortOrder && "netProfit",
          sortOrder,
        },
      })
      .then((res: any) => {
        setWallets(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setWallets, page, sortOrder]);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return [wallets, fetchWallets, page, setPage, setSortOrder, loading];
};

export default useWallets;
