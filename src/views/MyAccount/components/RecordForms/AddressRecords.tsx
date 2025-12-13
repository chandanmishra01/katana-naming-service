import { EXPLOERE_URL, SUPPORTED_COIN_TYPES } from "@/configs/constants";
import { useSetTextRecordBatch } from "@/hooks/usePublicResolver";

import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAccount } from "wagmi";
import PublicResolverABI from "@/configs/abis/PublicResolver.json";
import { encodeFunctionData, namehash } from "viem";
import Link from "next/link";

type Props = {
  domainWitoutTld: string;
  tld: string;

  actionAfter?: () => void;
  modalKey?: string;
  icon?: React.ReactNode;
};

function AddressRecords({
  domainWitoutTld,
  tld,
  actionAfter,
  modalKey,
}: Props) {
  const {
    register: registerAddressesForm,
    handleSubmit: handleSubmitAddressesForm,
    reset,
  } = useForm();
  const { address: account } = useAccount();

  const { writeAsync: aggregateTransaction } = useSetTextRecordBatch();
  const handleSetTextRecordBatch = async (v: any) => {
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
      const mappedValues = SUPPORTED_COIN_TYPES.map((val) => {
        if (!v[`isChecked${val.symbol}`]) {
          return null;
        }
        return { key: val.type, value: v[`${val.symbol}-address`] };
      }).filter((val) => {
        return val ? (val.value as string).trim() !== "" : false;
      });
      console.log(
        `🚀 ~ file: SetDomainRecords.tsx:65 ~ mappedValues:`,
        mappedValues
      );
      const node = namehash(domainWitoutTld + `.${tld}`);

      const encodedCallValues = mappedValues.map((val) => {
        const callData = encodeFunctionData({
          abi: PublicResolverABI,
          functionName: "setAddr",
          args: [node, val?.key, val?.value],
        });
        return callData;
      });
      console.log(
        `🚀 ~ file: SetDomainRecords.tsx:86 ~ encodedCallValues:`,
        encodedCallValues
      );
      const tx = await aggregateTransaction({
        args: [encodedCallValues],
      });
      typeof window !== "undefined" &&
        // @ts-ignore
        window[`modal__set_domain_records_${modalKey || ""}`]?.close();
      reset();

      if (tx?.hash) {
        setTimeout(async () => {
          actionAfter && (await actionAfter());

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
    reset();
  };
  return (
    <form className="my-2 collapse bg-base-300 collapse-arrow">
      <input type="checkbox" name="my-accordion-1" />
      <div className="font-medium collapse-title">Addresses</div>
      <div className="space-y-4 collapse-content">
        {SUPPORTED_COIN_TYPES?.map((v) => {
          return (
            <div
              className="flex flex-row items-center w-full gap-2 form-control"
              key={v.symbol}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                {...registerAddressesForm(`isChecked${v.symbol}`)}
              />
              <div className="w-full border rounded-full input-group border-gray-300/10">
                <div className={`px-2 btn  btn-disabled bg-secondary `}>
                  <img src={v.logo} alt="" className="rounded-full w-7 h-7" />
                  <p className="text-xs">{v.symbol}</p>
                </div>
                <input
                  type="text"
                  placeholder="Enter Address"
                  // onChange={(e) => setAvatarUri(e?.target?.value)}
                  className="w-full input focus:outline-none "
                  {...registerAddressesForm(`${v.symbol}-address`, {})}
                />
              </div>
            </div>
          );
        })}

        <div
          className="text-white btn btn-primary "
          onClick={handleSubmitAddressesForm(handleSetTextRecordBatch)}
        >
          Set Records
        </div>
      </div>
    </form>
  );
}

export default AddressRecords;
