import { useActiveChainId } from "./useActiveChainId";

import DotlabsRegistry from "@/configs/abis/DotlabsRegistryABI.json";
import { contracts } from "@/configs/contracts";
import { normalise } from "@/utils/namehash";

import { useDebounce } from "use-debounce";
import { namehash } from "viem";

import { useContractRead } from "wagmi";

// CONTRACT SINGLE READS

export const useDotlabsRegistryContractRead = ({
  functionName,
  args,
  ...rest
}: any) => {
  const chainId = useActiveChainId();
  const { data, isError, isLoading, error, refetch, ...others } =
    useContractRead({
      // @ts-ignore
      address: contracts.dotlabsRegistry[chainId as any],
      abi: DotlabsRegistry,
      functionName,
      args,
      chainId,
      cacheOnBlock: true,
      ...rest,
    });
  return { data, isError, isLoading, error, refetch, ...others };
};

export const useDomainSearchQuery = (label: string) => {
  const [debouncedQuery] = useDebounce(label, 700);
  const normalisedLabel = normalise(label);

  const nameHash = namehash(normalisedLabel);

  const data = useDotlabsRegistryContractRead({
    functionName: "owner",
    args: [nameHash],
    enabled: debouncedQuery?.trim() !== "" && Boolean(debouncedQuery),
  });

  return data;
};

export const useDomainOwnerFromRegistry = (label: string) => {
  const [debouncedQuery] = useDebounce(label, 700);
  const normalisedLabel = normalise(label);

  const nameHash = namehash(normalisedLabel);

  const data = useDotlabsRegistryContractRead({
    functionName: "owner",
    args: [nameHash],
    enabled: debouncedQuery?.trim() !== "" && Boolean(debouncedQuery),
  });

  return data;
};
export const useDomainResolverFromRegistry = (label: string) => {
  const normalisedLabel = normalise(label);

  const nameHash = namehash(normalisedLabel);

  const data = useDotlabsRegistryContractRead({
    functionName: "resolver",
    args: [nameHash],
    enabled: normalisedLabel?.trim() !== "" && Boolean(normalisedLabel),
  });

  return data;
};

// TODO :  CONTRACT MULTI READS

// TODO :  CONTRACT SINGLE WRITES
