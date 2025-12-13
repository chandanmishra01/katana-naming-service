import React from "react";
import WalletConnectorModal from "./Wallet/WalletConnectorModal";
import Link from "next/link";

type Props = { isFromDashLayout?: boolean };

function Header({}: Props) {
  return (
    // put header above main content
    <header className="relative z-30 w-full px-3 md:px-4">
      <div
        className="
          flex w-full flex-wrap items-center justify-between gap-3
          rounded-3xl border border-white/10 bg-white/10
          px-3 py-2 text-white
          shadow-[0_0_30px_rgba(4,10,45,0.35)]
          backdrop-blur
          md:rounded-full md:px-4 md:py-3
        "
      >
        {/* Left logo / title */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Desktop + mobile logo + text (unchanged) */}
          <Link
            href={"/"}
            className="flex items-center gap-3 text-white transition hover:text-[#ffe600]"
          >
            <img src="/logo.png" alt="" width={60} height={60} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em]">
                KatanaDomains
              </p>
              <p className="text-sm text-white/60">Katana-ready identities</p>
            </div>
          </Link>
        </div>

        {/* Center nav (same structure as before) */}
        <nav className="order-3 w-full lg:order-none lg:w-auto lg:flex lg:items-center font-manrope">
          <ul className="mt-1 flex w-full items-center justify-center gap-4 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-white/60 sm:gap-6 md:gap-8 lg:mt-0 lg:gap-10 lg:text-xs">
            <li className="transition hover:text-[#ffe600]">
              <Link href="/">Home</Link>
            </li>
            <li className="transition hover:text-[#ffe600]">
              <Link href="/my-account">My Account</Link>
            </li>
            <li className="transition hover:text-[#ffe600]">
              <Link href="/referral">Referral</Link>
            </li>
          </ul>
        </nav>

        {/* Right side actions */}
       <div className="flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-end sm:gap-4">
  <div className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-white/60 xs:inline-flex md:px-4">
    Mainnet Ready
  </div>
  <div className="relative z-40">
    <WalletConnectorModal />
  </div>
</div>

      </div>
    </header>
  );
}

export default Header;
