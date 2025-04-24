export default function AwaitingMessage() {
  return (
    <div className="flex self-start gap-2 rounded-3xl bg-[#e6e6e6] px-4 py-4">
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
    </div>
  );
}
