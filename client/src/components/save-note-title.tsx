import { saveNote } from "@/actions/notes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateNotes } from "@/store/features/messages/messagesSlice";
import { RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function SaveNoteTitle() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const prompt = useSelector((state: RootState) => state.messages.prompt);
  const chatResponse = useSelector(
    (state: RootState) => state.messages.response
  );

  const handleSaveNote = async () => {
    setIsLoading(true);
    const response = await saveNote(
      "0c4fa536-1079-465c-8f9a-2a893416ec9f",
      title,
      prompt,
      chatResponse
    );
    if (response.success) {
      console.log("this is the here", response);
      setIsLoading(false);
      setIsOpen(false);
      dispatch(updateNotes([response.data]));
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Save Note</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Note</DialogTitle>
          <DialogDescription>
            Set the title of your note. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={handleSaveNote}
            className="relative"
          >
            {isLoading && <Loader2 className="animate-spin absolute" />}

            <span className={isLoading ? "opacity-0" : ""}>Save</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
