"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type UseChatOptions = { api?: string };

type UseChatReturn = {
  messages: Message[];
  input: string;
  isLoading: boolean;
  isThinking: boolean;
  handleInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e?: FormEvent) => void;
  setInputValue: (val: string) => void;
};

const MS_PER_CHAR = 10;

export function useChat({ api = "/api/chat" }: UseChatOptions = {}): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const pendingRef = useRef("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const assistantIdRef = useRef<string | null>(null);
  const fetchDoneRef = useRef(false);

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, []);

  function drainQueue() {
    if (intervalRef.current !== null) return;

    intervalRef.current = setInterval(() => {
      if (pendingRef.current.length === 0) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        if (fetchDoneRef.current) {
          fetchDoneRef.current = false;
          setIsLoading(false);
        }
        return;
      }

      const char = pendingRef.current[0];
      pendingRef.current = pendingRef.current.slice(1);

      const id = assistantIdRef.current;
      if (id) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, content: m.content + char } : m))
        );
      }
    }, MS_PER_CHAR);
  }

  const handleInputChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const setInputValue = useCallback((val: string) => {
    setInput(val);
  }, []);

  const handleSubmit = useCallback(
    async (e?: FormEvent) => {
      e?.preventDefault();
      const text = input.trim();
      if (!text || isLoading) return;

      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: text,
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setIsLoading(true);
      setIsThinking(true);

      const assistantId = crypto.randomUUID();
      assistantIdRef.current = assistantId;
      pendingRef.current = "";
      fetchDoneRef.current = false;
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      try {
        const res = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map(({ role, content }) => ({ role, content })),
          }),
        });

        if (!res.ok || !res.body) {
          let errMsg = "Something went wrong.";
          try {
            const data = await res.json();
            errMsg = data.error ?? errMsg;
          } catch {}
          setIsThinking(false);
          setMessages((prev) => [
            ...prev,
            { id: assistantId, role: "assistant", content: errMsg },
          ]);
          setIsLoading(false);
          return;
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let firstChunk = true;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });

          if (firstChunk) {
            firstChunk = false;
            setIsThinking(false);
            setMessages((prev) => [
              ...prev,
              { id: assistantId, role: "assistant", content: "" },
            ]);
          }

          pendingRef.current += chunk;
          drainQueue();
        }

        fetchDoneRef.current = true;
        if (pendingRef.current.length === 0 && intervalRef.current === null) {
          fetchDoneRef.current = false;
          setIsLoading(false);
        }
      } catch {
        setIsThinking(false);
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "Network error. Please try again." },
        ]);
        setIsLoading(false);
      }
    },
    [api, input, isLoading, messages]
  );

  return { messages, input, isLoading, isThinking, handleInputChange, handleSubmit, setInputValue };
}
