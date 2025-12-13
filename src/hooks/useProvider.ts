import { ChainId } from "@/configs/chainIds";
import RPC from "@/configs/rpc";
import { ethers } from "ethers";

export const useProvider = (chainId: ChainId) => {
  const jsonRpcProvider = new ethers.providers.JsonRpcProvider(RPC[chainId]);
  return jsonRpcProvider;
};
