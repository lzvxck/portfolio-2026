"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/use-chat";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import MessageList from "./MessageList";
import Composer from "./Composer";

const SUGGESTED = [
  "Where does Lionel work now?",
  "What are his main skills?",
  "Show me his projects",
  "What did he build at Laburen?",
];

export default function ChatPanel() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    isThinking,
    setInputValue,
  } = useChat({ api: "/api/chat" });

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll to bottom on new messages or content updates — only if already near bottom
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 150) {
      bottomRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [messages]);

  const hasMessages = messages.length > 0;

  function handleSuggest(text: string) {
    setInputValue(text);
    textareaRef.current?.focus();
  }

  return (
    <MotionConfig reducedMotion={shouldReduceMotion ? "always" : "never"}>
      <div className="h-full flex flex-col overflow-hidden">
        <AnimatePresence>
          {!hasMessages ? (
            /* ── Empty state: hero + composer centered ── */
            <motion.div
              key="empty"
              className="flex-1 flex flex-col items-center justify-center gap-6 px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <motion.div
                className="flex flex-col items-center gap-2 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
                  AI &amp; Systems Engineer
                </p>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Lionel Arce
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Ask me about my experience, projects, or skills.
                </p>
              </motion.div>

              {/* Suggested prompts */}
              <motion.div
                className="flex flex-wrap justify-center gap-2"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.05 }}
              >
                {SUGGESTED.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggest(s)}
                    className="rounded-full border border-border px-3.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:border-white/25 transition-colors duration-150"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>

              <motion.div
                layoutId="composer"
                className="w-full max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              >
                <Composer
                  value={input}
                  onChange={handleInputChange}
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                  textareaRef={textareaRef}
                />
              </motion.div>
            </motion.div>
          ) : (
            /* ── Chat state: messages + composer at bottom ── */
            <motion.div
              key="chat"
              className="flex-1 flex flex-col overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              >
                <MessageList messages={messages} isThinking={isThinking} />
                <div ref={bottomRef} />
              </div>

              <motion.div layoutId="composer" className="shrink-0 px-4 pb-6">
                <div className="mx-auto max-w-2xl">
                  <Composer
                    value={input}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    textareaRef={textareaRef}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
