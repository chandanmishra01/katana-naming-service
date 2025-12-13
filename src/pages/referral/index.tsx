import SeoHead from "@/components/SeoHead/SeoHead";
import Referral from "@/views/Referral/Referral";
import React from "react";
type Props = {};

function index({}: Props) {
  return (
    <div>
      <SeoHead />

      <Referral />
    </div>
  );
}

export default index;
