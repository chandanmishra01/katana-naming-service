import React from "react";

type Props = {
  children?: React.ReactNode;
};

// const heroStats = [
//   { value: "2,500+", label: "Identities Forged" },
//   { value: "12", label: "Cross-Chain Links" },
//   { value: "~21s", label: "Average Mint Time" },
// ];

function Hero({ children }: Props) {
  return (
    <div className="relative max-w-2xl">
      <div className="pointer-events-none absolute -left-10 -top-12 hidden h-24 w-24 rotate-12 border border-[#ffe600]/40 md:block" />
      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.45em] text-white/70 backdrop-blur">
        <span className="h-2 w-2 animate-ping rounded-full bg-[#ffe600]"></span>
        Katana Identity Surface
      </div>
      <h1 className="mt-6 text-4xl font-black leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl">
        Forge your
        <span className="mx-2 inline-flex bg-gradient-to-r from-[#ffe600] via-[#ffbc52] to-[#4ad7ff] bg-clip-text text-transparent">
          Katana Persona
        </span>
        and cut through Web3 noise.
      </h1>
      <p className="mt-6 max-w-xl text-base text-white/75 sm:text-lg">
        Claim a katana-inspired identity, weave verified credentials, and carry
        your community across every chain. Your handle is now a weapon.
      </p>
      {/* <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {heroStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-center backdrop-blur"
          >
            <div className="text-2xl font-black text-white sm:text-3xl">
              {stat.value}
            </div>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div> */}
      {children && <div className="pt-8">{children}</div>}
    </div>
  );
}

export default Hero;
