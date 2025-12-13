// @ts-nocheck

import type { Chain } from "wagmi";
// import { mainnet } from "wagmi/chains";
import { ChainId } from "./chainIds";
// @ts-ignore
const zetaChainAthens: Chain = {
  id: 7001,
  name: "Zetachain Athens",
  network: "zetachain-athens",
  nativeCurrency: {
    decimals: 18,
    name: "Zetachain Coin",
    symbol: "aZETA",
  },
  rpcUrls: {
    public: {
      http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
    },
    default: {
      http: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
    },
  },
  blockExplorers: {
    default: {
      name: "Zetachain Explorer",
      url: "https://athens3.explorer.zetachain.com",
    },
  },

  testnet: true,
  contracts: {
    multicall3: {
      // TODO : Multicall3 Address -- https://etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code
      address: "0xb445F35aEBAbddcA0cDf2ec8433CBa0286dBF1B9",
    },
  },
  // iconUrl: NETWORK_ICON[ChainId.ZETA_ATHENS],
};
const omniChainTestnet: Chain = {
  id: ChainId.OMNI_TESTNET,
  name: "Omni Testnet",
  network: "omni-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Omni Coin",
    symbol: "tOMNI",
  },
  rpcUrls: {
    public: {
      http: ["https://testnet-1.omni.network/"],
    },
    default: {
      http: ["https://testnet-1.omni.network/"],
    },
  },
  blockExplorers: {
    default: {
      name: "Omni Explorer",
      url: "https://testnet-1.explorer.omni.network/",
    },
  },

  testnet: true,
  contracts: {
    multicall3: {
      // TODO : Multicall3 Address -- https://etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code
      address: "0xe4EB47D3ceEdaA00058abc451C5E766f062acA94",
    },
  },
  // iconUrl: NETWORK_ICON[ChainId.ZETA_ATHENS],
};

const hemiChain: Chain = {
  id: ChainId.HEMI,
  name: "Hemi Network",
  network: "Hemi Network",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.hemi.network/rpc"],
    },
    default: {
      http: ["https://rpc.hemi.network/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Hemi Explorer",
      url: "https://explorer.hemi.xyz/",
    },
  },

  contracts: {
    multicall3: {
      // TODO : Multicall3 Address -- https://etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code
      address: "0x3FBA66680F0F468089233bB14E40725eCB66AF7A",
    },
    ensRegistry: {
      address: "0x099fee7f2ef53eb7ccc0e465a32f3aefa8d703c5"
    },
    ensUniversalResolver: {
      address: "0x4bb8573ddb5b8369c87bd6d7e34137d7ce674f2b",
      blockCreated: 1360113,
    },
  },
  // iconUrl: NETWORK_ICON[ChainId.ZETA_ATHENS],
};

export const SUPPORTED_WAGMI_CHAINS: Chain[] = [
  hemiChain,
  // omniChainTestnet,
  // {
  //   ...mainnet,
  //   contracts: {
  //     multicall3: {
  //       address: "0xcA11bde05977b3631167028862bE2a173976CA11",
  //     },
  //   },
  // },
];
