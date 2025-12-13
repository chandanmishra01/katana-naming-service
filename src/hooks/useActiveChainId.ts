import { DEFAULT_CHAIN_ID } from "@/configs";
// import { useLocalStorage } from "react-use";
// import { useAccount, useChainId, useConnect, useNetwork } from "wagmi";

export const useActiveChainId = () => {
  // TODO : Use below logic for active chainId in multichain setup
  // const { chain } = useNetwork();

  // const [localChainId] = useLocalStorage("chainId", DEFAULT_CHAIN_ID);

  // if (localChainId) {
  //   return localChainId;
  // }
  // if (!chain?.unsupported) {
  //   return chain?.id;
  // }
  return DEFAULT_CHAIN_ID;
};
