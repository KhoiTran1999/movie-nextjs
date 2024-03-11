"use client";

import { Copy } from "@/public/copy";
import { Tooltip, message } from "antd";

export const CopyUrl = () => {
  const handleCopyUrl = async () => {
    const url: string = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      message.success("Copied");
    } catch (error) {
      console.log(error);
      message.error("Can not copy Link to clipboard!");
    }
  };

  return (
    <Tooltip color="#b2afaf2e" title="Copy Link">
      <span
        className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-full  bg-[#b2afaf2e] p-3 transition-colors hover:bg-[#adaaaa64]`}
      >
        <span onClick={handleCopyUrl}>
          <Copy width={20} height={20} fill="#D1D0CF" />
        </span>
      </span>
    </Tooltip>
  );
};
