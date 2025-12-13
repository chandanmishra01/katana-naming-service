import { EXPLOERE_URL } from "@/configs/constants";
import { useSetPrimary } from "@/hooks/useReverseRegistrar";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";

type Props = {
  labelWithTld: string;
  tld?: string;
  actionAfterSetPrimary?: () => void;
};

function SetSinglePrimary({ labelWithTld, actionAfterSetPrimary }: Props) {
  const { address: account } = useAccount();
  // TODO : Get Primary domain first
  const { writeAsync: handleSetPrimaryDomain } = useSetPrimary();
  const handleSetPimary = async () => {
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
        args: [labelWithTld],
      });

      if (tx?.hash) {
        setTimeout(async () => {
          actionAfterSetPrimary && (await actionAfterSetPrimary());

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
      <button
        className="text-xs text-white btn btn-primary btn-sm"
        onClick={handleSetPimary}
      >
        Set as primary
      </button>
    </>
  );
}

export default SetSinglePrimary;
