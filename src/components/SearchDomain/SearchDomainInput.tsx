import { DEFAULT_TLD } from "@/configs";
import { useAvailabilityQuery } from "@/hooks/useBaseRegistrarImpl";
import { formatZetaName } from "@/utils";
import { normalise } from "@/utils/namehash";
import { hasSpecialCharacters } from "@/utils/validators";
import { useRouter } from "next/router";

import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

type Props = {
  subActionOnSelect?: () => void;
};

function SearchDomainInput({ subActionOnSelect }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const handleSearch = React.useCallback((event: any) => {
    const { value } = event.target;

    try {
      if ((value as string).length >= 65) {
        toast.error("Require domain length less than 65", {
          style: {
            background: "#363636",
            color: "lightgray",
          },
        });
        return;
      }
      if ((value as string).match("~")) {
        return;
      }
      const normalisedInput = normalise(value);
      setSearchInput((normalisedInput as string).replace(" ", "").trim());
    } catch (error) {
      toast.error("Please avoid special characters", {
        style: {
          background: "#363636",
          color: "lightgray",
        },
      });
      return;
    }
  }, []);
  const { data, isLoading, isFetched } = useAvailabilityQuery(searchInput);
  const handleDomainSelect = () => {
    subActionOnSelect && subActionOnSelect();
    const isInvalid = hasSpecialCharacters(searchInput);

    if (isInvalid || (searchInput as string).length >= 65) {
      toast.error("Invalid domain name", {
        style: {
          background: "#363636",
          color: "lightgray",
        },
      });
      return;
    }

    router.push(`/domain/${searchInput?.trim()}.${DEFAULT_TLD}`);
  };
  return (
    <div className="w-full dropdown dropdown-bottom">
      <div className="flex items-center justify-between gap-3">
        <div className="flex w-full items-center gap-3 rounded-full border border-white/15 bg-white/10 px-2 py-2 shadow-[0_0_30px_rgba(4,12,50,0.45)] backdrop-blur">
          <span className="flex h-12 w-12 items-center justify-center rounded-full">
            <svg
              fill="currentColor"
              width="22"
              height="22"
              version="1.1"
              id="lni_lni-search-alt"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
            >
              <path d="M61.4,55.7L44.9,42.3c6.8-9.3,6.1-22.6-2.4-31c-4.5-4.5-10.5-7-16.9-7s-12.4,2.5-16.9,7c-9.3,9.3-9.3,24.5,0,33.8 c4.5,4.5,10.5,7,16.9,7c6.1,0,11.8-2.3,16.3-6.4l16.7,13.5c0.4,0.3,0.9,0.5,1.4,0.5c0.7,0,1.3-0.3,1.7-0.8 C62.5,57.9,62.4,56.5,61.4,55.7z M25.6,47.6c-5.2,0-10-2-13.7-5.7c-7.6-7.6-7.6-19.9,0-27.4c3.7-3.7,8.5-5.7,13.7-5.7 c5.2,0,10,2,13.7,5.7c7.6,7.6,7.6,19.9,0,27.4C35.7,45.6,30.8,47.6,25.6,47.6z" />
            </svg>
          </span>
          <input
            className="h-12 w-full rounded-full border-none bg-transparent text-base font-medium tracking-wide text-white placeholder:text-white/50 focus:outline-none"
            placeholder="Enter your Kat domain..."
            value={searchInput}
            onChange={handleSearch}
          />

          <button
            type="button"
            onClick={handleDomainSelect}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#ffe600] via-[#ffef87] to-[#3ad9ff] px-5 py-2 text-xs font-extrabold uppercase tracking-[0.35em] text-[#041029] transition hover:shadow-[0_0_35px_rgba(74,217,255,0.45)]"
          >
            Search
          </button>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content mt-3 w-full rounded-2xl border border-white/10 bg-[#03021a]/90 p-3 text-sm font-[400] shadow-[0_0_30px_rgba(4,10,45,0.6)] backdrop-blur-xl"
      >
        {searchInput?.trim() == "" && (
          <p className="p-3 text-white/60">Type a domain name to search</p>
        )}
        {searchInput?.trim() !== "" && (
          <div
            onClick={() => handleDomainSelect()}
            className="cursor-pointer rounded-xl p-2 transition hover:bg-white/5 active:bg-white/10"
          >
            <div className="flex w-full items-center gap-2 md:space-x-4">
              <span className="h-7 w-7 rounded-full bg-gradient-to-b from-[#ffe600] via-[#ffbb33] to-[#33d6ff] shadow-[0_0_16px_rgba(255,230,0,0.4)]"></span>
              <div className="order-0 block h-5 w-5 flex-none rounded-full bg-gradient-to-br from-[#ffe600] to-[#3ad9ff] md:hidden"></div>
              <div className="block flex-1 space-y-6 py-1 md:hidden">
                {formatZetaName(searchInput)}.{DEFAULT_TLD}
              </div>
              {hasSpecialCharacters(searchInput) ||
              searchInput?.length >= 65 ? (
                <div className="hidden w-[10em] flex-1 space-y-6 overflow-hidden py-1 text-ellipsis text-error md:block">
                  Invalid Domain
                </div>
              ) : (
                <div className="hidden w-[10em] flex-1 space-y-6 overflow-hidden py-1 text-ellipsis text-white md:block">
                  {searchInput}.{DEFAULT_TLD}
                </div>
              )}
              {isLoading && (
                <div>
                  <svg
                    className="mr-3 -ml-1 h-5 w-5 animate-spin text-[#ffe600]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
              {(hasSpecialCharacters(searchInput) ||
                searchInput?.length >= 65 ||
                searchInput?.length < 3) && (
                <div className="badge badge-error px-[2px] text-[0.7em]">
                  Invalid
                </div>
              )}
              {!!data &&
                isFetched &&
                !hasSpecialCharacters(searchInput) &&
                searchInput?.length < 65 &&
                searchInput?.length > 2 && (
                  <div className="badge badge-success px-[2px] text-[0.7em]">
                    Available
                  </div>
                )}

              {!data && isFetched && searchInput?.length < 65 && (
                <div className="badge badge-error px-[2px] text-[0.7em]">
                  Registered
                </div>
              )}
            </div>
          </div>
        )}
      </ul>
      <Toaster />
    </div>
  );
}

export default SearchDomainInput;
