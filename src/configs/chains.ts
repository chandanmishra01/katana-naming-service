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
  name: "Katana Network",
  network: "Katana Network",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: ["https://katana.drpc.org"],
    },
    default: {
      http: ["https://katana.drpc.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "Katana Explorer",
      url: "https://explorer.katanarpc.com",
    },
  },

  contracts: {
    multicall3: {
      // TODO : Multicall3 Address -- https://etherscan.io/address/0xcA11bde05977b3631167028862bE2a173976CA11#code
      address: "0xc61C04E7EE35eAA876A48A36a966b270113700f2",
    },
    ensRegistry: {
      address: "0x7897b5F6F5eFAEa7E4acCa48ec28032ecd0D877f"
    },
    ensUniversalResolver: {
      address: "0xA16b9003CEeAfc063ab2F9ad50ceCc5C72420976",
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
