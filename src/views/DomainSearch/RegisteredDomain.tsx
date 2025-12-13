import React from "react";
import { generateTokenId, normalise } from "@/utils/namehash";
import { useDomainExpiry } from "@/hooks/useBaseRegistrarImpl";
import { useDomainOwnerFromRegistry } from "@/hooks/useDotlabsRegistry";

import {
  useAddressRecordsMulticall,
  useDomainAvatarFromResolver,
  useTextRecordsMulticall,
} from "@/hooks/usePublicResolver";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";

import Image from "next/image";
import {
  EXPLOERE_URL,
  SUPPORTED_COIN_TYPES,
  ZERO_ADDRESS,
} from "@/configs/constants";
import { useState } from "react";
import { formatAddress, formatWrapedText, getDomainWitoutTld } from "@/utils";
import { namehash } from "viem";
import CopySvg from "./components/CopySvg";
import Link from "next/link";
import SetDomainRecords from "../MyAccount/components/SetDomainRecords";

import { useAccount } from "wagmi";

type Props = { _label: string };

const RegisteredDomain = ({ _label }: Props) => {
  const { data: domainOwner, isLoading: domainOwnerIsLoading } =
    useDomainOwnerFromRegistry(_label);

  // TODO : fetch rentPrice only if domain is not registered

  // TODO : Batch together in single hook & fetch using single multicall
  const { data: expiryDate } = useDomainExpiry(_label);
  const { data: resolverData } = useTextRecordsMulticall(_label);
  const { address: account } = useAccount();

  const {
    data: addressRecordsData,
    isLoading: addressRecordsDataIsLoading,
    refetch: refetchAddressRecordsData,
  } = useAddressRecordsMulticall(_label);
  const [activeTab, setActiveTab] = useState("profile");
  const handleTabChange = (tab: any) => {
    setActiveTab(tab);
  };
  const {
    data: avatarUriData,
    isLoading: avatarUriDataisLoading,
    refetch: refetchAvatarUri,
  } = useDomainAvatarFromResolver((!!_label && (_label as string)) || "");
  const [, copyToClipboard] = useCopyToClipboard();

  return (
    <div className="flex flex-col items-center justify-center mx-auto h-full w-[100%] sm:w-[60%] md:w-[60%]  overflow-hidden lg:w-[40%] md:p-5 mt-5">
      {!!domainOwner &&
        domainOwner !== ZERO_ADDRESS &&
        !domainOwnerIsLoading && (
          <div className="flex flex-col items-center gap-2 px-2 md:container">
            <div className="flex flex-col items-center p-2 rounded-xl">
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
              <div className="flex items-center gap-2 my-5">
                <p className="font-semibold">
                  {formatWrapedText(_label, 4, 4)}
                </p>
                {account == domainOwner && (
                  <SetDomainRecords
                    domainWitoutTld={getDomainWitoutTld(_label)}
                    tld={(_label as string).split(".").at(-1)!}
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
                    actionAfterSetAvatar={refetchAvatarUri}
                    actionAfterSetAddressRecords={refetchAddressRecordsData}
                  />
                )}
              </div>

              <br />
              <p> Owned by {formatAddress(domainOwner as string)}</p>

              {!!expiryDate && (
                <p className="">
                  <span className="opacity-60">Expiry : </span>{" "}
                  {new Date(Number(expiryDate) * 1000).toLocaleString()}
                </p>
              )}
              {/* <br /> */}
            </div>
            <div className="w-full ">
              <div className="grid grid-cols-4 border-[2px] border-[#3F3E41]/30 flex-wrap items-center justify-between w-full gap-1 p-2 text-sm rounded-full md:px-5 bg-secondary">
                <button
                  className={` text-standard ${
                    activeTab === "profile" ? "btn btn-sm" : ""
                  } !rounded-full`}
                  onClick={() => handleTabChange("profile")}
                >
                  Profile
                </button>
                <button
                  className={`  text-standard ${
                    activeTab === "records" ? "btn btn-sm" : ""
                  } !rounded-full`}
                  onClick={() => handleTabChange("records")}
                >
                  Records
                </button>
                <button
                  className={`  text-standard ${
                    activeTab === "subnames" ? "btn btn-sm" : ""
                  } !rounded-full`}
                  onClick={() => handleTabChange("subnames")}
                >
                  Subnames
                </button>
                <button
                  className={`  text-standard  ${
                    activeTab === "more" ? "btn btn-sm" : ""
                  } !rounded-full`}
                  onClick={() => handleTabChange("more")}
                >
                  More
                </button>
              </div>
            </div>
            {activeTab === "profile" && (
              <div className="flex w-full flex-col items-start p-4 my-auto border sm:items-start rounded-xl bg-secondary border border-[2px] border-[#3F3E41]/30">
                <div className="py-4">
                  <p className="font-semibold">Addresses</p>
                  <div className="flex flex-wrap gap-4 py-2 text-sm">
                    {!!resolverData?.addr?.result && (
                      <div className="flex items-center justify-center gap-3 p-2 py-2 rounded-full bg-base-200 ">
                        <Image
                          src="/images/icons/eth.svg"
                          alt="My Image"
                          width={15}
                          height={15}
                        />
                        <p className="">
                          {formatAddress(resolverData?.addr?.result || "")}
                        </p>

                        <CopySvg
                          copy={() => {
                            copyToClipboard(
                              `${resolverData?.addr?.result || ""}`
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="py-3">
                  <p className="font-semibold">Other records</p>
                  <div className="flex flex-wrap gap-4 py-2 text-sm ">
                    {!!resolverData?.textRecords[3].value.result && (
                      <div className="flex items-center justify-between gap-2 p-2 py-2 rounded-full bg-base-200 ">
                        <p className="opacity-60">avatar</p>

                        <p className="">
                          {" "}
                          {formatWrapedText(
                            resolverData?.textRecords[3].value.result || "",
                            9,
                            9
                          )}
                        </p>
                        <Image
                          src="/images/icons/external-link.svg"
                          alt="external link"
                          width={25}
                          height={15}
                          className="px-0 mx-0"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="py-4">
                  <p className="font-semibold">
                    Registration
                    {formatWrapedText(normalise(_label), 4, 6)}
                  </p>
                  <div className="flex flex-wrap gap-4 py-2 text-sm">
                    {!!domainOwner && (
                      <div className="flex items-center justify-center gap-3 p-2 px-3 py-1 rounded-full bg-base-200 ">
                        <p className="opacity-60">owner</p>

                        <p className="">
                          {formatAddress((domainOwner as string) || "")}
                        </p>

                        <Link
                          href={`${EXPLOERE_URL}/address/${domainOwner}`}
                          target="_blank"
                          referrerPolicy="no-referrer"
                        >
                          <Image
                            src="/images/icons/external-link.svg"
                            alt="external link"
                            width={25}
                            height={15}
                            className="px-0 mx-0"
                          />
                        </Link>
                      </div>
                    )}

                    {!!expiryDate && (
                      <div className="flex items-center justify-center gap-3 p-2 px-3 py-2 rounded-full bg-base-200 ">
                        <>
                          <p className="">
                            <span className="opacity-60">expiry : </span>{" "}
                            {new Date(
                              Number(expiryDate) * 1000
                            ).toLocaleString()}
                          </p>
                        </>
                      </div>
                    )}
                    {!!_label && (
                      <div className="flex items-center justify-center gap-3 p-2 px-3 py-2 rounded-full bg-base-200 ">
                        <p className="">
                          {" "}
                          <span className="opacity-60">parent : </span>{" "}
                          {_label
                            ?.split(".")
                            ?.slice(1, _label.length)
                            ?.toLocaleString()
                            .replaceAll(",", ".")}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* <br /> */}
            {/* <p>Resolver Data</p> */}
            {/* <p>{JSON.stringify(resolverData, null, 4)}</p> */}
            {/* <br /> */}
            {/* records */}
            {activeTab === "records" && (
              <div className="flex w-full flex-col items-start p-4 my-auto border sm:items-start rounded-xl bg-secondary border border-[2px] border-[#3F3E41]/30">
                <div className="py-4">
                  <p className="font-semibold">Text</p>
                  <div className="flex flex-wrap gap-4 py-2 text-sm ">
                    {!!resolverData?.textRecords[2]?.value?.result && (
                      <div className="flex flex-wrap items-center justify-center gap-3 p-2 px-3 py-1 rounded-full bg-base-200">
                        <p className="opacity-60">Url</p>
                        <p> {resolverData?.textRecords[2]?.value?.result}</p>

                        <CopySvg
                          copy={() => {
                            copyToClipboard(
                              formatWrapedText(
                                resolverData?.textRecords[2]?.value?.result
                              )
                            );
                          }}
                        />
                      </div>
                    )}
                    {!!resolverData?.textRecords[3].value.result && (
                      <div className="flex flex-wrap items-center justify-center gap-3 p-2 px-3 py-1 rounded-full bg-base-200">
                        <p className="opacity-60">Avatar</p>
                        <p>
                          {" "}
                          {formatWrapedText(
                            resolverData?.textRecords[3].value.result || "",
                            9,
                            9
                          )}
                        </p>
                        <CopySvg
                          copy={() => {
                            copyToClipboard(
                              `${formatWrapedText(
                                resolverData?.textRecords[3].value.result || "",
                                9,
                                9
                              )}`
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="py-3">
                  <p className="font-semibold ">Address</p>
                  {!addressRecordsDataIsLoading && !!addressRecordsData && (
                    <div className="flex flex-col justify-center gap-2 text-sm ">
                      {SUPPORTED_COIN_TYPES.map((coin: any, idx: number) => {
                        if ((addressRecordsData[idx] as any)?.result == "0x") {
                          return null;
                        }
                        return (
                          <div
                            key={`--addresses-${coin.symbol}-${idx}`}
                            className="flex flex-wrap items-center gap-3 p-2 px-3 py-1 rounded-full w-fit bg-base-200"
                          >
                            <img
                              src={coin.logo}
                              alt={coin.symbol}
                              className="w-5 h-5 rounded-full"
                            />
                            <p>
                              {" "}
                              {formatAddress(
                                (addressRecordsData[idx] as any)?.result || " "
                              )}
                            </p>

                            <CopySvg
                              copy={() => {
                                copyToClipboard(
                                  `${
                                    (addressRecordsData[idx] as any)?.result ||
                                    " "
                                  }`
                                );
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="py-4">
                  <p className="font-semibold">Content Hash</p>
                  <div className="flex flex-wrap gap-4 py-2 text-sm">
                    {resolverData?.contentHash && (
                      <div className="flex items-center justify-center gap-4 p-2 py-1 rounded-full bg-base-200">
                        <p>
                          {formatWrapedText(
                            resolverData?.contentHash || "",
                            10,
                            10
                          )}
                        </p>

                        <a href={`Enter your url here`} target="_blank">
                          {" "}
                          <Image
                            src="/images/icons/external-link.svg"
                            alt="external link"
                            width={25}
                            height={15}
                            className="px-0 mx-0"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "subnames" && (
              <div className="p-2 m-2 text-red-600">Subnames Not Found</div>
            )}{" "}
            {activeTab === "more" && (
              <div className="flex  w-full flex-col items-start p-4 my-auto border sm:items-start rounded-xl bg-secondary border border-[2px] border-[#3F3E41]/30">
                <div className="py-4">
                  <p className="font-semibold">Additional Info</p>
                  <div className="flex flex-wrap gap-4 py-2 text-sm">
                    {!!namehash(_label) && (
                      <div className="flex items-center justify-center gap-3 p-2 py-2 rounded-full bg-base-200 ">
                        <p className="opacity-60">namehash</p>
                        <p className="">{formatAddress(namehash(_label))}</p>

                        <CopySvg
                          copy={() => {
                            copyToClipboard(`${namehash(_label)}`);
                          }}
                        />
                      </div>
                    )}
                    {!!generateTokenId(_label).toString() && (
                      <div className="flex items-center justify-center gap-3 p-2 px-3 py-1 rounded-full bg-base-200 ">
                        <p className="opacity-60">tokenId</p>

                        <p className="">
                          {formatAddress(generateTokenId(_label).toString())}
                        </p>

                        <CopySvg
                          copy={() => {
                            copyToClipboard(
                              `${generateTokenId(_label).toString()}`
                            );
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
    </div>
  );
};

export default RegisteredDomain;
