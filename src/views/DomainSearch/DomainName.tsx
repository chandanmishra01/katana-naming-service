import DashboardLayout from "@/components/Layout/DashboardLayout";
import Image from "next/image";
import { formatWrapedText } from "@/utils";
import { Toaster } from "react-hot-toast";
import Confetti from "react-confetti";
import { useRouter } from "next/router";
import { useDomainOwnerFromRegistry } from "@/hooks/useDotlabsRegistry";
import { useAccount } from "wagmi";
import { ZERO_ADDRESS } from "@/configs/constants";

type Props = { _label: string };

function DomainName({ _label }: Props) {
  const { address: account } = useAccount();
  const router = useRouter();

  const {
    data: domainOwner,
    isFetched,
    isLoading: domainOwnerIsLoading,
  } = useDomainOwnerFromRegistry(_label);

  if (isFetched && !domainOwnerIsLoading && domainOwner !== account) {
    router.push(`/domain/${_label}`);
  }
  return (
    <DashboardLayout>
      {!!domainOwner &&
        domainOwner !== ZERO_ADDRESS &&
        !domainOwnerIsLoading && (
          <>
            <div className="flex flex-col items-center justify-center mx-auto h-full w-[70%] sm:w-[60%] md:w-[60%] lg:w-[40%] p-5 mt-5">
              <div className="flex flex-col bg-[#ccf84a] w-[75%] sm:w-[65%] md:w-[55%] lg:w-[45%] h-[13rem] p-5 rounded-xl justify-center items-center">
                <Image
                  src="/pfp1.png"
                  width={120}
                  height={120}
                  alt="Avatar"
                  className="rounded-full drop-shadow-lg"
                />
                <p className="text-md md:text-xl font-semibold text-[#125641]">
                  {formatWrapedText(_label, 4, 6)}
                </p>
              </div>
              <h2 className="mt-5 text-xl font-medium md:text-2xl">
                Congratulations!
              </h2>
              <div className="flex justify-center w-full mx-auto mt-4">
                <h3 className="text-lg font-medium md:text-xl">
                  You are now the owner of{" "}
                  <span className="text-lg font-medium register md:text-xl">
                    {formatWrapedText(_label, 4, 6)}
                  </span>
                </h3>
              </div>
              <div className="flex flex-col items-center justify-center w-full mx-auto mt-2">
                <p className="text-sm tracking-wider text-gray-400 font-regular md:text-md">
                  Your name was successfully registered.
                </p>
                <p className="text-sm tracking-wider text-gray-400 font-regular md:text-md">
                  You can view & manage your name
                </p>
              </div>

              <hr className="border-gray-600 border-1 w-[95%] mt-5"></hr>
              <div className="flex flex-row justify-center mx-auto mt-5 space-x-3">
                <button
                  className="w-fit px-5 py-2.5 bg-white/10 text-sm md:text-md border border-gray-400 rounded-3xl"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Register Another
                </button>
                <button
                  className="w-fit px-5 py-2.5 bg-white/10 text-sm md:text-md border border-gray-400 rounded-3xl"
                  onClick={() => {
                    router.push(`/domain/${_label}`);
                  }}
                >
                  View Name
                </button>
              </div>
            </div>
            <Confetti run={true} />
            <Toaster/>
          </>
        )}
    </DashboardLayout>
  );
}

export default DomainName;
