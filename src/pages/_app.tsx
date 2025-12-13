import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiConfig } from "wagmi";

import { chains, wagmiClientConfig } from "@/configs/wallets";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiClientConfig}>
        <RainbowKitProvider chains={chains}>
          <ThemeProvider attribute="data-theme" storageKey="theme" forcedTheme="dark">
            <Component {...pageProps} />
          </ThemeProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
