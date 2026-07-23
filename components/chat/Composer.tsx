"use client";

import { useRef, useEffect, type ChangeEvent, type FormEvent, type KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MAX_CHARS = 4000;
const WARN_AT = 0.8; // show counter at 80%

export default function Composer({
  value,
  onChange,
  onSubmit,
  isLoading,
  textareaRef: externalRef,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e?: FormEvent) => void;
  isLoading: boolean;
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
}) {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  const textareaRef = externalRef ?? internalRef;

  // Refocus after loading finishes
  useEffect(() => {
    if (!isLoading) textareaRef.current?.focus();
  }, [isLoading]);

  // Reset height when value is cleared
  useEffect(() => {
    if (value === "" && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value]);

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  }

  function handleChange(e: ChangeEvent<HTMLTextAreaElement>) {
    onChange(e);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }

  const canSend = value.trim().length > 0 && !isLoading;
  const charCount = value.length;
  const showCounter = charCount > MAX_CHARS * WARN_AT;
  const nearLimit = charCount > MAX_CHARS * 0.95;

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border bg-card shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]",
        "transition-[border-color,box-shadow] duration-200",
        "border-border focus-within:border-white/25 focus-within:shadow-[0_8px_30px_-8px_rgba(255,255,255,0.06)]"
      )}
    >
      <div className="flex items-center gap-3 px-4 py-3.5">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about experience, projects, skills…"
          disabled={isLoading}
          maxLength={MAX_CHARS}
          className="flex-1 resize-none bg-transparent text-sm placeholder:text-muted-foreground/60 outline-none leading-6 min-h-[24px] max-h-[180px] py-0 disabled:opacity-40"
        />
        <Button
          size="icon"
          variant="ghost"
          onClick={() => onSubmit()}
          disabled={!canSend}
          aria-label="Send"
          className={cn(
            "shrink-0 size-7 rounded-full transition-all duration-150",
            canSend
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground/40"
          )}
        >
          <ArrowUp className="size-3.5" />
        </Button>
      </div>

      {showCounter && (
        <div className="px-4 pb-2 flex justify-end">
          <span className={cn("font-mono text-[10px]", nearLimit ? "text-destructive" : "text-muted-foreground/50")}>
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      )}
    </div>
  );
}
