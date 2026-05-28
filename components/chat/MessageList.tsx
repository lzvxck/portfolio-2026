import { Skeleton } from "@/components/ui/skeleton";
import type { Message } from "./ChatPanel";

export default function MessageList({
  messages,
  isLoading,
}: {
  messages: Message[];
  isLoading: boolean;
}) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-6 flex flex-col gap-6">
      {messages.map((msg) =>
        msg.role === "user" ? (
          <div key={msg.id} className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl bg-secondary px-4 py-2.5 text-sm leading-relaxed">
              {msg.content}
            </div>
          </div>
        ) : (
          <div key={msg.id} className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-muted-foreground">
              Lionel Arce
            </span>
            <p className="text-sm leading-relaxed">{msg.content}</p>
          </div>
        )
      )}

      {isLoading && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-muted-foreground">
            Lionel Arce
          </span>
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-[68%]" />
            <Skeleton className="h-4 w-[48%]" />
          </div>
        </div>
      )}
    </div>
  );
}
