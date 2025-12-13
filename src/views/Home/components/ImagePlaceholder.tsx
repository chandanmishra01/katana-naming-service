import React from "react";
import Image from "next/image";

const ImagePlaceholder = () => {
  return (
    <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-b from-[#0d1736]/90 to-[#02000f]/90 text-white">
      <div className="pointer-events-none absolute -right-14 top-12 h-36 w-36 rotate-12 rounded-3xl border border-[#ffe600]/40" />
      <div className="pointer-events-none absolute -left-10 bottom-[-4rem] h-40 w-40 rounded-full bg-[#33d1ff]/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_55%)]" />

      <div className="relative z-10 flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-white/60">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ffe600] shadow-[0_0_12px_rgba(255,230,0,0.6)]" />
            Forge Preview
          </span>
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-white/70">
            Syncing
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#040622]/80 p-6 text-center backdrop-blur">
          <div className="pointer-events-none absolute -top-10 right-4 h-24 w-24 rounded-full bg-[#ffe600]/15 blur-[70px]" />
          <div className="flex items-center justify-center">
            <Image src="/K-mascot-head-alpha.png" alt="Mint progress illustration" width={220} height={220} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left text-xs uppercase tracking-[0.25em] text-white/60">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <p>Identity</p>
            <p className="mt-2 text-base font-semibold normal-case tracking-normal text-white">alice.kat</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
            <p>Owner</p>
            <p className="mt-2 text-base font-semibold normal-case tracking-normal text-white">0x23...D1</p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-3 rounded-full border border-[#ffe600]/40 bg-gradient-to-r from-[#ffe600] via-[#ffef87] to-[#3ad9ff] px-6 py-3 text-sm font-bold uppercase tracking-[0.4em] text-[#041029] shadow-[0_0_35px_rgba(255,229,111,0.35)] transition hover:shadow-[0_0_45px_rgba(74,217,255,0.45)]"
        >
          Forge Identity
        </button>
      </div>
    </div>
  );
};

export default ImagePlaceholder;
