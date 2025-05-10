"use client";
import ChatArea from "@/components/chat-area";
import ChatPrompt from "@/components/chat-prompt";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function Page() {
  const loading = useSelector((state: RootState) => state.messages.loading);
  const chatResponse = useSelector(
    (state: RootState) => state.messages.response
  );

  return (
    <div className="flex h-screen w-full flex-col justify-center items-center ">
      {loading || chatResponse ? <ChatArea /> : <ChatPrompt />}
    </div>
  );
}
