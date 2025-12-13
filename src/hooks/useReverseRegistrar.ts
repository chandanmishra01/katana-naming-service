import { useActiveChainId } from "./useActiveChainId";
import { useContractRead, useContractWrite } from "wagmi";
import ReverseRegistrar from "@/configs/abis/ReverseRegistrar.json";
import { contracts } from "@/configs/contracts";
import { normalise } from "@/utils/namehash";

// CONTRACT SINGLE READS

export const useReverseRegistrarContractRead = ({
  functionName,
  args,
  ...rest
}: any) => {
  const chainId = useActiveChainId();
  const { data, isError, isLoading, error, refetch } = useContractRead({
    // @ts-ignore
    address: contracts.ethRegistrarController[chainId as any],
    abi: ReverseRegistrar,
    functionName,
    args,
    chainId,
    cacheOnBlock: true,
    ...rest,
  });
  return { data, isError, isLoading, error, refetch };
};

// TODO :  CONTRACT MULTI READS

// TODO :  CONTRACT SINGLE WRITES

export const useReverseRegistrarContractWrite = ({
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
    address: contracts.reverseRegistrar[chainId as any],
    abi: ReverseRegistrar,
    functionName,
    args,
    chainId,
    cacheOnBlock: true,
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

export const useSetPrimary = (label?: string, ...others: any) => {
  const normalisedLabel = normalise(label);
  const data = useReverseRegistrarContractWrite({
    functionName: "setName",
    args: [normalisedLabel],
    ...others,
  });
  return data;
};
