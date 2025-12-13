import { useActiveChainId } from "./useActiveChainId";
import { useContractWrite } from "wagmi";
import Multicall3 from "@/configs/abis/Multicall3.json";
import { contracts } from "@/configs/contracts";
// TODO :  CONTRACT SINGLE WRITES

export const useMulticallContractWrite = ({
  functionName,
  args,
  ...rest
}: any) => {
  const chainId = useActiveChainId();
  const {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    isSuccess,
  } = useContractWrite({
    // @ts-ignore
    address: contracts.multicall[chainId as any],
    abi: Multicall3,
    functionName,
    args,
    chainId,
    ...rest,
  });
  return {
    data,
    isError,
    isLoading,
    error,
    write,
    writeAsync,
    reset,
    isSuccess,
  };
};

export const useTransactionAggregate = () => {
  //   const chainId = useActiveChainId();

  const data = useMulticallContractWrite({
    functionName: "aggregate",
    // args: [label, owner, duration],
    // TODO Dynamic domain fee
  });
  console.log(`🚀 ~ file: useMulticall.ts:104 ~ data:`, data);
  return data;
};
