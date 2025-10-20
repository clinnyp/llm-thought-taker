import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllUserNotes, createNote, deleteNote } from "@/actions/notes";
import { Note } from "@/types";

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: async (): Promise<Note[]> => {
      const response = await getAllUserNotes();
      if (!response.success) {
        throw new Error("Failed to fetch notes");
      }
      return response.data.notes;
    },
    staleTime: 10 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      prompt,
      content,
    }: {
      title: string;
      prompt: string;
      content: string;
    }) => {
      const response = await createNote(title, prompt, content);
      if (!response.success) {
        throw new Error("Failed to create note");
      }
      return response.note;
    },
    onMutate: async (newNote) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });

      const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);

      const tempId = `temp-${Date.now()}`;
      const optimisticNote: Note = {
        id: tempId,
        userId: "temp-user-id",
        title: newNote.title,
        prompt: newNote.prompt,
        content: newNote.content,
        createdAt: new Date(),
      };

      queryClient.setQueryData<Note[]>(["notes"], (old) => {
        if (!old) return [optimisticNote];
        return [optimisticNote, ...old];
      });

      return { previousNotes, tempId };
    },
    onError: (err, newNote, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes"], context.previousNotes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (noteId: string) => {

      const response = await deleteNote(noteId);
      if (!response.success) {
        throw new Error("Failed to delete note");
      }
      return response;
    },
    onMutate: async (noteId) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });

      const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);

      queryClient.setQueryData<Note[]>(["notes"], (old) => {
        if (!old) return [];
        return old.filter((note) => note.id !== noteId);
      });

      return { previousNotes };
    },
    onError: (err, noteId, context) => {
      if (context?.previousNotes) {
        queryClient.setQueryData(["notes"], context.previousNotes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
} 