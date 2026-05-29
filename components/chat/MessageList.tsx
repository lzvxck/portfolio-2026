import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Message } from "@/lib/hooks/use-chat";

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1 h-5">
      <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:0ms]" />
      <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:160ms]" />
      <span className="size-1.5 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:320ms]" />
    </div>
  );
}

function AssistantMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => (
          <p className="text-sm leading-relaxed mb-3 last:mb-0">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="font-semibold text-foreground">{children}</strong>
        ),
        em: ({ children }) => <em className="italic">{children}</em>,
        ul: ({ children }) => (
          <ul className="text-sm leading-relaxed list-disc pl-5 mb-3 last:mb-0 flex flex-col gap-1">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="text-sm leading-relaxed list-decimal pl-5 mb-3 last:mb-0 flex flex-col gap-1">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        code: ({ children }) => (
          <code className="font-mono text-xs bg-muted/40 px-1.5 py-0.5 rounded">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="font-mono text-xs bg-muted/40 rounded-lg p-4 overflow-x-auto mb-3 last:mb-0">
            {children}
          </pre>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            {children}
          </a>
        ),
        h1: ({ children }) => (
          <h1 className="text-base font-semibold mb-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-sm font-semibold mb-2">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-sm font-medium mb-1">{children}</h3>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

export default function MessageList({
  messages,
  isThinking,
}: {
  messages: Message[];
  isThinking: boolean;
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
        ) : msg.content.length > 0 ? (
          <div key={msg.id} className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-muted-foreground">
              Lionel Arce
            </span>
            <AssistantMessage content={msg.content} />
          </div>
        ) : null
      )}

      {isThinking && (
        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-mono text-muted-foreground">
            Lionel Arce
          </span>
          <ThinkingDots />
        </div>
      )}
    </div>
  );
}
