"use client";

import Message from "./message";
import Response from "./response";
import AwaitingMessage from "./awaiting-message";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SaveNoteTitle } from "./save-note-title";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { resetMessages } from "@/store/features/messages/messagesSlice";

export default function ChatArea() {
  const router = useRouter();
  const dispatch = useDispatch();

  const prompt = useSelector((state: RootState) => state.messages.prompt);
  const loading = useSelector((state: RootState) => state.messages.loading);
  const chatResponse = useSelector(
    (state: RootState) => state.messages.response
  );

  const handleNewThought = () => {
    dispatch(resetMessages());
    router.push("/");
  };

  return (
    <div className="flex flex-col justify-between w-3xl p-8 h-screen">
      <div className="flex flex-col gap-6">
        {prompt && (
          <div className="flex justify-end">
            <Message prompt={prompt} />
          </div>
        )}
        {loading ? <AwaitingMessage /> : <Response response={chatResponse} />}
      </div>
      {chatResponse && (
        <div className="flex items-end justify-around pb-12">
          <SaveNoteTitle />
          <Button variant={"ghost"} onClick={handleNewThought}>
            Ask Something Else
          </Button>
        </div>
      )}
    </div>
  );
}
