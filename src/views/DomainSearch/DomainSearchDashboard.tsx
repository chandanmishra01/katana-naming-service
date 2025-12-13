import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useAvailability } from "@/hooks/useBaseRegistrarImpl";
import RegisteredDomain from "./RegisteredDomain";
import Register from "./Register";
import React from "react";
import { getDomainWitoutTld } from "@/utils";
import { Toaster } from "react-hot-toast";

type Props = { _label: string };

function DomainSearchDashboard({ _label }: Props) {
  const labelWithoutTld = getDomainWitoutTld(_label);
  const {
    data: isAvailable,
    isFetched,
    isLoading,
    refetch: refetchDomain,
    isRefetching,
  } = useAvailability(labelWithoutTld);
  console.log(`🚀 ~ file: DomainSearchDashboard.tsx:20 ~ isRefetching:`, {
    isRefetching,
    isAvailable,
  });
  return (
    <DashboardLayout>
      {!isLoading && isAvailable && isFetched ? (
        <Register _label={_label as string} refetchDomain={refetchDomain} />
      ) : (
        isFetched && <RegisteredDomain _label={_label as string} />
      )}
      <Toaster />
    </DashboardLayout>
  );
}

export default DomainSearchDashboard;
