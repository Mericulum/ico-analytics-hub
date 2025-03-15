
// This file exports all cryptocurrencies from separate category files
import { Cryptocurrency } from "@/types/compare";
import { currencyCryptos } from "./currency";
import { smartContractCryptos } from "./smartContract";
import { paymentCryptos } from "./payment";
import { blockchainCryptos } from "./blockchain";
import { stablecoinCryptos } from "./stablecoin";
import { defiCryptos } from "./defi";
import { entertainmentCryptos } from "./entertainment";
import { exchangeCryptos } from "./exchange";

// Combine all crypto categories
export const cryptocurrencies = [
  ...currencyCryptos,
  ...smartContractCryptos,
  ...paymentCryptos,
  ...blockchainCryptos,
  ...stablecoinCryptos,
  ...defiCryptos,
  ...entertainmentCryptos,
  ...exchangeCryptos
];
