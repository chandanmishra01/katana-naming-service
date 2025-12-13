import { convertEVMChainIdToCoinType } from "@ensdomains/address-encoder";
import { ChainId } from "./chainIds";
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const TEXT_RECORD_KEYS = [
  "snapshot",
  "email",
  "url",
  "avatar",
  "description",
  "notice",
  "keywords",
  "com.discord",
  "com.github",
  "com.reddit",
  "com.twitter",
  "org.telegram",
  "eth.ens.delegate",
];

export const SOCIAL_RECORD_KEYS = [
  {
    key: "com.discord",
    formKey: "discord",
    icon: "/images/icons/discord.svg",
    color: "#7289da",
  },
  {
    key: "com.github",
    formKey: "github",
    icon: "/images/icons/github.svg",
    color: "#ffffff",
  },
  {
    key: "com.reddit",
    formKey: "reddit",
    icon: "/images/icons/reddit.svg",
    color: "#ff4500",
  },
  {
    key: "com.twitter",
    formKey: "twitter",
    icon: "/images/icons/twitter.svg",
    color: "#00aced",
  },
  {
    key: "org.telegram",
    formKey: "telegram",
    icon: "/images/icons/telegram.svg",
    color: "#0088CC",
  },
];

export const SUPPORTED_COIN_TYPES = [
  {
    type: convertEVMChainIdToCoinType(ChainId.ZETA_ATHENS),
    symbol: "ZETA",
    logo: "https://labs.zetachain.com/img/logos/zeta-logo.svg",
  },
  {
    type: convertEVMChainIdToCoinType(ChainId.OMNI_TESTNET),
    symbol: "OMNI",
    logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3448384003-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FPD4tBiwNHtSAkQcMZDtr%252Ficon%252FTdNehkxO4cSU6OlCjlPa%252FYoutube%2520Channel%2520icon_Black.png%3Falt%3Dmedia%26token%3Dd9a6d8af-7901-4693-9bfc-04e9dfe99432",
  },
  {
    type: convertEVMChainIdToCoinType(ChainId.HEMI),
    symbol: "ETH",
    logo: "https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/eth.jpg",
  },
  {
    type: 714,
    symbol: "BNB",
    logo: "https://raw.githubusercontent.com/sushiswap/list/master/logos/token-logos/token/bnb.jpg",
  },
];

export const UNSUPPORTED_BALANCES_FROM_CONTRACT_TLDS = ["eth"];

export const YEAR_TO_SEC = 31536000;

export const EXPLOERE_URL = "https://explorer.hemi.xyz";

export const SUPPORTED_TLDS = ["zeta", "eth", "omni", "hemi"];
