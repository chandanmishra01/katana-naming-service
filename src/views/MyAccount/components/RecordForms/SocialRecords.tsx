import { EXPLOERE_URL, SOCIAL_RECORD_KEYS } from "@/configs/constants";
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

function SocialRecords({ domainWitoutTld, tld, actionAfter, modalKey }: Props) {
  const {
    register: registerSocialsForm,
    handleSubmit: handleSubmitSocialsForm,
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
      const mappedValues = SOCIAL_RECORD_KEYS.map((val) => {
        if (!v[`isChecked${val.formKey}`]) {
          return null;
        }
        return { key: val.key, value: v[`${val.formKey}-url`] };
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
          functionName: "setText",
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
      <div className="font-medium collapse-title">Socials</div>
      <div className="space-y-4 collapse-content">
        {SOCIAL_RECORD_KEYS?.map((v) => {
          return (
            <div
              className="flex flex-row items-center w-full gap-2 form-control"
              key={v.formKey}
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                {...registerSocialsForm(`isChecked${v.formKey}`)}
              />
              <div className="w-full border rounded-full input-group border-gray-300/10">
                <div
                  className={`text-white btn  btn-disabled bg-[${v.color}] `}
                  style={{
                    backgroundColor: v.color,
                  }}
                >
                  <img src={v.icon} alt="" />
                </div>
                <input
                  type="url"
                  placeholder=" URI"
                  // onChange={(e) => setAvatarUri(e?.target?.value)}
                  className="w-full input focus:outline-none "
                  {...registerSocialsForm(`${v.formKey}-url`, {})}
                />
              </div>
            </div>
          );
        })}

        <div
          className="text-white btn btn-primary "
          onClick={handleSubmitSocialsForm(handleSetTextRecordBatch)}
        >
          Set Records
        </div>
      </div>
    </form>
  );
}

export default SocialRecords;
