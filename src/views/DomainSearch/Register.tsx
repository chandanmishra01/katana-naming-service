import {
  useDomainRegister,
  useDomainRentPrice,
} from "@/hooks/useEthRegistrarController";
import { formatAddress, formatWrapedText, getDomainWitoutTld } from "@/utils";
import BigNumber from "bignumber.js";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useAccount } from "wagmi";
import RegistrationModal from "./components/RegistrationModal";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import { useActiveChainId } from "@/hooks/useActiveChainId";
import { contracts } from "@/configs/contracts";
import { DEFAULT_FEE_DENOM } from "@/configs";
import WalletConnectorModal from "@/components/Header/Wallet/WalletConnectorModal";
import { EXPLOERE_URL, YEAR_TO_SEC } from "@/configs/constants";
import { useDebounce } from "use-debounce";
// import { useDomainRentPrice } from "@/hooks/useEthRegistrarController";

type Props = {
  _label: string;
  refetchDomain?: () => void;
};

function Register({ _label, refetchDomain }: Props) {
  const labelWithoutTld = getDomainWitoutTld(_label);
  const [year, setYear] = useState(1);
  const [isPriceRecalculating, setIsPriceRecalculating] = useState(false);
  const router = useRouter();
  const [registerStatus, setRegisterStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const [txnHash, setTxnHash] = useState("");
  // TODO : fetch rentPrice only if domain is not registered
  // const { data: rentPrice } = useDomainRentPrice(_label, "1");
  const { address: account } = useAccount();
  const increaseYear = () => {
    setIsPriceRecalculating(true);
    setYear((prevYear) => prevYear + 1);
  };
  const decreaseYear = () => {
    setIsPriceRecalculating(true);
    if (year > 1) {
      setYear((prevYear) => prevYear - 1);
    }
  };
  const [debouncedYear] = useDebounce(year, 500);
  useEffect(() => {
    setIsPriceRecalculating(false);
  }, [debouncedYear]);
  const chainId = useActiveChainId();
  const yearSuffix = year === 1 ? "year" : "years";
  const { data: domainRentPrice, isLoading: domainRentPriceIsLoading } =
    useDomainRentPrice(labelWithoutTld, YEAR_TO_SEC * debouncedYear);
  const [isSetToPrimary, setisSetToPrimary] = useState(true);
  const { writeAsync: registerDomain } = useDomainRegister();
  const handleRegisterDomain = async () => {
    // const toastId = toast.loading("Submitting txn", {
    //   style: {
    //     background: "#363636",
    //     color: "lightgray",
    //   },
    // });
    setRegisterStatus({
      loading: true,
      success: false,
      error: false,
    });

    try {
      const tx = await registerDomain({
        // @ts-ignore
        value: domainRentPrice?.base || 0,
        args: [
          labelWithoutTld,
          account!,
          YEAR_TO_SEC * year,
          // @ts-ignore
          contracts.publicResolver[chainId as any],
          account!,
          isSetToPrimary,
        ],
      });

      if (tx?.hash) {
        setTimeout(async () => {
          // await handleAfterRegister();
          // await toast.success(
          //   <div className="flex flex-col w-44">
          //     <p>Txn Submitted</p>
          //     <Link
          //       href={`${EXPLOERE_URL}/tx/${tx?.hash}`}
          //       target="_blank"
          //       referrerPolicy="no-referrer"
          //       className="mt-2 font-normal btn btn-xs btn-outline"
          //     >
          //       View on Explorer
          //     </Link>
          //   </div>,
          //   {
          //     id: toastId,
          //     duration: 5000,
          //     style: {
          //       background: "#363636",
          //       color: "lightgray",
          //     },
          //   }
          // );

          await setTxnHash(tx?.hash);
          await setRegisterStatus({
            loading: false,
            success: true,
            error: false,
          });
        }, 5000);
      } else {
        // toast.error(
        //   <div className="flex flex-col w-44">
        //     <p>Txn Failed : Something went wrong</p>
        //     {tx?.hash && (
        //       <Link
        //         href={`${EXPLOERE_URL}/tx/${tx?.hash}`}
        //         target="_blank"
        //         referrerPolicy="no-referrer"
        //         className="mt-2 font-normal btn btn-xs btn-outline"
        //       >
        //         View on Explorer
        //       </Link>
        //     )}
        //   </div>,
        //   {
        //     id: toastId,
        //     duration: 5000,
        //     style: {
        //       background: "#363636",
        //       color: "lightgray",
        //     },
        //   }
        // );
        setTxnHash(tx?.hash);
        setRegisterStatus({
          loading: false,
          success: false,
          error: true,
        });
      }
      console.log(`🚀 ~ file: Register.tsx:56 ~ tx:`, tx);
    } catch (error) {
      // toast.error(
      //   <div className="flex flex-col w-44">
      //     <p>Txn Failed : Something went wrong</p>
      //   </div>,
      //   {
      //     id: toastId,
      //     duration: 5000,
      //     style: {
      //       background: "#363636",
      //       color: "lightgray",
      //     },
      //   }
      // );
      console.log(`🚀 ~ file: Register.tsx:57 ~ error:`, error);
      setRegisterStatus({
        loading: false,
        success: false,
        error: true,
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto h-full w-[100%] sm:w-[60%] md:w-[60%] lg:w-[40%] p-5 mt-5">
        <Image
          src="/pfp.png"
          width={180}
          height={180}
          alt="Avatar"
          className="rounded-full"
        />
        <p className="mt-5 text-lg font-medium md:text-2xl">
          {_label}
        </p>
        {account ? (
          <p className="text-[12px] font-medium md:text-[15px] mt-2 text-gray-400">
            <span className="hidden md:block">{account}</span>
            <span className="block md:hidden">{formatAddress(account!)}</span>
          </p>
        ) : (
          ""
        )}
        <div className="w-full mt-5 text-left">
          <h3 className="mt-5 font-medium text-md md:text-lg">
            Register : {_label}
          </h3>
        </div>
        <div className="flex flex-row w-[100%] md:w-[100%] p-4 bg-white/10 justify-between items-center rounded-xl mt-2 border border-gray-600">
          <button
            className="px-2 ml-1 text-lg border-2 border-gray-400 rounded-lg"
            onClick={decreaseYear}
          >
            -
          </button>
          <p className="flex w-fit text-md md:text-lg">
            {year} {yearSuffix}
          </p>
          <button
            className="px-2 mr-1 text-lg border-2 border-gray-400 rounded-lg"
            onClick={increaseYear}
          >
            +
          </button>
        </div>
        <div className="w-full text-left">
          <p className="mt-5 text-sm tracking-wider text-gray-400 font-regular md:text-md">
            NOTE: Extending for multiple years saves on network costs by
            avoiding yearly transactions.
          </p>
        </div>
        <div className="flex flex-col w-[100%] md:w-[100%] p-4 bg-white/10 space-y-2 justify-between items-center rounded-xl mt-8 border border-gray-600">
          <span className="flex flex-row justify-between w-full md:px-5">
            <p className=" text-md md:text-lg">Fees</p>
          </span>{" "}
          <span className="flex flex-row justify-between w-full md:px-5">
            <p className="text-gray-400 text-md md:text-lg">
              {year} {yearSuffix} registration
            </p>
            {isPriceRecalculating || domainRentPriceIsLoading ? (
              <p className="w-32 h-6 text-gray-400 rounded-2xl text-md md:text-lg animate-pulse bg-base-200"></p>
            ) : (
              <p className="text-gray-400 text-md md:text-lg">
                <p>
                  {/* @ts-ignore */}
                  {new BigNumber(domainRentPrice?.base)
                    ?.div(1e18)
                    ?.toFixed(5)}{" "}
                  {DEFAULT_FEE_DENOM}
                </p>
              </p>
            )}
          </span>
        </div>
        {/* <div className="w-full mt-3 text-left">
          <h3 className="mt-5 font-medium text-md md:text-lg">
            Payment Method
          </h3>
        </div>
        <div className="flex flex-col w-[100%] md:w-[100%] p-2 bg-white/10 justify-between items-center rounded-xl mt-2 border border-gray-600">
          <span className="flex flex-row items-center w-full px-5 py-2 space-x-4">
            <input
              type="radio"
              id="zetaChain"
              name="radioGroup"
              className="radio radio-sm md:radio-md radio-success"
            />
            <label
              htmlFor="zetaChain"
              className="text-sm text-gray-400 md:text-lg"
            >
              ZetaChain Athens
            </label>
          </span>
        </div> */}
        {account ? (
          <RegistrationModal
            onCloseReset={() => {
              setTimeout(async () => {
                refetchDomain && (await refetchDomain());
                await setRegisterStatus({
                  loading: false,
                  success: false,
                  error: false,
                });
              }, 5000);
            }}
          >
            {registerStatus.loading && (
              <div className="flex flex-col justify-center mx-auto">
                <h3 className="mx-auto text-xl font-semibold">
                  Pending Transaction
                </h3>
                <Player
                  autoplay
                  loop
                  src="/lottie/pending.json"
                  style={{ height: "200px", width: "200px" }}
                >
                  <Controls
                    visible={false}
                    buttons={["play", "repeat", "frame"]}
                  />
                </Player>
              </div>
            )}
            {registerStatus.success && (
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold">
                  Transaction Successful
                </h3>
                <p className="mt-2 mb-4 text-md">
                  Your registration transaction of{" "}
                  {formatWrapedText(_label, 4, 6)} domain was successful
                </p>
                <Player
                  autoplay
                  loop
                  src="/lottie/success.json"
                  style={{ height: "150px", width: "150px" }}
                >
                  <Controls
                    visible={false}
                    buttons={["play", "repeat", "frame"]}
                  />
                </Player>
                <div className="flex flex-row mx-auto space-x-3">
                  <button
                    className="px-4 py-2 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
                    onClick={() => {
                      window.open(`${EXPLOERE_URL}/tx/${txnHash}`, "_blank");
                      router.push(`/registered/${_label}`);
                    }}
                  >
                    View on Explorer
                  </button>
                  <button
                    className="px-4 py-2 text-sm border border-gray-400 w-fit bg-white/10 rounded-3xl"
                    onClick={() => {
                      router.push(`/registered/${_label}`);
                    }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}
            {registerStatus.error && (
              <div className="flex flex-col justify-center">
                <h3 className="text-xl font-semibold">Transaction Failed</h3>
                <p className="mt-2 mb-4 text-md">
                  Something went wrong... Try Again!
                </p>
                <Player
                  autoplay
                  loop
                  src="/lottie/failed.json"
                  style={{ height: "100px", width: "100px" }}
                >
                  <Controls
                    visible={false}
                    buttons={["play", "repeat", "frame"]}
                  />
                </Player>
                <button
                  className="px-4 py-2 mx-auto mt-5 text-sm border border-gray-400 w-fit rounded-3xl bg-gradient-to-r from-[#ffe600] via-[#ffef87] to-[#3ad9ff] text-base font-extrabold uppercase tracking-[0.35em] text-[#041029] transition-all duration-100 ease-out hover:shadow-[0_0_60px_rgba(74,217,255,0.45)]"
                  onClick={() => {
                    router.push(`/domain/${_label}`);
                    setRegisterStatus({
                      loading: false,
                      success: false,
                      error: false,
                    });
                  }}
                >
                  Close
                </button>
              </div>
            )}
            {!registerStatus.loading &&
              !registerStatus?.success &&
              !registerStatus.error && (
                <div className="flex flex-col justify-center mx-auto">
                  <h3 className="mx-auto text-xl font-semibold">
                    Confirm Details
                  </h3>
                  <p className="mx-auto mt-2 mb-4 text-sm">
                    Double check these details before confirming in your wallet.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Name</p>
                      <p>{formatWrapedText(_label, 4, 6)}</p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Action</p>
                      <p>Register Name</p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Fee</p>
                      <p>
                        {/* @ts-ignore */}
                        {new BigNumber(domainRentPrice?.base)
                          ?.div(1e18)
                          ?.toString()}{" "}
                        {DEFAULT_FEE_DENOM}
                      </p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Duration</p>
                      <p>
                        {year} {yearSuffix}
                      </p>
                    </div>
                    <div className="flex flex-row w-[100%] p-4 bg-white/10 justify-between border border-gray-600 rounded-lg">
                      <p>Primary</p>
                      <input
                        type="checkbox"
                        className="bg-[#FFE600] toggle toggle-[#FFE600]"
                        checked={isSetToPrimary}
                        onChange={(e) => setisSetToPrimary(e?.target?.checked)}
                      />
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 mx-auto mt-5 text-sm border border-gray-400 w-fit rounded-3xl bg-gradient-to-r from-[#ffe600] via-[#ffef87] to-[#3ad9ff] text-base font-extrabold uppercase tracking-[0.35em] text-[#041029] transition-all duration-100 ease-out hover:shadow-[0_0_60px_rgba(74,217,255,0.45)]"
                    onClick={() => {
                      if (!account) {
                        toast.error("Please connect wallet", {
                          style: {
                            background: "#363636",
                            color: "lightgray",
                          },
                        });
                        return;
                      } else {
                        handleRegisterDomain();
                      }
                    }}
                  >
                    Confirm
                  </button>
                </div>
              )}
          </RegistrationModal>
        ) : (
          <div className="flex items-center justify-center w-full my-5">
            <WalletConnectorModal />
          </div>
        )}
      </div>
    </>
  );
}

export default Register;
