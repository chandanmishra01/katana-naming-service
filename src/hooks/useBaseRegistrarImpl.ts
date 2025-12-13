import { getDomainWitoutTld } from "@/utils";
import { useActiveChainId } from "./useActiveChainId";
// import { useProvider } from "./useProvider";
import { useContractRead } from "wagmi";
import BaseRegistrarImpl from "@/configs/abis/BaseRegistrarImplementation.json";

import { contracts } from "@/configs/contracts";
import { useDebounce } from "use-debounce";
import { generateTokenId, normalise } from "@/utils/namehash";
import { useQuery } from "@tanstack/react-query";
import { multicall } from "@wagmi/core";
import BigNumber from "bignumber.js";
import { Abi } from "viem";

// CONTRACT SINGLE READS

export const useBaseRegistrarImplContractRead = ({
  functionName,
  args,
  enabled,
  ...others
}: any) => {
  const chainId = useActiveChainId();
  const { data, isError, isLoading, error, refetch, ...remaining } =
    useContractRead({
      // @ts-ignore
      address: contracts.baseRegistrarImplementation[chainId as any],
      abi: BaseRegistrarImpl,
      functionName,
      args,
      chainId,
      enabled,
      ...others,
    });
  return { data, isError, isLoading, error, refetch, ...remaining };
};

export const useDomainExpiry = (label: string) => {
  const labelNoTld = getDomainWitoutTld(label);
  console.log("VANSH LABLE TLD", labelNoTld)
  const normalisedLabel = normalise(labelNoTld);

  const tokenId = generateTokenId(normalisedLabel);

  const data = useBaseRegistrarImplContractRead({
    functionName: "nameExpires",
    args: [tokenId],
  });

  return data;
};

export const useAvailabilityQuery = (label: string) => {
  const [debouncedQuery] = useDebounce(label, 700);
  const normalisedLabel = normalise(label);

  const tokenId = generateTokenId(normalisedLabel);

  const data = useBaseRegistrarImplContractRead({
    functionName: "available",
    args: [tokenId],
    enabled: debouncedQuery?.trim() !== "" && Boolean(debouncedQuery),
  });

  return data;
};
export const useAvailability = (label: string, scopeKey?: string) => {
  const normalisedLabel = normalise(label);
  const tokenId = generateTokenId(normalisedLabel);

  const data = useBaseRegistrarImplContractRead({
    functionName: "available",
    args: [tokenId],
    scopeKey: scopeKey ?? "",
  });

  return data;
};
export const useDomainBalance = (account: string) => {
  const chainId = useActiveChainId();

  const data = useBaseRegistrarImplContractRead({
    functionName: "balanceOf",
    args: [account],
    enabled: account,
  });

  const baseRegistrarImpContractPrepareBatchBalanceCall = {
    //   @ts-ignore
    address: contracts?.baseRegistrarImplementation[chainId as any],
    abi: BaseRegistrarImpl as Abi,
  };
  const tokenIdByIndexCallsBatch = new Array(
    //   @ts-ignore
    data?.isFetched && data?.data
      ? //   @ts-ignore
        new BigNumber(data?.data).toNumber() ?? 0
      : 0
  )
    .fill(1)
    .map((_, idx: number) => {
      return {
        ...baseRegistrarImpContractPrepareBatchBalanceCall,
        functionName: "tokenOfOwnerByIndex",
        args: [account, idx],
        enabled: account,
      };
    });

  const res = useQuery({
    queryKey: [
      "useDomainBalanceMulticall-res",
      account as string,
      new BigNumber(data?.data as any).toNumber() ?? 0,
    ],
    queryFn: async () => {
      if (!account) {
        throw new Error("Account not found");
      }
      return await multicall({
        chainId: chainId,
        contracts: [...tokenIdByIndexCallsBatch],
        // @ts-ignore
        multicallAddress: contracts.multicall[chainId],
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const namesMulticallQueriesPrepare = res?.data
    ?.filter((r) => r.status == "success")
    ?.map((r: any) => {
      return {
        //   @ts-ignore
        address: contracts?.baseRegistrarImplementation[chainId as any],
        abi: BaseRegistrarImpl as Abi,
        functionName: "idToNames",
        args: [r?.result],
      };
    });

  const resNames = useQuery({
    queryKey: [
      "useDomainBalanceMulticall-resNames",
      account as string,
      new BigNumber(data?.data as any).toNumber() ?? 0,
    ],
    queryFn: async () => {
      if (!account) {
        throw new Error("Account not found");
      }
      return await multicall({
        chainId: chainId,
        // @ts-ignore
        contracts: [...namesMulticallQueriesPrepare],
        // @ts-ignore
        multicallAddress: contracts.multicall[chainId],
      });
    },
    enabled: res?.isFetched && !res?.isLoading && res?.data && !res?.error,
    retry: false,
    refetchOnWindowFocus: false,
  });

  const namesData = resNames.data;
  return {
    ...resNames,
    data: namesData?.filter((r) => r.status == "success"),
    isLoading: resNames.isLoading,
  };
};

// TODO :  CONTRACT MULTI READS

// TODO :  CONTRACT SINGLE WRITES
