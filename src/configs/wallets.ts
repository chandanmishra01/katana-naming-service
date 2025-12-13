import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  rainbowWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Chain, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { rainbowWeb3AuthConnector } from "./walletConnector";
import { SUPPORTED_WAGMI_CHAINS } from "./chains";
import { okxCustomConnector } from "./customconnector/okx";
export const PROJECT_ID_WC = "b443d5e4ae375524964a2953959e826c";

export const { chains, publicClient }: { chains: Chain[]; publicClient: any } =
  configureChains(SUPPORTED_WAGMI_CHAINS, [publicProvider()]);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      // okxWallet({ chains }),
      okxCustomConnector({ chains, projectId: PROJECT_ID_WC }),

      metaMaskWallet({ chains }),
      rainbowWeb3AuthConnector({ chains }),
      walletConnectWallet({ chains }),
      rainbowWallet({ chains: chains }),
    ],
  },
]);
export const wagmiClientConfig: any = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
