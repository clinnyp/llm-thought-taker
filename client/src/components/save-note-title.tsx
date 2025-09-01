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
import { useCreateNote } from "@/hooks/use-notes";
import { RootState } from "@/store/store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export function SaveNoteTitle() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const router = useRouter();

  const prompt = useSelector((state: RootState) => state.messages.prompt);
  const chatResponse = useSelector(
    (state: RootState) => state.messages.response
  );

  const createNoteMutation = useCreateNote();

  const handleSaveNote = async () => {
    if (!title.trim()) return;

    try {
      const newNote = await createNoteMutation.mutateAsync({
        title: title.trim(),
        prompt,
        content: chatResponse,
      });

      setTitle("");
      setIsOpen(false);
      router.push(`/chat/note/${newNote.id}`);
    } catch (error) {
      console.error("Failed to create note:", error);
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
            Set the title of your note. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter note title..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={createNoteMutation.isPending || !title.trim()}
            onClick={handleSaveNote}
            className="relative"
          >
            {createNoteMutation.isPending && (
              <Loader2 className="animate-spin absolute" />
            )}
            <span className={createNoteMutation.isPending ? "opacity-0" : ""}>
              Save
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
