"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@/lib/hooks/use-chat";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
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
    resetConversation,
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
      <div className="relative h-full flex flex-col overflow-hidden">
        {hasMessages && (
          <button
            onClick={resetConversation}
            aria-label="Reset conversation"
            className="absolute right-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm transition-colors duration-150 hover:border-white/25 hover:text-foreground"
          >
            <RotateCcw className="size-3" />
            New chat
          </button>
        )}

        {/* Hero and the message list are mutually exclusive under a single
            mode="wait" AnimatePresence — the exiting child fully unmounts
            before the entering one mounts, so they never coexist as two
            flex-1 siblings splitting the available height. (That's what was
            causing messages to render squeezed into half the viewport, then
            visibly jump to full height once the hero finished unmounting.)
            The composer is a separate, single persistent instance further
            below, positioned via its own `layout` transition, so it never
            double-mounts either. */}
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            <motion.div
              key="hero"
              className="hero-glow flex flex-1 flex-col items-center justify-center gap-6 px-4"
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
            </motion.div>
          ) : (
            <motion.div
              key="messages"
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.2 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <MessageList messages={messages} isThinking={isThinking} />
              <div ref={bottomRef} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          layout
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
            delay: 0.1,
            layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
          }}
          className={
            hasMessages
              ? "shrink-0 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
              : "w-full px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          }
        >
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
      </div>
    </MotionConfig>
  );
}
