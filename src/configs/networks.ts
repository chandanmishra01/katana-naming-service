import { ChainId } from "./chainIds";

const Arbitrum =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/arbitrum.jpg";
const Avalanche =
  "https://storage.googleapis.com/yak/tokens/0x0000000000000000000000000000000000000000.png";
const Bsc =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/bsc.jpg";
const Fantom =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/fantom.jpg";
const Goerli =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/goerli.jpg";
const Harmony =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/harmonyone.jpg";
const Heco =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/heco.jpg";
const Kovan =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/kovan.jpg";
const Mainnet =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/mainnet.jpg";
const Matic =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/polygon.jpg";
const Moonbeam =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/moonbeam.jpg";
const OKEx =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/okex.jpg";
const Polygon =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/polygon.jpg";
const Rinkeby =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/rinkeby.jpg";
const Ropsten =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/ropsten.jpg";
const xDai =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/gnosis.jpg";
const Celo =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/celo.jpg";
const Palm =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/palm.jpg";
const Moonriver =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/moonriver.jpg";
const Fuse =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/fuse.jpg";
const Telos =
  "https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/telos.jpg";
const Shardeum =
  "https://assets.coingecko.com/coins/images/27937/small/shm.png";
const Dogechain = "https://s2.coinmarketcap.com/static/img/coins/64x64/74.png";
const Cronos = "https://photonswap.finance/cro.png";
const Zetachain = "https://explorer.zetachain.com/img/logos/zeta-logo.svg";

export const NETWORK_ICON: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: Mainnet,
  [ChainId.ROPSTEN]: Ropsten,
  [ChainId.RINKEBY]: Rinkeby,
  [ChainId.GÖRLI]: Goerli,
  [ChainId.KOVAN]: Kovan,
  [ChainId.FANTOM]: Fantom,
  [ChainId.FANTOM_TESTNET]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.MATIC]: Polygon,
  [ChainId.MATIC_TESTNET]: Matic,
  [ChainId.XDAI]: xDai,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: Arbitrum,
  [ChainId.MOONBEAM_TESTNET]: Moonbeam,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.AVALANCHE_TESTNET]: Avalanche,
  [ChainId.HECO]: Heco,
  [ChainId.HECO_TESTNET]: Heco,
  [ChainId.HARMONY]: Harmony,
  [ChainId.HARMONY_TESTNET]: Harmony,
  [ChainId.OKEX]: OKEx,
  [ChainId.OKEX_TESTNET]: OKEx,
  [ChainId.CELO]: Celo,
  [ChainId.PALM]: Palm,
  [ChainId.MOONRIVER]: Moonriver,
  [ChainId.FUSE]: Fuse,
  [ChainId.TELOS]: Telos,

  [ChainId.DOGECHAIN]: Dogechain,
  [ChainId.CRO_TESTNET]: Cronos,
  [ChainId.LIBERTY_16]: Shardeum,
  [ChainId.DAPPS_NETWORK]: Shardeum,

  [ChainId.BETANET_13]: Shardeum,
  [ChainId.ZETA_ATHENS]: Zetachain,
};

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: "Ethereum",
  [ChainId.RINKEBY]: "Rinkeby",
  [ChainId.ROPSTEN]: "Ropsten",
  [ChainId.GÖRLI]: "Görli",
  [ChainId.KOVAN]: "Kovan",
  [ChainId.FANTOM]: "Fantom",
  [ChainId.FANTOM_TESTNET]: "Fantom Testnet",
  [ChainId.MATIC]: "Polygon",
  [ChainId.MATIC_TESTNET]: "Polygon Testnet",
  [ChainId.XDAI]: "xDai",
  [ChainId.ARBITRUM]: "Arbitrum",
  [ChainId.ARBITRUM_TESTNET]: "Arbitrum Testnet",
  [ChainId.BSC]: "BNB Chain",
  [ChainId.BSC_TESTNET]: "BNB Testnet",
  [ChainId.MOONBEAM_TESTNET]: "Moonbase",
  [ChainId.AVALANCHE]: "Avalanche",
  [ChainId.AVALANCHE_TESTNET]: "Fuji",
  [ChainId.HECO]: "HECO",
  [ChainId.HECO_TESTNET]: "HECO Testnet",
  [ChainId.HARMONY]: "Harmony",
  [ChainId.HARMONY_TESTNET]: "Harmony Testnet",
  [ChainId.OKEX]: "OKEx",
  [ChainId.OKEX_TESTNET]: "OKEx",
  [ChainId.CELO]: "Celo",
  [ChainId.PALM]: "Palm",
  [ChainId.MOONRIVER]: "Moonriver",
  [ChainId.FUSE]: "Fuse",
  [ChainId.TELOS]: "Telos EVM",

  [ChainId.DOGECHAIN]: "Dogechain",
  [ChainId.CRO_TESTNET]: "Cronos Testnet",
  [ChainId.LIBERTY_16]: "Shardeum 1.6",
  [ChainId.DAPPS_NETWORK]: "Dapps Testnet",
  [ChainId.BETANET_13]: "Betanet 1.3",
  [ChainId.ZETA_ATHENS]: "Zetachain Athens",
};
