import { getNoteById } from "@/actions/notes";
import DisplayNote from "@/components/display-note";

export default async function Page({ params }) {
  const noteId = (await params).id;
  const note = await getNoteById(noteId);
  return (
    <div className="flex-1">
      <DisplayNote prompt={note.data.prompt} chatResponse={note.data.content} />
    </div>
  );
}
