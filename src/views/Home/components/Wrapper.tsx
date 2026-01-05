import React from "react";

type Feature = {
  title: string;
  description: string;
  accent: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    title: "Identity Arsenal",
    description: "Forge sovereign handles, avatars, and metadata modules that travel anywhere Katana reaches.",
    accent: "from-[#ffe600] via-[#ffbb33] to-[#3ad9ff]",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="3">
        <path
          d="M12 8h40v14c0 14-12 26-20 30-8-4-20-16-20-30V8Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 24h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 16h20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 24v22"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "D-Linktree Channels",
    description: "Route followers to on-chain actions, socials, and token-gated drops with instant updates.",
    accent: "from-[#3ad9ff] via-[#7c6bff] to-[#ffe600]",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="3">
        <circle cx="18" cy="18" r="8" stroke="currentColor" />
        <circle cx="46" cy="18" r="8" stroke="currentColor" />
        <circle cx="32" cy="46" r="8" stroke="currentColor" />
        <path d="M23.5 23.5 28.5 34" stroke="currentColor" strokeLinecap="round" />
        <path d="M40.5 23.5 35.5 34" stroke="currentColor" strokeLinecap="round" />
        <path d="M24 18h16" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Signal Boosters",
    description: "Broadcast proofs, badges, and automated alerts straight from your identity hub.",
    accent: "from-[#ff8d68] via-[#ffe600] to-[#3ad9ff]",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="3">
        <circle cx="32" cy="32" r="6" stroke="currentColor" />
        <path d="M18 18c8-8 20-8 28 0" stroke="currentColor" strokeLinecap="round" />
        <path d="M14 14c11.5-11.5 30.5-11.5 42 0" stroke="currentColor" strokeLinecap="round" />
        <path d="M22 42c5.5 5.5 14.5 5.5 20 0" stroke="currentColor" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Support Runeways",
    description: "Enable tips, fundraising, and revenue splits natively with transparent routing.",
    accent: "from-[#3ad9ff] via-[#ffe600] to-[#ff8d68]",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="3">
        <path
          d="M20 28c0-6.627 5.373-12 12-12s12 5.373 12 12c0 9-12 18-12 18s-12-9-12-18Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 24v8"
          stroke="currentColor"
          strokeLinecap="round"
        />
        <path
          d="M28 28h8"
          stroke="currentColor"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const Wrapper = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white shadow-[0_0_40px_rgba(15,20,55,0.6)] backdrop-blur">
      <div className="pointer-events-none absolute -left-24 top-24 h-32 w-32 rounded-full bg-[#ffe600]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-16 bottom-12 h-32 w-32 rounded-full bg-[#3ad9ff]/20 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.08)_0%,transparent_30%,transparent_70%,rgba(255,255,255,0.05)_100%)]" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-white/70 backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-[#ffe600] shadow-[0_0_12px_rgba(255,230,0,0.6)]" />
          Load Your Kit
        </div>
        <div className="mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-3xl font-black leading-snug sm:text-4xl md:text-5xl">
            Mint once, deploy everywhere. Unlock modules that evolve with your crew.
          </h2>
          <p className="max-w-md text-sm text-white/70">
            Each Katana Name comes battle-ready with modular utilities inspired by katana.network — precision-crafted for builders and their communities.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_12px_30px_rgba(3,3,24,0.35)] transition hover:-translate-y-1 hover:border-[#ffe600]/40 hover:shadow-[0_18px_45px_rgba(4,16,48,0.55)]"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accent} text-[#041029] shadow-[0_0_18px_rgba(255,230,0,0.35)]`}>
                {feature.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm text-white/70">{feature.description}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/50">
                Tap For Loadout
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9L9 3"
                    stroke="currentColor"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5 3h4v4"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
