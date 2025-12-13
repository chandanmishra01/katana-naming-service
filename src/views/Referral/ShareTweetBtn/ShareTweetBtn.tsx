import React from "react";

const ShareTweetBtn = () => {
  return (
    <button
      className={
        "font-thin btn overflow-hidden rounded-lg flex items-center bg-gradient-to-b border border-gray-400/50 text-white from-[#8d3055] to-[#dc3c417b]"
      }
    >
      <div>
        <img src="/twitter.svg" className="w-5 h-5" alt="" />
      </div>
      <span className="text-md font-[400]  p-1 ">Share Tweet</span>
    </button>
  );
};

export default ShareTweetBtn;
