// @ts-ignore
/* eslint-disable */
import { EXPLOERE_URL } from "@/configs/constants";

import {
  usePrimaryFromPublicResolver,
  useSetTextRecord,
} from "@/hooks/usePublicResolver";

import Link from "next/link";
import React, { useState } from "react";

import { Toaster, toast } from "react-hot-toast";
import { namehash } from "viem";
import { useAccount } from "wagmi";

import SocialRecords from "./RecordForms/SocialRecords";
import SetSinglePrimary from "./SetSinglePrimary";
import { formatWrapedText } from "@/utils";

type Props = {
  domainWitoutTld: string;
  tld: string;
  isLoading?: boolean;
  actionAfter?: () => void;
  actionAfterSetAvatar?: () => void;
  actionAfterSetSocialRecords?: () => void;
  actionAfterSetAddressRecords?: () => void;
  actionAfterSetPrimaryName?: () => void;
  modalKey?: string;
  icon?: React.ReactNode;
};
// @ts-ignore
function SetDomainRecords({
  domainWitoutTld,
  tld,
  modalKey,
  icon,
  actionAfterSetSocialRecords,
// @ts-ignore
  actionAfterSetAddressRecords,
  actionAfterSetPrimaryName,
  actionAfterSetAvatar,
}: Props) {
  // TODO : ADD ACTION AFTER PERTICULAR RECORD SET {refetchPrimaryName, refetchAddressRecords, refetchAvatar, refetchSocialRecords}
  const { address: account } = useAccount();
  const { data: primaryName, refetch: refetchPrimaryName } =
    usePrimaryFromPublicResolver(account!);
  const [avatarUri, setAvatarUri] = useState("");
  const { writeAsync: setTextRecord } = useSetTextRecord();

  const handleAfterCloseModal = () => {
    setAvatarUri("");
  };

  // Sets Domain Avatar only
  const handleSetTextRecord = async (key: string, value: string) => {
    if (!account) {
      toast.error("Please connect wallet", {
        style: {
          background: "#363636",
          color: "lightgray",
        },
      });
      return;
    }
    const toastId = toast.loading("Submitting txn", {
      style: {
        background: "#363636",
        color: "lightgray",
      },
    });

    try {
      const node = namehash(domainWitoutTld + `.${tld}`);

      const tx = await setTextRecord({
        args: [node, key, value],
      });

      if (tx?.hash) {
        setTimeout(async () => {
          actionAfterSetAvatar && (await actionAfterSetAvatar());
          typeof window !== "undefined" &&
            // @ts-ignore
            window[`modal__set_domain_records_${modalKey || ""}`]?.close();
          await toast.success(
            <div className="flex flex-col w-44">
              <p>Txn Submitted</p>
              <Link
                href={`${EXPLOERE_URL}/tx/${tx?.hash}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="mt-2 font-normal btn btn-xs btn-outline"
              >
                View on Explorer
              </Link>
            </div>,
            {
              id: toastId,
              duration: 5000,
              style: {
                background: "#363636",
                color: "lightgray",
              },
            }
          );
        }, 5000);
      } else {
        toast.error(
          <div className="flex flex-col w-44">
            <p>Txn Failed : Something went wrong</p>
            {tx?.hash && (
              <Link
                href={`${EXPLOERE_URL}/tx/${tx?.hash}`}
                target="_blank"
                referrerPolicy="no-referrer"
                className="mt-2 font-normal btn btn-xs btn-outline"
              >
                View on Explorer
              </Link>
            )}
          </div>,
          {
            id: toastId,
            duration: 5000,
            style: {
              background: "#363636",
              color: "lightgray",
            },
          }
        );
      }
      console.log(`🚀 ~ file: Register.tsx:56 ~ tx:`, tx);
    } catch (error) {
      toast.error(
        <div className="flex flex-col w-44">
          <p>Txn Failed : Something went wrong</p>
        </div>,
        {
          id: toastId,
          duration: 5000,
          style: {
            background: "#363636",
            color: "lightgray",
          },
        }
      );
      console.log(`🚀 ~ file: Register.tsx:57 ~ error:`, error);
    }
  };
  return (
    <>
      <div className=" no-scrollbar">
        <button
          className="flex items-center h-full text-xs"
          onClick={() => {
            try {
              typeof window !== "undefined" &&
                // @ts-ignore
                window[
                  // @ts-ignore
                  `modal__set_domain_records_${modalKey || ""}`
                ]?.showModal();
            } catch (error) {
              console.log(
                `🚀 ~ file: SetPrimaryDomainsModal.tsx:16 ~ error:`,
                error
              );
            }
          }}
        >
          {icon || " Set Records"}
        </button>
        <dialog
          id={`modal__set_domain_records_${modalKey || ""}`}
          className="modal no-scrollbar"
        >
          <form
            method="dialog"
            className="border-[0.5px] border-gray-400/50 modal-box no-scrollbar"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                Set Records for {formatWrapedText(domainWitoutTld, 4, 6)}.{tld}
              </h3>
              <button
                className="text-xs rounded-full btn btn-square btn-xs"
                onClick={handleAfterCloseModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              <div className="my-2 collapse bg-base-300 collapse-arrow">
                <input type="checkbox" name="my-accordion-1" />
                <div className="font-medium collapse-title">General</div>
                <div className="collapse-content">
                  <div className="w-full form-control">
                    <div className="w-full border rounded-full input-group border-gray-300/10">
                      <input
                        type="url"
                        placeholder="Avatar URI"
                        value={avatarUri}
                        onChange={(e) => setAvatarUri(e?.target?.value)}
                        className="w-full input focus:outline-none "
                      />
                      <div
                        className="text-white btn btn-primary"
                        onClick={async () => {
                          try {
                            await handleSetTextRecord("avatar", avatarUri);
                          } catch (error) {
                            console.log(
                              `🚀 ~ file: SetDomainRecords.tsx:83 ~ error:`,
                              error
                            );
                          }
                        }}
                      >
                        Set Avatar
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SocialRecords
                domainWitoutTld={domainWitoutTld}
                tld={tld}
                actionAfter={actionAfterSetSocialRecords ?? (() => {})}
                modalKey={modalKey}
                icon={icon}
              />
            </div>
            <div className="flex justify-center gap-5 mt-5">
              {(!!primaryName || primaryName == "") &&
                primaryName !== `${domainWitoutTld}.${tld}` && (
                  <SetSinglePrimary
                    labelWithTld={`${domainWitoutTld}.${tld}`}
                    actionAfterSetPrimary={async () => {
                      await refetchPrimaryName();
                      actionAfterSetPrimaryName &&
                        (await actionAfterSetPrimaryName());
                    }}
                  />
                )}
              <button
                className="text-xs btn btn-error btn-sm"
                onClick={handleAfterCloseModal}
              >
                Close
              </button>
            </div>
          </form>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
          <Toaster />
        </dialog>
      </div>
    </>
  );
}

export default SetDomainRecords;
