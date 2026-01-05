import React from "react";

import Header from "@/components/Header/Header";
import SearchDomainInput from "@/components/SearchDomain/SearchDomainInput";
import Footer from "@/components/Footer/Footer";

import Hero from "./components/Hero";
import Wrapper from "./components/Wrapper";
import ImagePlaceholder from "./components/ImagePlaceholder";

type Props = {};

function Home({}: Props) {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/katana-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#03021a]/95 via-[#03021a]/80 to-[#001744]/85" />
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[#ffe600]/25 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[12%] h-[24rem] w-[30rem] rounded-full bg-[#33d1ff]/30 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-10rem] right-[-6rem] h-[22rem] w-[22rem] rotate-[32deg] rounded-3xl border border-[#ffe600]/40" />
      <div className="pointer-events-none absolute left-[5%] top-[8%] h-24 w-px bg-gradient-to-b from-transparent via-[#ffe600]/60 to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-16 pt-6 md:px-10 lg:px-14">
        <Header />
        <main className="flex flex-1 flex-col">
          <section className="relative mt-12 grid grid-cols-1 items-start gap-12 lg:mt-20 lg:grid-cols-[1.1fr_0.9fr]">
            <Hero>
              <div className="mt-10 space-y-8">
                <SearchDomainInput />
                <div className="flex flex-col items-start justify-start gap-4 text-sm uppercase tracking-[0.32em] text-white/60 md:flex-row md:items-center">
                  {/* <a
                    href="https://snaps.metamask.io/snap/npm/getheminames-resolver/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-[#ffe600]/40 bg-gradient-to-r from-[#ffe600] via-[#ffef87] to-[#49daff] px-6 py-3 text-[0.65rem] font-bold tracking-[0.3em] text-[#041029] shadow-[0_0_40px_rgba(255,230,0,0.35)] transition hover:shadow-[0_0_55px_rgba(76,222,255,0.45)] cursor-not-allowed pointer-events-none"
                  >
                    <img
                      src="images/logos/MetaMask-icon-fox.svg"
                      alt="MetaMask"
                      width={22}
                      height={22}
                      className="rounded-full"
                    />
                    Install Snap
                  </a> */}
                </div>
              </div>
            </Hero>
            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 blur-[1px]" />
              <div className="absolute -right-10 top-6 -z-20 hidden h-24 w-24 rotate-45 border border-[#ffe600]/40 lg:block" />
              <div className="relative rounded-[2rem] border border-white/10 bg-white/10 p-1 backdrop-blur-2xl">
                <div className="rounded-[1.7rem] border border-white/10 bg-[#03021a]/70 p-8 backdrop-blur-3xl">
                  <ImagePlaceholder />
                </div>
              </div>
            </div>
          </section>
          {/* <section className="relative mt-20">
            <div className="absolute inset-x-0 -top-16 -z-10 mx-auto h-40 max-w-4xl bg-gradient-to-r from-transparent via-[#ffe600]/20 to-transparent blur-3xl" />
            <Wrapper />
          </section> */}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
