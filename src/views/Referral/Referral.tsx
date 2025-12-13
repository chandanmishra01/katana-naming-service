import DashboardLayout from "@/components/Layout/DashboardLayout";
import React from "react";
// import ReferralLink from "./ReferralLink/ReferralLink";

const Referral = () => {
  return (
    <DashboardLayout>
      <div className=" p-10 mx-5 my-5 rounded-[20px] border border-gray-400/50 bg-domain-card-gradient bg-opacity-60 mt-10 select-none">
        <div className="blur-sm mb-4 text-4xl font-[500]">
          Refer with your Friends and Earn Rewards 💰
        </div>
        <div className="blur-sm text-md text-gray-200 font-[300]">
          Invite your friends to register a .zeta domain on our platform, once
          they register using your referral link you get upto 20% of the total
          purchase value
        </div>
        {/* <div className="my-5 text-5xl blur-sm">Coming Soon</div> */}
        <div className="w-3/4 h-10 my-5 blur-sm bg-base-100"></div>
        <p>Coming Soon!</p>
        {/* <ReferralLink /> */}
        {/* {!account ? (
          <WalletModal btnClassNames="btn-md my-8 !rounded-[100px]" />
          ) : (

        )} */}
        {/* <ShareTweetBtn /> */}
      </div>
    </DashboardLayout>
  );
};

export default Referral;
