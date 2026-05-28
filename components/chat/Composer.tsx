"use client";

import { useState, useRef, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Composer({
  onSubmit,
  isLoading,
}: {
  onSubmit: (value: string) => void;
  isLoading: boolean;
}) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    if (!value.trim() || isLoading) return;
    onSubmit(value);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleInput() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }

  const canSend = value.trim().length > 0 && !isLoading;

  return (
    <div className="flex items-end gap-2 rounded-2xl border border-border bg-card px-4 py-3 transition-colors focus-within:border-border/60">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        placeholder="Ask about experience, projects, skills…"
        disabled={isLoading}
        className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground outline-none leading-6 min-h-[24px] max-h-[180px] disabled:opacity-50"
      />
      <Button
        size="icon"
        variant="ghost"
        onClick={submit}
        disabled={!canSend}
        aria-label="Send"
        className={cn(
          "shrink-0 size-8 rounded-full transition-colors",
          canSend
            ? "bg-primary text-primary-foreground hover:bg-primary/90"
            : "text-muted-foreground"
        )}
      >
        <ArrowUp className="size-4" />
      </Button>
    </div>
  );
}
