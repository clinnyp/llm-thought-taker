import { getNoteById } from "@/actions/notes";
import DisplayNote from "@/components/display-note";

export default async function Page({ params }) {
  const noteId = (await params).id;
  const res = await getNoteById(noteId);
  return (
    <div className="flex-1">
      <DisplayNote prompt={res.note.prompt} chatResponse={res.note.content} />
    </div>
  );
}
