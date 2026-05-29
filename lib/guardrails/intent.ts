const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior|above|your)\s+(instructions?|rules?|constraints?|prompts?)/i,
  /disregard\s+(all\s+)?(previous|prior|above|your)\s+(instructions?|rules?|prompts?)/i,
  /forget\s+(all\s+)?(previous|prior|above|your)\s+(instructions?|rules?|prompts?|context)/i,
  /override\s+(your\s+)?(instructions?|rules?|system\s+prompt)/i,
  /new\s+(instructions?|rules?|directives?|orders?)\s*:/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /pretend\s+(you\s+are|to\s+be)\s+/i,
  /act\s+as\s+(a|an)\s+/i,
  /roleplay\s+as\s+/i,
  /jailbreak/i,
  /system\s*prompt/i,
  /\[system\]/i,
  /<\s*system\s*>/i,
  /from\s+now\s+on\s+(you\s+are|act\s+as|pretend)/i,
  /your\s+(true|real|actual)\s+(self|identity|purpose)/i,
  /without\s+(any\s+)?(restrictions?|limitations?|filters?|guardrails?)/i,
  /bypass\s+(your\s+)?(safety|filter|restriction|guard)/i,
  /DAN\b/,
];

export type IntentResult =
  | { ok: true }
  | { ok: false; reason: "injection" };

export function checkIntent(text: string): IntentResult {
  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(text)) return { ok: false, reason: "injection" };
  }
  return { ok: true };
}
