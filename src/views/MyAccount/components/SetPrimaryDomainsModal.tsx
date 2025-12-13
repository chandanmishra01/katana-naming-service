import React from "react";

import DomainBalanceCardSkeleton from "./DomainBalanceCardSkeleton";
import { DEFAULT_TLD } from "@/configs";
import { useAccount } from "wagmi";
import { Toaster, toast } from "react-hot-toast";

import { useSetPrimary } from "@/hooks/useReverseRegistrar";
import Link from "next/link";
import { EXPLOERE_URL } from "@/configs/constants";
import { hexBytesToString } from "@/utils";

type Props = {
  balanceRes: any[];
  isLoading: boolean;
  actionAfter?: () => void;
};

function SetPrimaryDomainsModal({ balanceRes, isLoading, actionAfter }: Props) {
  const { address: account } = useAccount();
  // TODO : Get Primary domain first
  const { writeAsync: handleSetPrimaryDomain } = useSetPrimary();
  const handleSetPimary = async (labelWithoutTld: string) => {
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
      const tx = await handleSetPrimaryDomain({
        args: [labelWithoutTld + `.${DEFAULT_TLD}`],
      });

      if (tx?.hash) {
        setTimeout(async () => {
          actionAfter && (await actionAfter());
          typeof window !== "undefined" &&
            // @ts-ignore
            window?.modal__set_primary_name?.close();
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
    <div>
      <button
        className="text-xs btn btn-sm"
        onClick={() => {
          try {
            typeof window !== "undefined" &&
              // @ts-ignore
              window?.modal__set_primary_name?.showModal();
          } catch (error) {
            console.log(
              `🚀 ~ file: SetPrimaryDomainsModal.tsx:16 ~ error:`,
              error
            );
          }
        }}
      >
        Set Primary
      </button>
      <dialog id="modal__set_primary_name" className="modal">
        <form
          method="dialog"
          className="border-[0.5px] border-gray-400/50 modal-box"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Select Primary Domain</h3>
            <button className="text-xs rounded-full btn btn-square btn-xs">
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
          <div className="grid grid-cols-2 gap-2 my-2">
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
                <div
                  className="flex justify-start w-full gap-4 overflow-hidden border border-gray-500/50 rounded-2xl btn"
                  key={`--profile-domain-${idx}`}
                  onClick={() => {
                    handleSetPimary(hexBytesToString(domain?.result as string));
                  }}
                >
                  <div className="flex items-center w-full gap-2 ">
                    <div className="w-5 h-5 rounded-lg bg-[#D0FC56] p-1 flex items-center justify-center">
                      <div className="w-3 h-3 bg-black rounded-full"></div>
                    </div>
                    <p className="text-xs font-[500] font-grotesk">
                      {!!domain && hexBytesToString(domain?.result as string)}.
                      {DEFAULT_TLD}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </form>
        <form method="dialog" className="duration-500 modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <Toaster />
    </div>
  );
}

export default SetPrimaryDomainsModal;
