import { Chain } from "wagmi";
import type { InjectedConnectorOptions } from "@wagmi/core/connectors/injected";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import type {
  WalletConnectConnectorOptions,
  WalletConnectLegacyConnectorOptions,
} from "@rainbow-me/rainbowkit/dist/wallets/getWalletConnectConnector";
import { Wallet } from "@rainbow-me/rainbowkit";
import { getWalletConnectUri } from "@/utils/getWalletConnectUri";
import { isMobile } from "@/utils";

export interface OKXWalletLegacyOptions {
  projectId?: string;
  chains: Chain[];
  walletConnectVersion: "1";
  walletConnectOptions?: WalletConnectLegacyConnectorOptions;
}

export interface OKXWalletOptions {
  projectId: string;
  chains: Chain[];
  walletConnectVersion?: "2";
  walletConnectOptions?: WalletConnectConnectorOptions;
}

export const okxCustomConnector = ({
  chains,
  projectId,
  walletConnectOptions,
  walletConnectVersion = "2",
  ...options
}: OKXWalletOptions & InjectedConnectorOptions): Wallet => {
  // `isOkxWallet` or `isOKExWallet` needs to be added to the wagmi `Ethereum` object
  const isOKXInjected =
    typeof window !== "undefined" &&
    // @ts-expect-error
    typeof window.okxwallet !== "undefined";

  const shouldUseWalletConnect = !isOKXInjected;

  return {
    id: "okx",
    name: "OKX Wallet",
    iconUrl: "/images/wallets/okx.png",
    iconAccent: "#000",
    iconBackground: "#000",
    downloadUrls: {
      android:
        "https://play.google.com/store/apps/details?id=com.okinc.okex.gp",
      ios: "https://itunes.apple.com/app/id1327268470?mt=8",
      mobile: "https://okx.com/download",
      qrCode: "https://okx.com/download",
      chrome:
        "https://chrome.google.com/webstore/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge",
      edge: "https://microsoftedge.microsoft.com/addons/detail/okx-wallet/pbpjkcldjiffchgbbndmhojiacbgflha",
      firefox: "https://addons.mozilla.org/firefox/addon/okexwallet/",
      browserExtension: "https://okx.com/download",
    },
    // @ts-ignore
    createConnector: () => {
      const connector = shouldUseWalletConnect
        ? new WalletConnectConnector({
            chains,
            options: {
              projectId,
              showQrModal: false,
            },
          })
        : new InjectedConnector({
            chains,
            options: {
              // @ts-expect-error
              getProvider: () => window.okxwallet,
              ...options,
            },
          });

      return {
        connector,
        mobile: {
          getUri: shouldUseWalletConnect
            ? async () => {
                const uri = await getWalletConnectUri(
                  // @ts-ignore
                  connector,
                  walletConnectVersion
                );
                const ua = navigator.userAgent;
                const isOKApp = /OKApp/i.test(ua);
                const dappUrl = window?.location?.href;
                return isMobile() && !isOKApp
                  ? `okx://wallet/dapp/details?dappUrl=${dappUrl}`
                  : `okex://main/wc?uri=${encodeURIComponent(uri)}`;
              }
            : undefined,
        },
        qrCode: shouldUseWalletConnect
          ? {
              getUri: async () =>
                // @ts-ignore
                getWalletConnectUri(connector, walletConnectVersion),
              instructions: {
                learnMoreUrl: "https://okx.com/web3/",
                steps: [
                  {
                    description:
                      "We recommend putting OKX Wallet on your home screen for quicker access.",
                    step: "install",
                    title: "Open the OKX Wallet app",
                  },
                  {
                    description:
                      "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                    step: "create",
                    title: "Create or Import a Wallet",
                  },
                  {
                    description:
                      "After you scan, a connection prompt will appear for you to connect your wallet.",
                    step: "scan",
                    title: "Tap the scan button",
                  },
                ],
              },
            }
          : undefined,
        extension: {
          instructions: {
            learnMoreUrl: "https://okx.com/web3/",
            steps: [
              {
                description:
                  "We recommend pinning OKX Wallet to your taskbar for quicker access to your wallet.",
                step: "install",
                title: "Install the OKX Wallet extension",
              },
              {
                description:
                  "Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone.",
                step: "create",
                title: "Create or Import a Wallet",
              },
              {
                description:
                  "Once you set up your wallet, click below to refresh the browser and load up the extension.",
                step: "refresh",
                title: "Refresh your browser",
              },
            ],
          },
        },
      };
    },
  };
};
