
import { CryptoCategory } from "@/types/compare";

export const currencyCryptos = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    logo: "/placeholder.svg",
    category: "Currency" as CryptoCategory,
    description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
    website: "https://bitcoin.org/",
    twitter: "https://twitter.com/bitcoin",
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC",
    logo: "/placeholder.svg",
    category: "Currency" as CryptoCategory,
    description: "Litecoin is a peer-to-peer cryptocurrency and open-source software project released under the MIT/X11 license.",
    website: "https://litecoin.org/",
    twitter: "https://twitter.com/litecoin",
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE",
    logo: "/placeholder.svg",
    category: "Currency" as CryptoCategory,
    description: "Dogecoin is a cryptocurrency created as a joke, featuring a Shiba Inu dog from the 'Doge' meme as its logo.",
    website: "https://dogecoin.com/",
    twitter: "https://twitter.com/dogecoin",
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB",
    logo: "/placeholder.svg",
    category: "Currency" as CryptoCategory,
    description: "Shiba Inu is a meme-inspired cryptocurrency and ecosystem built on the Ethereum blockchain.",
    website: "https://shibatoken.com/",
    twitter: "https://twitter.com/shibtoken",
  }
];
