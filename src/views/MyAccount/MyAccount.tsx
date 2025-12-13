import DashboardLayout from "@/components/Layout/DashboardLayout";

import React from "react";
import { useAccount } from "wagmi";
import dynamic from "next/dynamic";
import WalletConnectorModal from "@/components/Header/Wallet/WalletConnectorModal";
// import { useAccount } from "wagmi";
const DomainBalanceList = dynamic(
  () => import("./components/DomainBalanceList"),
  {
    ssr: false,
  }
);

type Props = {};

function MyAccount({}: Props) {
  const { address: account = null } = useAccount();

  return (
    <DashboardLayout>
      {account ? (
        <DomainBalanceList />
      ) : (
        <div className="flex items-center justify-center w-full">
          <WalletConnectorModal />
        </div>
      )}
    </DashboardLayout>
  );
}

export default MyAccount;
