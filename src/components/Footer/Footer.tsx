import Link from "next/link";
import React from "react";

type Props = {};

function Footer({}: Props) {
return (
  <div className="mt-24 text-white">
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_0_35px_rgba(4,12,50,0.35)] backdrop-blur">
      <div className="pointer-events-none absolute -right-16 top-0 h-32 w-32 rotate-12 rounded-3xl border border-[#ffe600]/40" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-32 w-32 rounded-full bg-[#33d6ff]/20 blur-[120px]" />

      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <Link href={"/"} className="flex items-center gap-3 text-white transition hover:text-[#ffe600]">
          <img src="/logo.png" alt="" width={60} height={60} />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em]">
              KatanaDomains
            </p>
            <p className="text-sm text-white/60">Katana-ready identities</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
          <Link href="/" className="transition hover:text-[#ffe600]">
            Home
          </Link>
          <Link href="/referral" className="transition hover:text-[#ffe600]">
            Referral
          </Link>
          <a
            href="https://getheminames.gitbook.io/getheminames"
            target="_blank"
            referrerPolicy="no-referrer"
            className="transition hover:text-[#ffe600]"
          >
            Docs
          </a>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/getHemiNames"
            target="_blank"
            referrerPolicy="no-referrer"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 transition hover:border-[#ffe600]/50 hover:shadow-[0_0_20px_rgba(74,217,255,0.45)]"
          >
            <img src="/images/icons/twitter.svg" alt="" className="h-5 w-5 invert" />
          </a>
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/60 md:flex-row md:items-center md:justify-between">
        <span>
          &copy; {new Date().getFullYear()} Built by KatanaDomains
        </span>
        <span className="text-white/40">
          Powered by the katana.network spirit — sharpened on KATANA.
        </span>
      </div>
    </div>
  </div>
);
}

export default Footer;
