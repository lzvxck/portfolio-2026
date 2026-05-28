"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import MessageList from "./MessageList";
import Composer from "./Composer";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const NAV_LINKS = [
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/about", label: "About" },
];

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(input: string) {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    // Phase 3: replace with POST /api/chat + useChat streaming
    await new Promise((r) => setTimeout(r, 700));
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Chat is not yet connected — this is the Phase 1 UI shell. The RAG pipeline and Groq streaming will be wired in Phase 3.",
      },
    ]);
    setIsLoading(false);
  }

  const hasMessages = messages.length > 0;

  return (
    <div className="h-full flex flex-col">
      {/* Minimal header */}
      <header className="shrink-0 flex items-center justify-between px-6 h-14 border-b border-border">
        <span className="font-mono text-sm tracking-tight">Lionel Arce</span>
        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Main area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            /* Empty state — centered, like Claude/ChatGPT */
            <motion.div
              key="empty"
              className="flex-1 flex flex-col items-center justify-center gap-2 px-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1">
                AI &amp; Systems Engineer
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                Lionel Arce
              </h1>
              <p className="text-sm text-muted-foreground mt-2">
                Ask me about my experience, projects, or skills.
              </p>
            </motion.div>
          ) : (
            /* Message list */
            <motion.div
              key="messages"
              className="flex-1 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <MessageList messages={messages} isLoading={isLoading} />
              <div ref={bottomRef} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Composer — always pinned at bottom */}
        <div className="shrink-0 px-4 pb-5 pt-2">
          <div className="mx-auto max-w-2xl">
            <Composer onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
