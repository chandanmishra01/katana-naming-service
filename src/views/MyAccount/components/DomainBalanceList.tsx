/* eslint-disable @next/next/no-img-element */
import { DEFAULT_TLD } from "@/configs";
import { useDomainBalance } from "@/hooks/useBaseRegistrarImpl";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import DomainBalanceCard from "./DomainBalanceCard";
import DomainBalanceCardSkeleton from "./DomainBalanceCardSkeleton";
import SetDomainRecords from "./SetDomainRecords";
import {
  useDomainAvatarFromResolver,
  usePrimaryFromPublicResolver,
} from "@/hooks/usePublicResolver";
import { formatAddress, formatWrapedText, getDomainWitoutTld } from "@/utils";

type Props = {};

function DomainBalanceList({}: Props) {
  const { address: account } = useAccount();
  const { data: balanceRes, isLoading } = useDomainBalance(account!);
  // TODO: Refetch after setting primary
  const {
    data: primaryName,
    refetch: refetchPrimaryName,
    isRefetching,
  } = usePrimaryFromPublicResolver(account!);
  console.log(
    `🚀 ~ file: DomainBalanceList.tsx:22 ~ isRefetching:`,
    isRefetching
  );

  const {
    data: avatarUriData,
    isLoading: avatarUriDataisLoading,
    refetch: refetchAvatarUri,
  } = useDomainAvatarFromResolver(
    (!!primaryName && (primaryName as string)) || ""
  );

  useEffect(() => {}, []);
  return (
    <>
      {account && (
        <div className="flex flex-col items-center justify-center mx-auto h-full w-[70%] sm:w-[60%] md:w-[60%] lg:w-[40%]  my-5">
          <div className="flex flex-col items-center w-full">
            {avatarUriDataisLoading && (
              <div className="w-[8em] rounded-full h-[8em] bg-gradient-to-b from-[#72EF71] via-[#19D417] to-[#05BA03] animate-pulse"></div>
            )}
            {!avatarUriDataisLoading && !!avatarUriData && (
              <img
                src={(avatarUriData as string) || "/pfp.png"}
                width={180}
                height={180}
                alt="Avatar"
                className="rounded-full"
              />
            )}
            {!avatarUriDataisLoading && !avatarUriData && (
              <img
                src={(avatarUriData as string) || "/pfp.png"}
                width={180}
                height={180}
                alt="Avatar"
                className="rounded-full"
              />
            )}
            <div className="flex items-center gap-2 mt-5">
              <p className="text-lg font-medium md:text-2xl">
                {!!primaryName &&
                  (primaryName as string).trim() !== "" &&
                  formatWrapedText(primaryName as string, 4, 6)}
              </p>
              {!!primaryName && (primaryName as string).trim() !== "" && (
                <SetDomainRecords
                  domainWitoutTld={getDomainWitoutTld(primaryName as string)}
                  tld={DEFAULT_TLD}
                  isLoading={isLoading}
                  actionAfterSetAvatar={refetchAvatarUri}
                  actionAfterSetPrimaryName={refetchPrimaryName}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
                    </svg>
                  }
                />
              )}
            </div>
            <p className="text-[12px] font-medium md:text-[15px] mt-2 text-gray">
              <span className="md:block">{account}</span>
              <span className="block md:hidden">{formatAddress(account!)}</span>
            </p>
            <div className="flex gap-2 my-5">
              {/* TODO: Set Primary Domain */}
              {/* TODO: Add action after Set Primary Domain */}
            </div>
          </div>
          <div className="w-full my-5">
            <p className="mb-5 text-center">Registered Domains</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {isLoading &&
                new Array(6).fill(1).map((_, idx) => {
                  return (
                    <DomainBalanceCardSkeleton
                      key={`--profile-domain-skeleton-${idx}`}
                    />
                  );
                })}
              {balanceRes?.map((domain, idx) => {
                if (!!domain && (domain?.result as string).trim() == "") {
                  return null;
                }
                return (
                  <DomainBalanceCard
                    actionAfterSetAvatar={refetchAvatarUri}
                    actionAfterSetPrimaryName={refetchPrimaryName}
                    key={`--profile-domain-${idx}`}
                    name={!!domain && (domain?.result as string)}
                    tld={DEFAULT_TLD}
                    title={"Dotzeta Domains"}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                    href={
                      (!!domain &&
                        `/domain/${domain?.result as string}.${DEFAULT_TLD}`) ||
                      "/"
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DomainBalanceList;
