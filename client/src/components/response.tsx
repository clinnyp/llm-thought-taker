import ReactMarkdown from "react-markdown";

interface Props {
  response: string;
}

export default function Response({ response }: Props) {
  return (
    <div className="flex-1  gap-2 overflow-y-auto pb-32">
      <ReactMarkdown>{response}</ReactMarkdown>
      <div className="flex justify-start pt-2"></div>
    </div>
  );
}
