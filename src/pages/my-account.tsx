import React from "react";
import dynamic from "next/dynamic";
// import { useAccount } from "wagmi";
const MyAccount = dynamic(() => import("@/views/MyAccount/MyAccount"), {
  ssr: false,
});

type Props = {};

function account({}: Props) {
  return (
    <div>
      <MyAccount />
    </div>
  );
}

export default account;
