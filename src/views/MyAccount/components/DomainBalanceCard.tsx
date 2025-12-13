import { formatWrapedText, hexBytesToString } from "@/utils";
import React from "react";
import SetDomainRecords from "./SetDomainRecords";
import Link from "next/link";

type Props = {
  name: string;
  tld: string;
  title?: string;
  description?: string;
  href?: string;
  coverImage?: string;
  actionAfterSetAvatar?: () => void;
  actionAfterSetSocialRecords?: () => void;
  actionAfterSetAddressRecords?: () => void;
  actionAfterSetPrimaryName?: () => void;
};

function DomainBalanceCard({
  name,
  tld,
  actionAfterSetSocialRecords,
  actionAfterSetAddressRecords,
  actionAfterSetPrimaryName,
  actionAfterSetAvatar,
}: Props) {
  return (
    <div>
      <div className="w-full p-4 overflow-hidden border border-gray-500/50 rounded-2xl  bg-gradient-to-b from-[#D4FF5C]  to-[#C7FF2C]">
        <div className="flex items-center  mb-[5.5em] justify-between">
          <div className="w-[2em] h-[2em] bg-gradient-to-b from-[#052D1E] via-[#03513D]  to-[#005741] rounded-full"></div>
          <SetDomainRecords
            actionAfterSetSocialRecords={actionAfterSetSocialRecords}
            actionAfterSetAddressRecords={actionAfterSetAddressRecords}
            actionAfterSetPrimaryName={actionAfterSetPrimaryName}
            actionAfterSetAvatar={actionAfterSetAvatar}
            domainWitoutTld={hexBytesToString(name as string)}
            isLoading={false}
            tld={tld}
            modalKey={name}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="black"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            }
          />
        </div>

        <Link
          href={`/domain/${hexBytesToString(name as string)}.${tld}`}
          className="text-[0.9em] text-[#052D1E] font-semibold"
        >
          {" "}
          {formatWrapedText(hexBytesToString(name as string), 6, 3)}.{tld}
        </Link>
      </div>
    </div>
  );
}

export default DomainBalanceCard;
