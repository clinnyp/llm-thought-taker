"use client";

import { getLLMResponse } from "@/actions/notes";
import SendButton from "./send-button";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  updateLoading,
  updatePrompt,
  updateResponse,
} from "@/store/features/messages/messagesSlice";

export default function PromptForm() {
  const dispatch = useDispatch();

  const prompt = useSelector((state: RootState) => state.messages.prompt);
  const loading = useSelector((state: RootState) => state.messages.loading);
  const chatResponse = useSelector(
    (state: RootState) => state.messages.response
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateLoading(true));
    if (prompt.trim() === "") return;
    const response = await getLLMResponse(prompt);
    dispatch(updateResponse(response?.data));
    dispatch(updateLoading(false));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full h-full justify-center items-center gap-4">
        {!loading && !chatResponse && (
          <div className="text-3xl ">
            What interesting thoughts are on your mind?
          </div>
        )}
        <div className="flex flex-col gap-3 pt-4 px-4 pb-2 border-1 border-black rounded-3xl ">
          <form onSubmit={handleSubmit}>
            <TextareaAutosize
              className="min-w-2xl focus:outline-none"
              onChange={(e) => dispatch(updatePrompt(e.target.value))}
              placeholder="Ask anything"
              minRows={2}
              maxRows={6}
              style={{ resize: "none" }}
            />
            <div className="flex justify-end pt-2">
              <button type="submit">
                <SendButton />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
