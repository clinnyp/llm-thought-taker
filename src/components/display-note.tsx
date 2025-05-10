"use client";

import Message from "./message";
import Response from "./response";

interface Props {
  prompt: string;
  chatResponse: string;
}

export default function DisplayNote({ prompt, chatResponse }: Props) {
  return (
    <div className="flex w-full p-8 h-screen justify-center">
      <div className="flex flex-col w-3xl gap-6">
        <div className="flex w-full justify-end">
          <Message prompt={prompt} />
        </div>
        <div className="flex item-start">
          <Response response={chatResponse} />
        </div>
      </div>
    </div>
  );
}
