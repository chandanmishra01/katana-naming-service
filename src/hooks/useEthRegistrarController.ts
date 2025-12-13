import { useActiveChainId } from "./useActiveChainId";
import { useContractRead, useContractWrite } from "wagmi";
import EthRegistrarController from "@/configs/abis/ETHRegistrarController.json";
import { contracts } from "@/configs/contracts";
import { normalise } from "@/utils/namehash";

// CONTRACT SINGLE READS

export const useEthRegistrarControllerContractRead = ({
  functionName,
  args,
  ...rest
}: any) => {
  const chainId = useActiveChainId();
  const { data, isError, isLoading, error, refetch } = useContractRead({
    // @ts-ignore
    address: contracts.ethRegistrarController[chainId as any],
    abi: EthRegistrarController,
    functionName,
    args,
    chainId,
    cacheOnBlock: true,
    ...rest,
  });
  return { data, isError, isLoading, error, refetch };
};

export const useDomainRentPrice = (label: string, duration: number) => {
  const normalisedLabel = normalise(label);

  const data = useEthRegistrarControllerContractRead({
    functionName: "rentPrice",
    args: [normalisedLabel, duration],
    enabled: normalisedLabel?.trim() !== "" && Boolean(label),
  });

  return data;
};

// TODO :  CONTRACT MULTI READS

// TODO :  CONTRACT SINGLE WRITES

export const useEthRegistrarControllerContractWrite = ({
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
    address: contracts.ethRegistrarController[chainId as any],
    abi: EthRegistrarController,
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

export const useDomainRegister = () => {
  // const chainId = useActiveChainId();

  const data = useEthRegistrarControllerContractWrite({
    functionName: "registerWithConfig",
    // // args: [label, owner, duration],
    // // TODO Dynamic domain fee
    // value: "1000000000000000000",
    // args: [
    //   label,
    //   owner,
    //   duration,
    //   // @ts-ignore
    //   contracts.publicResolver[chainId as any],
    //   owner,
    //   true,
    // ],

    // ...others,
  });
  return data;
};
