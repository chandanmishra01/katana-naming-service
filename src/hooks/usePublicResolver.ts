import { multicall } from "@wagmi/core";
import { generateTokenId, normalise } from "@/utils/namehash";
import { useContractRead, useContractWrite } from "wagmi";
import { useActiveChainId } from "./useActiveChainId";
import { useQuery } from "@tanstack/react-query";
import PublicResolver from "@/configs/abis/PublicResolver.json";
import { contracts } from "@/configs/contracts";

import { SUPPORTED_COIN_TYPES, TEXT_RECORD_KEYS } from "@/configs/constants";
import { Abi, namehash } from "viem";
import { decodeContenthash, getContentHashLink } from "@/utils/contenthash";

export const usePublicResolverContractRead = ({ functionName, args }: any) => {
  const chainId = useActiveChainId();
  const { data, isError, isLoading, error, ...others } = useContractRead({
    // @ts-ignore
    address: contracts.publicResolver[chainId as any],
    abi: PublicResolver,
    functionName,
    args,
    chainId,
  });
  return { data, isError, isLoading, error, ...others };
};

export const useDomainAddrFromPublicResolver = (label: string) => {
  const normalisedLabel = normalise(label);

  const tokenId = generateTokenId(normalisedLabel);

  const data = usePublicResolverContractRead({
    functionName: "addr",
    args: [tokenId],
  });

  return data;
};
export const usePrimaryFromPublicResolver = (address: string) => {
  const node = address.substring(2)?.toLowerCase() + `.addr.reverse`;
  const nodehash = namehash(node);
  const data = usePublicResolverContractRead({
    functionName: "name",
    args: [nodehash],
  });

  return data;
};

export const useTextRecordsMulticall = (label: string) => {
  const normalisedLabel = normalise(label);

  const nameHash = namehash(normalisedLabel);
  const chainId = useActiveChainId();

  const publicResolverContractPrepareMulticall = {
    //   @ts-ignore
    address: contracts?.publicResolver[chainId as any],
    abi: PublicResolver as Abi,
  };
  const recordCallsBatch = TEXT_RECORD_KEYS.map((v: string) => {
    return {
      ...publicResolverContractPrepareMulticall,
      functionName: "text",
      args: [nameHash, v],
    };
  });

  const res = useQuery<any, Error>({
    queryKey: ["useTextRecordsMulticall", label as string],
    queryFn: async () => {
      return await multicall({
        chainId: chainId,
        contracts: [
          ...recordCallsBatch,
          {
            ...publicResolverContractPrepareMulticall,
            functionName: "addr",
            args: [nameHash],
          },
          {
            ...publicResolverContractPrepareMulticall,
            functionName: "contenthash",
            args: [nameHash],
          },
        ],
        // @ts-ignore
        multicallAddress: contracts.multicall[chainId],
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  // TODO : Temp fix for other 2 values extraction
  if (res?.data && !res?.isLoading && res?.data?.length) {
    const [addr, contentHash] = res?.data?.slice(-2);
    const textRecords = res?.data
      ?.slice(0, -2)
      ?.map((record: any, idx: number) => {
        return { key: TEXT_RECORD_KEYS[idx], value: record };
      });
    const decodedContentHash = decodeContenthash(contentHash?.result || "");

    const contentHashLink = getContentHashLink(decodedContentHash);

    return {
      ...res,
      data: { textRecords, addr, contentHash: contentHashLink },
    };
  }
  return res;
};
export const useAddressRecordsMulticall = (label: string) => {
  const normalisedLabel = normalise(label);

  const nameHash = namehash(normalisedLabel);
  const chainId = useActiveChainId();

  const publicResolverContractPrepareMulticall = {
    //   @ts-ignore
    address: contracts?.publicResolver[chainId as any],
    abi: PublicResolver as Abi,
  };
  const recordCallsBatch = SUPPORTED_COIN_TYPES.map((v) => {
    return {
      ...publicResolverContractPrepareMulticall,
      functionName: "addr",
      args: [nameHash, v.type],
    };
  });

  const res = useQuery({
    queryKey: ["useAddressRecordsMulticall", label],
    queryFn: async () => {
      return await multicall({
        chainId: chainId,
        contracts: [...recordCallsBatch],
        //   @ts-ignore
        multicallAddress: contracts.multicall[chainId],
      });
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  return res;
};
export const useDomainAvatarFromResolver = (label: string) => {
  const nameHash = namehash(label);

  const data = usePublicResolverContractRead({
    functionName: "text",
    args: [nameHash, "avatar"],
    enabled: label.length > 1,
  });

  return data;
};

// TODO :  CONTRACT MULTI READS

// TODO :  CONTRACT SINGLE WRITES

export const usePublicResolverContractWrite = ({
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
    address: contracts.publicResolver[chainId as any],
    abi: PublicResolver,
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

export const useSetTextRecord = () => {
  const data = usePublicResolverContractWrite({
    functionName: "setText",
  });
  return data;
};
export const useSetTextRecordBatch = () => {
  const data = usePublicResolverContractWrite({
    functionName: "multicall",
  });
  return data;
};
