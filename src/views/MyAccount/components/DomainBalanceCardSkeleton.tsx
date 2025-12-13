import React from "react";

function DomainBalanceCardSkeleton() {
  return (
    <div>
      <div className="w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 animate-pulse">
        {/* Top gradient strip */}
        <div className="w-full h-[8em] bg-gradient-to-r from-[#ffe600] via-[#ffbc52] to-[#4ad7ff]" />

        <div className="p-3">
          {/* Avatar + title row */}
          <div className="flex items-center w-full gap-2 my-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/10">
              <div className="w-3 h-3 bg-[#ffe600] rounded-full" />
            </div>
            <p className="w-full h-4 rounded-full bg-white/10" />
          </div>

          {/* Subtitle line */}
          <p className="w-full h-4 mt-2 rounded-full bg-white/10" />
        </div>
      </div>

      {/* Bottom bar skeleton */}
      <div className="flex justify-center w-full px-2">
        <p className="w-full h-5 px-5 mt-2 text-center rounded-full bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}

export default DomainBalanceCardSkeleton;
