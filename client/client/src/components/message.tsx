import React from "react";

export default function Message({ prompt }: { prompt: string }) {
  return (
    <div className="flex rounded-3xl px-4 py-2 border-1 max-w-md text-white bg-[#0078fe] break-before-all">
      {prompt}
    </div>
  );
}
